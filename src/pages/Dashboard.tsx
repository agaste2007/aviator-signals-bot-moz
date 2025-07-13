import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SignalCard } from "@/components/SignalCard";
import { PlacardBanner } from "@/components/PracardBanner";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  LogOut, 
  User, 
  Activity, 
  TrendingUp, 
  Target,
  RefreshCw,
  Bell
} from "lucide-react";
import aviatorAvatar from "@/assets/aviator-avatar.jpg";

interface Signal {
  id: string;
  type: "buy" | "sell";
  multiplier: string;
  confidence: number;
  timeLeft: string;
  status: "active" | "completed" | "expired";
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [signals, setSignals] = useState<Signal[]>([]);
  const [stats, setStats] = useState({
    totalSignals: 0,
    winRate: 0,
    activeSignals: 0,
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const userData = localStorage.getItem("aviator_user");
    if (!userData) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(userData));

    // Gerar sinais simulados
    generateSignals();
    
    // Atualizar estatísticas
    setStats({
      totalSignals: 156,
      winRate: 87,
      activeSignals: 3,
    });

    // Atualizar sinais a cada 30 segundos
    const interval = setInterval(generateSignals, 30000);
    return () => clearInterval(interval);
  }, [navigate]);

  const generateSignals = () => {
    const newSignals: Signal[] = [
      {
        id: "1",
        type: Math.random() > 0.5 ? "buy" : "sell",
        multiplier: (Math.random() * 50 + 2).toFixed(1),
        confidence: Math.floor(Math.random() * 20 + 80),
        timeLeft: `${Math.floor(Math.random() * 10 + 1)}m`,
        status: "active",
      },
      {
        id: "2",
        type: Math.random() > 0.5 ? "buy" : "sell",
        multiplier: (Math.random() * 30 + 5).toFixed(1),
        confidence: Math.floor(Math.random() * 15 + 85),
        timeLeft: `${Math.floor(Math.random() * 15 + 2)}m`,
        status: "active",
      },
      {
        id: "3",
        type: Math.random() > 0.5 ? "buy" : "sell",
        multiplier: (Math.random() * 100 + 10).toFixed(1),
        confidence: Math.floor(Math.random() * 10 + 90),
        timeLeft: `${Math.floor(Math.random() * 5 + 1)}m`,
        status: "active",
      },
    ];
    setSignals(newSignals);
  };

  const handleLogout = () => {
    localStorage.removeItem("aviator_user");
    toast({
      title: "Logout realizado",
      description: "Até logo! Volte sempre ao Aviator J.S",
    });
    navigate("/login");
  };

  const refreshSignals = () => {
    generateSignals();
    toast({
      title: "Sinais atualizados!",
      description: "Novos sinais foram carregados",
    });
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-primary p-0.5">
                <img 
                  src={aviatorAvatar} 
                  alt="Aviator J.S" 
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Aviator J.S</h1>
                <p className="text-sm text-muted-foreground">Trading Bot Premium</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">{user.name}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Banner da Placard */}
          <PlacardBanner />

          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-card border-border/50 shadow-card">
              <div className="p-6 text-center">
                <div className="flex justify-center mb-3">
                  <Activity className="w-8 h-8 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">{stats.totalSignals}</div>
                <div className="text-sm text-muted-foreground">Sinais Enviados</div>
              </div>
            </Card>

            <Card className="bg-gradient-card border-border/50 shadow-card">
              <div className="p-6 text-center">
                <div className="flex justify-center mb-3">
                  <TrendingUp className="w-8 h-8 text-success" />
                </div>
                <div className="text-2xl font-bold text-foreground">{stats.winRate}%</div>
                <div className="text-sm text-muted-foreground">Taxa de Acerto</div>
              </div>
            </Card>

            <Card className="bg-gradient-card border-border/50 shadow-card">
              <div className="p-6 text-center">
                <div className="flex justify-center mb-3">
                  <Target className="w-8 h-8 text-accent" />
                </div>
                <div className="text-2xl font-bold text-foreground">{stats.activeSignals}</div>
                <div className="text-sm text-muted-foreground">Sinais Ativos</div>
              </div>
            </Card>
          </div>

          {/* Sinais Atuais */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Sinais Gratuitos</h2>
                <Badge variant="secondary">AO VIVO</Badge>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={refreshSignals}
                className="gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Atualizar
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {signals.map((signal) => (
                <SignalCard key={signal.id} signal={signal} />
              ))}
            </div>
          </div>

          {/* Aviso */}
          <Card className="bg-warning/10 border-warning/20">
            <div className="p-4 text-center">
              <p className="text-sm text-warning-foreground">
                ⚠️ <strong>Importante:</strong> Estes são sinais gratuitos com fins educacionais. 
                Para sinais premium com maior precisão, crie sua conta na Placard.
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}