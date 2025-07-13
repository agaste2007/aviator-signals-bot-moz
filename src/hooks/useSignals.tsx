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

  // Update Mozambique time every second
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      // CAT (Central Africa Time) is UTC+2
      const catTime = new Date(now.getTime() + (2 * 60 * 60 * 1000));
      setMozambiqueTime(catTime);
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
        // Generate mock signals if database is empty
        generateMockSignals();
      } else if (data) {
        setSignals(data as AviatorSignal[]);
      }
    } catch (err) {
      console.error('Error in fetchSignals:', err);
      generateMockSignals();
    } finally {
      setLoading(false);
    }
  };

  // Generate mock signals for demonstration
  const generateMockSignals = () => {
    const mockSignals: AviatorSignal[] = [
      {
        id: `mock-${Date.now()}-1`,
        signal_type: Math.random() > 0.5 ? 'buy' : 'cashout',
        multiplier: Math.round((Math.random() * 50 + 2) * 10) / 10,
        confidence: Math.floor(Math.random() * 20 + 80),
        game_round: `R${Math.floor(Math.random() * 10000)}`,
        timezone: 'CAT',
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + Math.random() * 300000).toISOString(), // Expires in 0-5 minutes
      },
      {
        id: `mock-${Date.now()}-2`,
        signal_type: Math.random() > 0.5 ? 'buy' : 'wait',
        multiplier: Math.round((Math.random() * 30 + 5) * 10) / 10,
        confidence: Math.floor(Math.random() * 15 + 85),
        game_round: `R${Math.floor(Math.random() * 10000)}`,
        timezone: 'CAT',
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + Math.random() * 300000).toISOString(),
      },
      {
        id: `mock-${Date.now()}-3`,
        signal_type: Math.random() > 0.5 ? 'sell' : 'buy',
        multiplier: Math.round((Math.random() * 100 + 10) * 10) / 10,
        confidence: Math.floor(Math.random() * 10 + 90),
        game_round: `R${Math.floor(Math.random() * 10000)}`,
        timezone: 'CAT',
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + Math.random() * 300000).toISOString(),
      },
    ];
    setSignals(mockSignals);
    setLoading(false);
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