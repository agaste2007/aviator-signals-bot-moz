import React from "react";
import { Clock } from "lucide-react";

interface TimeDisplayProps {
  time: Date;
}

export function TimeDisplay({ time }: TimeDisplayProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleString('pt-MZ', {
      timeZone: 'Africa/Maputo',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="flex items-center justify-center gap-2 p-3 bg-gradient-card border border-border/50 rounded-lg shadow-card">
      <Clock className="w-4 h-4 text-primary" />
      <div className="text-center">
        <div className="text-xs text-muted-foreground">Moçambique (CAT)</div>
        <div className="text-sm font-mono font-medium text-foreground">
          {formatTime(time)}
        </div>
      </div>
    </div>
  );
}