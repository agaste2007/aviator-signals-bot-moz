import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Clock, Target } from "lucide-react";

interface Signal {
  id: string;
  type: "buy" | "sell";
  multiplier: string;
  confidence: number;
  timeLeft: string;
  status: "active" | "completed" | "expired";
}

interface SignalCardProps {
  signal: Signal;
}

export function SignalCard({ signal }: SignalCardProps) {
  const isWin = signal.type === "buy";
  
  return (
    <Card className="bg-gradient-card border-border/50 shadow-card hover:shadow-glow/20 transition-all duration-300">
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isWin ? (
              <TrendingUp className="w-5 h-5 text-success" />
            ) : (
              <TrendingDown className="w-5 h-5 text-destructive" />
            )}
            <span className="font-medium text-foreground">
              {signal.type.toUpperCase()}
            </span>
          </div>
          <Badge 
            variant={signal.status === "active" ? "default" : 
                    signal.status === "completed" ? "secondary" : "destructive"}
          >
            {signal.status}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <Target className="w-3 h-3" />
              Multiplicador
            </div>
            <div className="font-bold text-primary">{signal.multiplier}x</div>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <Clock className="w-3 h-3" />
              Tempo
            </div>
            <div className="font-medium text-foreground">{signal.timeLeft}</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Confiança</span>
            <span className="font-medium text-foreground">{signal.confidence}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div 
              className="bg-gradient-primary h-2 rounded-full transition-all duration-500" 
              style={{ width: `${signal.confidence}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}