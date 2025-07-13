-- Update users table to ensure proper fields for authentication
ALTER TABLE public.users ALTER COLUMN email SET NOT NULL;
ALTER TABLE public.users ALTER COLUMN name SET NOT NULL;

-- Create updated_at trigger function if not exists
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Update signals table for better Aviator signals structure
ALTER TABLE public.signals DROP COLUMN IF EXISTS status;
ALTER TABLE public.signals DROP COLUMN IF EXISTS accuracy;
ALTER TABLE public.signals ADD COLUMN IF NOT EXISTS signal_type text NOT NULL DEFAULT 'buy';
ALTER TABLE public.signals ADD COLUMN IF NOT EXISTS confidence integer NOT NULL DEFAULT 85;
ALTER TABLE public.signals ADD COLUMN IF NOT EXISTS game_round text;
ALTER TABLE public.signals ADD COLUMN IF NOT EXISTS timezone text DEFAULT 'CAT';
ALTER TABLE public.signals ADD COLUMN IF NOT EXISTS expires_at timestamp with time zone;

-- Add constraint for signal_type
ALTER TABLE public.signals ADD CONSTRAINT signals_type_check 
CHECK (signal_type IN ('buy', 'sell', 'wait', 'cashout'));

-- Add constraint for confidence
ALTER TABLE public.signals ADD CONSTRAINT signals_confidence_check 
CHECK (confidence >= 50 AND confidence <= 100);

-- Update RLS policies for signals
DROP POLICY IF EXISTS "Users can view own signals" ON public.signals;
DROP POLICY IF EXISTS "Users can insert own signals" ON public.signals;

-- New policies for signals - users can view all signals but only authenticated users
CREATE POLICY "Authenticated users can view all signals" 
ON public.signals 
FOR SELECT 
TO authenticated
USING (true);

-- Only system can insert signals (for real-time signal generation)
CREATE POLICY "Service role can insert signals" 
ON public.signals 
FOR INSERT 
TO service_role
WITH CHECK (true);

-- Create a function to get current CAT time (Mozambique timezone)
CREATE OR REPLACE FUNCTION public.get_cat_time()
RETURNS timestamp with time zone
LANGUAGE sql
STABLE
AS $$
    SELECT now() AT TIME ZONE 'CAT';
$$;