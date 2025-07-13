import React, { useState, useEffect } from "react";
import { AuthLayout } from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn, AlertCircle } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { signIn, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const { error } = await signIn(email, password);
    
    if (error) {
      setError(
        error.message === "Invalid login credentials" 
          ? "Email ou senha incorretos" 
          : "Erro no login. Tente novamente."
      );
    } else {
      navigate("/dashboard");
    }
    
    setIsLoading(false);
  };

  return (
    <AuthLayout
      title="Acesso ao Sistema"
      subtitle="Entre com suas credenciais para continuar"
    >
      <form onSubmit={handleLogin} className="space-y-4">
        {error && (
          <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md text-sm text-destructive">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground text-sm">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            className="bg-secondary/50 border-border text-sm"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-foreground text-sm">Senha</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        <Button type="submit" className="w-full" disabled={isLoading} size="lg">
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <LogIn className="w-4 h-4" />
              Entrar
            </>
          )}
        </Button>
      </form>

      <div className="text-center">
        <span className="text-sm text-muted-foreground">Não tem uma conta? </span>
        <Button
          variant="link"
          className="text-sm p-0 h-auto font-medium text-accent"
          onClick={() => navigate("/register")}
        >
          Registre-se aqui
        </Button>
      </div>
    </AuthLayout>
  );
}