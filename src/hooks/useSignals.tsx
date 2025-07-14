import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface AviatorSignal {
  id: string;
  signal_type: 'buy' | 'sell' | 'wait' | 'cashout';
  multiplier: number;
  confidence: number;
  game_round?: string;
  timezone: string;
  expires_at?: string;
  created_at: string;
}

export function useSignals() {
  const [signals, setSignals] = useState<AviatorSignal[]>([]);
  const [loading, setLoading] = useState(true);
  const [mozambiqueTime, setMozambiqueTime] = useState<Date>(new Date());
  const { session } = useAuth();

  // Update real Mozambique time every second using browser's timezone handling
  useEffect(() => {
    const timer = setInterval(() => {
      // Get real current time in Mozambique (CAT timezone)
      const now = new Date();
      const mozambiqueTime = new Date(now.toLocaleString("en-US", {timeZone: "Africa/Maputo"}));
      setMozambiqueTime(mozambiqueTime);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fetch signals from Supabase
  const fetchSignals = async () => {
    if (!session) return;

    try {
      const { data, error } = await supabase
        .from('signals')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) {
        console.error('Error fetching signals:', error);
        setSignals([]);
      } else if (data) {
        setSignals(data as AviatorSignal[]);
      }
    } catch (err) {
      console.error('Error in fetchSignals:', err);
      setSignals([]);
    } finally {
      setLoading(false);
    }
  };


  // Set up real-time subscription
  useEffect(() => {
    if (!session) return;

    fetchSignals();

    // Subscribe to real-time updates
    const subscription = supabase
      .channel('signals_updates')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'signals'
        },
        (payload) => {
          setSignals(current => [payload.new as AviatorSignal, ...current.slice(0, 2)]);
        }
      )
      .subscribe();

    // Auto-refresh signals every 30 seconds
    const refreshInterval = setInterval(fetchSignals, 30000);

    return () => {
      subscription.unsubscribe();
      clearInterval(refreshInterval);
    };
  }, [session]);

  return {
    signals,
    loading,
    mozambiqueTime,
    refreshSignals: fetchSignals
  };
}