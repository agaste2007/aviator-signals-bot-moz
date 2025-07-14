import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SignalCard } from "@/components/SignalCard";
import { PlacardBanner } from "@/components/PracardBanner";
import { TimeDisplay } from "@/components/TimeDisplay";
import { ActivationMessage } from "@/components/ActivationMessage";
import { useAuth } from "@/hooks/useAuth";
import { useSignals } from "@/hooks/useSignals";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { 
  LogOut, 
  User, 
  RefreshCw,
  Bell,
  Wifi,
  WifiOff
} from "lucide-react";
import aviatorAvatar from "@/assets/aviator-avatar.jpg";

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const { signals, loading, mozambiqueTime, refreshSignals } = useSignals();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  if (!user) return null;

  // Check if user has Placard registration from database
  const [hasPlacardAccount, setHasPlacardAccount] = React.useState(false);
  
  React.useEffect(() => {
    const checkPlacardStatus = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('users')
        .select('placard_registered')
        .eq('id', user.id)
        .single();
        
      if (data && !error) {
        setHasPlacardAccount(data.placard_registered || false);
      }
    };
    
    checkPlacardStatus();
  }, [user]);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile-optimized Header */}
      <header className="bg-card border-b border-border shadow-sm sticky top-0 z-10">
        <div className="max-w-md mx-auto px-3 sm:px-4">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-primary p-0.5">
                <img 
                  src={aviatorAvatar} 
                  alt="Aviator J.S" 
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-xs font-bold text-foreground">Aviator J.S</h1>
                <p className="text-xs text-muted-foreground">Bot</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-xs">
                <User className="w-3 h-3 text-muted-foreground" />
                <span className="text-foreground hidden sm:inline">
                  {user.user_metadata?.name || 'Piloto'}
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="h-8 w-8 p-0">
                <LogOut className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-3 sm:px-4 py-4 space-y-4">
        {/* Time Display */}
        <TimeDisplay time={mozambiqueTime} />

        {/* Placard Banner */}
        <PlacardBanner />

        {/* Connection Status - Only show if has Placard account */}
        {hasPlacardAccount && (
          <Card className="bg-gradient-card border-border/50">
            <div className="p-2 flex items-center justify-center gap-1">
              {loading ? (
                <WifiOff className="w-3 h-3 text-muted-foreground" />
              ) : (
                <Wifi className="w-3 h-3 text-success" />
              )}
              <span className="text-xs text-foreground">
                {loading ? "Conectando..." : "Conectado"}
              </span>
            </div>
          </Card>
        )}

        {/* Activation Check */}
        {!hasPlacardAccount && <ActivationMessage />}

        {/* Signals Section - Only show if has Placard account */}
        {hasPlacardAccount && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Bell className="w-3 h-3 text-primary" />
                <h2 className="text-xs font-medium text-foreground">Sinais Aviator</h2>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={refreshSignals}
                className="gap-1 h-6 px-1.5 text-xs"
                disabled={loading}
              >
                <RefreshCw className={`w-2.5 h-2.5 ${loading ? 'animate-spin' : ''}`} />
                <span className="text-xs">Atualizar</span>
              </Button>
            </div>

            {/* Signals Grid */}
            {signals.length > 0 && (
              <div className="grid gap-2">
                {signals.map((signal) => (
                  <SignalCard key={signal.id} signal={signal} />
                ))}
              </div>
            )}

            {/* No Signals State */}
            {!loading && signals.length === 0 && (
              <Card className="bg-muted/50 border-border/50">
                <div className="p-3 text-center">
                  <Bell className="w-6 h-6 text-muted-foreground mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">
                    Aguardando novos sinais...
                  </p>
                  <p className="text-xs text-muted-foreground/70 mt-1">
                    Histórico será construído a partir do seu registro
                  </p>
                </div>
              </Card>
            )}
          </div>
        )}

        {/* Legal Notice */}
        <Card className="bg-warning/10 border-warning/20">
          <div className="p-3 text-center">
            <p className="text-xs text-warning-foreground leading-relaxed">
              ⚠️ <strong>Aviso:</strong> Sinais para fins educacionais. 
              Trading envolve riscos. Invista com responsabilidade.
            </p>
          </div>
        </Card>
      </main>
    </div>
  );
}