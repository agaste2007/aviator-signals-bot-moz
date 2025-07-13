import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowUp, ArrowDown, Clock, Target, AlertCircle, Pause } from "lucide-react";
import { AviatorSignal } from "@/hooks/useSignals";

interface SignalCardProps {
  signal: AviatorSignal;
}

export function SignalCard({ signal }: SignalCardProps) {
  const getSignalIcon = () => {
    switch (signal.signal_type) {
      case "buy":
        return <ArrowUp className="w-3 h-3 text-success" />;
      case "sell":
        return <ArrowDown className="w-3 h-3 text-destructive" />;
      case "cashout":
        return <Target className="w-3 h-3 text-warning" />;
      case "wait":
        return <Pause className="w-3 h-3 text-muted-foreground" />;
      default:
        return <AlertCircle className="w-3 h-3 text-primary" />;
    }
  };

  const getSignalColor = () => {
    switch (signal.signal_type) {
      case "buy":
        return "text-success";
      case "sell":
        return "text-destructive";
      case "cashout":
        return "text-warning";
      case "wait":
        return "text-muted-foreground";
      default:
        return "text-primary";
    }
  };

  const getSignalLabel = () => {
    switch (signal.signal_type) {
      case "buy":
        return "COMPRAR";
      case "sell":
        return "VENDER";
      case "cashout":
        return "RETIRAR";
      case "wait":
        return "AGUARDAR";
      default:
        return "SINAL";
    }
  };

  const timeRemaining = () => {
    if (!signal.expires_at) return "∞";
    const now = new Date().getTime();
    const expires = new Date(signal.expires_at).getTime();
    const diff = expires - now;
    
    if (diff <= 0) return "Expirado";
    
    const minutes = Math.floor(diff / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  };

  return (
    <Card className="bg-gradient-card border-border/50 shadow-card hover:shadow-glow transition-all duration-300">
      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {getSignalIcon()}
            <span className={`font-bold text-xs uppercase ${getSignalColor()}`}>
              {getSignalLabel()}
            </span>
          </div>
          <Badge variant="default" className="text-xs px-1.5 py-0.5 h-auto bg-success text-success-foreground">
            AO VIVO
          </Badge>
        </div>

        {signal.game_round && (
          <div className="text-xs text-muted-foreground text-center">
            Jogo: {signal.game_round}
          </div>
        )}

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Multiplicador:</span>
            <span className="text-sm font-bold text-foreground">{signal.multiplier}x</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Tempo:</span>
            <div className="flex items-center gap-1">
              <Clock className="w-2.5 h-2.5 text-muted-foreground" />
              <span className="text-xs font-medium text-foreground">{timeRemaining()}</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Precisão:</span>
              <span className="text-xs font-medium text-foreground">{signal.confidence}%</span>
            </div>
            <Progress value={signal.confidence} className="h-1.5" />
          </div>
        </div>
      </div>
    </Card>
  );
}