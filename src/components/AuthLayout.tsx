import React from "react";
import { Card } from "@/components/ui/card";
import aviatorAvatar from "@/assets/aviator-avatar.jpg";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/5"></div>
      
      <Card className="w-full max-w-md bg-gradient-card shadow-card backdrop-blur-sm border-border/50 relative">
        <div className="p-8 space-y-6">
          {/* Logo e Avatar */}
          <div className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 rounded-full bg-gradient-primary p-1 shadow-glow">
              <img 
                src={aviatorAvatar} 
                alt="Aviator J.S" 
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground tracking-tight">
                Aviator J.S
              </h1>
              <p className="text-sm text-accent font-medium">
                Trading Bot Premium
              </p>
            </div>
          </div>

          {/* Título da página */}
          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold text-foreground">{title}</h2>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>

          {/* Conteúdo */}
          {children}
        </div>
      </Card>
    </div>
  );
}