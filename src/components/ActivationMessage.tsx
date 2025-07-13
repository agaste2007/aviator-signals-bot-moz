import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ExternalLink } from "lucide-react";

export function ActivationMessage() {
  const handlePlacardClick = () => {
    window.open("https://media1.placard.co.mz/redirect.aspx?pid=9683&bid=1723", "_blank");
  };

  return (
    <Card className="bg-warning/10 border-warning/20 shadow-card">
      <div className="p-4 text-center space-y-3">
        <div className="flex justify-center">
          <AlertTriangle className="w-6 h-6 text-warning" />
        </div>
        
        <div>
          <h3 className="text-sm font-semibold text-warning-foreground mb-1">
            Bot Não Ativado
          </h3>
          <p className="text-xs text-warning-foreground/80 leading-relaxed">
            Para ativar o bot e receber sinais premium, você precisa registrar uma conta na Placard.
          </p>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handlePlacardClick}
          className="gap-2 border-warning text-warning hover:bg-warning/10"
        >
          <ExternalLink className="w-3 h-3" />
          Registrar na Placard
        </Button>
        
        <p className="text-xs text-warning-foreground/70">
          Após o registro, volte aqui para ativar o bot
        </p>
      </div>
    </Card>
  );
}