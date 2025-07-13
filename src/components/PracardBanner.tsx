import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";

export function PlacardBanner() {
  const handlePlacardClick = () => {
    window.open("https://media1.placard.co.mz/redirect.aspx?pid=9683&bid=1723", "_blank");
  };

  return (
    <Card className="bg-gradient-primary border-primary/20 shadow-glow relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"></div>
      
      <div className="relative p-6 text-center space-y-4">
        <div className="flex justify-center items-center gap-2">
          <Trophy className="w-6 h-6 text-primary-foreground" />
          <h3 className="text-xl font-bold text-primary-foreground">
            Maximize Seus Ganhos!
          </h3>
          <Trophy className="w-6 h-6 text-primary-foreground" />
        </div>
        
        <p className="text-primary-foreground/90 text-sm leading-relaxed">
          Crie sua conta na <strong>Placard</strong> e tenha acesso aos melhores multiplicadores.
          Aproveite nossos sinais premium com até <strong>1000x</strong> de ganho!
        </p>

        <div className="flex items-center justify-center gap-1 text-primary-foreground/80 text-xs">
          <Star className="w-3 h-3 fill-current" />
          <Star className="w-3 h-3 fill-current" />
          <Star className="w-3 h-3 fill-current" />
          <Star className="w-3 h-3 fill-current" />
          <Star className="w-3 h-3 fill-current" />
          <span className="ml-1">Plataforma Confiável</span>
        </div>

        <Button 
          variant="placard" 
          size="lg" 
          onClick={handlePlacardClick}
          className="w-full"
        >
          <ExternalLink className="w-4 h-4" />
          CRIAR CONTA NA PLACARD
        </Button>
        
        <p className="text-xs text-primary-foreground/70">
          ⚠️ Obrigatório para receber sinais premium
        </p>
      </div>
    </Card>
  );
}