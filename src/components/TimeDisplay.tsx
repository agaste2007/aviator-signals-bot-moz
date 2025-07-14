import React from "react";
import { Clock } from "lucide-react";

interface TimeDisplayProps {
  time: Date;
}

export function TimeDisplay({ time }: TimeDisplayProps) {
  const formatTime = (date: Date) => {
    // Get real current time in Mozambique timezone
    const mozambiqueTime = new Date().toLocaleString('pt-MZ', {
      timeZone: 'Africa/Maputo',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    return mozambiqueTime;
  };

  return (
    <div className="flex items-center justify-center gap-1.5 p-2 bg-gradient-card border border-border/50 rounded-lg">
      <Clock className="w-3 h-3 text-primary" />
      <div className="text-center">
        <div className="text-xs text-muted-foreground">Moçambique</div>
        <div className="text-xs font-mono font-medium text-foreground">
          {formatTime(time)}
        </div>
      </div>
    </div>
  );
}