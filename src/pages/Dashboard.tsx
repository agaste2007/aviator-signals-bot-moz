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

  // Check if user has Placard registration (mock for now)
  const hasPlacardAccount = Math.random() > 0.7; // Mock activation status

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
                <h1 className="text-sm font-bold text-foreground">Aviator J.S</h1>
                <p className="text-xs text-muted-foreground">Trading Bot</p>
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

        {/* Connection Status */}
        <Card className="bg-gradient-card border-border/50">
          <div className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {loading ? (
                <WifiOff className="w-4 h-4 text-muted-foreground" />
              ) : (
                <Wifi className="w-4 h-4 text-success" />
              )}
              <span className="text-xs font-medium text-foreground">
                {loading ? "Conectando..." : "Conectado"}
              </span>
            </div>
            <Badge variant="default" className="text-xs bg-success text-success-foreground">
              AO VIVO
            </Badge>
          </div>
        </Card>

        {/* Activation Check */}
        {!hasPlacardAccount && <ActivationMessage />}

        {/* Signals Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-semibold text-foreground">Sinais Aviator</h2>
              <Badge variant="secondary" className="text-xs">TEMPO REAL</Badge>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={refreshSignals}
              className="gap-1 h-7 px-2 text-xs"
              disabled={loading}
            >
              <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
          </div>

          {/* Signals Grid */}
          {signals.length > 0 && (
            <div className="grid gap-3">
              {signals.map((signal) => (
                <SignalCard key={signal.id} signal={signal} />
              ))}
            </div>
          )}

          {/* No Signals State */}
          {!loading && signals.length === 0 && (
            <Card className="bg-muted/50 border-border/50">
              <div className="p-4 text-center">
                <Bell className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">
                  Aguardando novos sinais...
                </p>
              </div>
            </Card>
          )}
        </div>

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