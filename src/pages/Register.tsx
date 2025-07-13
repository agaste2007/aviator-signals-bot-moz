import React, { useState, useEffect } from "react";
import { AuthLayout } from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, UserPlus, AlertCircle } from "lucide-react";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { signUp, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      setIsLoading(false);
      return;
    }

    const { error } = await signUp(formData.email, formData.password, formData.name);
    
    if (error) {
      setError(
        error.message.includes("already registered") 
          ? "Este email já está registrado" 
          : "Erro no cadastro. Tente novamente."
      );
    }
    
    setIsLoading(false);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <AuthLayout
      title="Criar Conta"
      subtitle="Junte-se à elite dos traders do Aviator J.S"
    >
      <form onSubmit={handleRegister} className="space-y-3">
        {error && (
          <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md text-sm text-destructive">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}
        
        <div className="space-y-1">
          <Label htmlFor="name" className="text-foreground text-sm">Nome Completo</Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => updateFormData("name", e.target.value)}
            placeholder="Seu nome completo"
            className="bg-secondary/50 border-border text-sm"
            required
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="email" className="text-foreground text-sm">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData("email", e.target.value)}
            placeholder="seu@email.com"
            className="bg-secondary/50 border-border text-sm"
            required
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="password" className="text-foreground text-sm">Senha</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => updateFormData("password", e.target.value)}
              placeholder="••••••••"
              className="bg-secondary/50 border-border pr-10 text-sm"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="w-3 h-3 text-muted-foreground" />
              ) : (
                <Eye className="w-3 h-3 text-muted-foreground" />
              )}
            </Button>
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="confirmPassword" className="text-foreground text-sm">Confirmar Senha</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) => updateFormData("confirmPassword", e.target.value)}
              placeholder="••••••••"
              className="bg-secondary/50 border-border pr-10 text-sm"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="w-3 h-3 text-muted-foreground" />
              ) : (
                <Eye className="w-3 h-3 text-muted-foreground" />
              )}
            </Button>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading} size="lg">
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <UserPlus className="w-4 h-4" />
              Criar Conta
            </>
          )}
        </Button>
      </form>

      <div className="text-center">
        <span className="text-sm text-muted-foreground">Já tem uma conta? </span>
        <Button
          variant="link"
          className="text-sm p-0 h-auto font-medium text-accent"
          onClick={() => navigate("/login")}
        >
          Faça login aqui
        </Button>
      </div>
    </AuthLayout>
  );
}