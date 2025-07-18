"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { mobilihireApi } from "@/api/mobilihire.api"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function logarEmpresa(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await mobilihireApi.login({ email, senha: password });
      
      localStorage.setItem('token', result.token);
      
      console.log("Empresa logada:", result);
      alert("Empresa logada com sucesso!");
      window.location.href = "/painel";

    } catch (error) {
      console.error("Erro ao logar empresa:", error);
      alert(error instanceof Error ? error.message : "Erro ao fazer login. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-md">
        <form onSubmit={logarEmpresa}>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Entrar no MobiliHire</CardTitle>
            <CardDescription>Entre com suas credenciais para acessar a plataforma de mobilidade interna</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="seu@email.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            <div className="text-center text-sm">
              <Link href="#" className="text-muted-foreground hover:underline">
                Esqueceu sua senha?
              </Link>
            </div>
            <div className="text-center text-sm">
                Ainda não possui conta? <Link href="/auth/cadastrar" className="text-muted-foreground hover:underline">Cadastre-se aqui</Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
