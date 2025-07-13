import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Plane, 
  TrendingUp, 
  Target, 
  Star, 
  Users, 
  Shield,
  ExternalLink,
  LogIn,
  UserPlus
} from "lucide-react";
import aviatorAvatar from "@/assets/aviator-avatar.jpg";

const Index = () => {
  const navigate = useNavigate();

  const handlePlacardClick = () => {
    window.open("https://media1.placard.co.mz/redirect.aspx?pid=9683&bid=1723", "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-8">
            {/* Avatar e Logo */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-primary p-2 shadow-glow animate-pulse">
                  <img 
                    src={aviatorAvatar} 
                    alt="Aviator J.S" 
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-success text-success-foreground">
                  ONLINE
                </Badge>
              </div>
            </div>

            {/* Título Principal */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight">
                Aviator <span className="text-primary">J.S</span>
              </h1>
              <p className="text-xl md:text-2xl text-accent font-medium">
                Trading Bot Premium
              </p>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                O bot mais avançado para sinais do Aviator. 
                Tenha acesso a sinais gratuitos e multiplique seus ganhos!
              </p>
            </div>

            {/* Botões de Ação */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate("/register")}
                className="gap-2"
              >
                <UserPlus className="w-5 h-5" />
                Começar Agora
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => navigate("/login")}
                className="gap-2"
              >
                <LogIn className="w-5 h-5" />
                Já tenho conta
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Por que escolher o Aviator J.S?
            </h2>
            <p className="text-lg text-muted-foreground">
              Tecnologia de ponta para maximizar seus lucros
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gradient-card border-border/50 shadow-card text-center p-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                87% de Precisão
              </h3>
              <p className="text-muted-foreground">
                Algoritmos avançados garantem alta taxa de acerto em nossos sinais
              </p>
            </Card>

            <Card className="bg-gradient-card border-border/50 shadow-card text-center p-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center">
                  <Target className="w-8 h-8 text-success" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Sinais em Tempo Real
              </h3>
              <p className="text-muted-foreground">
                Receba sinais instantâneos e não perca nenhuma oportunidade de lucro
              </p>
            </Card>

            <Card className="bg-gradient-card border-border/50 shadow-card text-center p-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-accent" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                100% Gratuito
              </h3>
              <p className="text-muted-foreground">
                Acesse sinais gratuitos todos os dias, sem custos ocultos
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">5000+</div>
              <div className="text-muted-foreground">Usuários Ativos</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-success">87%</div>
              <div className="text-muted-foreground">Taxa de Acerto</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-accent">24/7</div>
              <div className="text-muted-foreground">Suporte Online</div>
            </div>
          </div>
        </div>
      </section>

      {/* Placard CTA */}
      <section className="py-20 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
              Maximize Seus Ganhos na Placard!
            </h2>
            <p className="text-xl text-primary-foreground/90">
              Crie sua conta na plataforma oficial e tenha acesso aos melhores multiplicadores.
              Nossos usuários relatam ganhos de até <strong>1000x</strong>!
            </p>
            
            <div className="flex items-center justify-center gap-1 text-primary-foreground/80">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
              <span className="ml-2 font-medium">Plataforma Confiável</span>
            </div>

            <Button 
              variant="placard" 
              size="lg"
              onClick={handlePlacardClick}
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              <ExternalLink className="w-5 h-5" />
              CRIAR CONTA NA PLACARD
            </Button>
            
            <p className="text-sm text-primary-foreground/70">
              ⚠️ Obrigatório para receber sinais premium
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Plane className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold text-foreground">Aviator J.S</span>
            </div>
            <p className="text-muted-foreground">
              © 2024 Aviator J.S Trading Bot. Todos os direitos reservados.
            </p>
            <p className="text-sm text-muted-foreground">
              ⚠️ Trading envolve riscos. Invista com responsabilidade.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
