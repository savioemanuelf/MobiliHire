"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Users, Search, User, Mail, Building } from "lucide-react"
import { mobilihireApi } from "@/api/mobilihire.api"
import { useRouter } from "next/navigation"

interface Colaborador {
  id: string;
  nome: string;
  email: string;
  departamento: string;
  nivel: string;
  curriculoId?: string;
}

export default function ColaboradoresPage() {
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  useEffect(() => {
    const fetchColaboradores = async () => {
      try {
        const data = await mobilihireApi.getColaboradores()
        setColaboradores(data)
      } catch (error) {
        console.error("Erro ao buscar colaboradores:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchColaboradores()
  }, [])

  const handleSearch = async () => {
    if (!searchTerm.trim()) return
    
    setLoading(true)
    try {
      const data = await mobilihireApi.buscarColaboradores(searchTerm)
      setColaboradores(data)
    } catch (error) {
      console.error("Erro ao buscar colaboradores:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAvaliarColaborador = async (colaboradorId: string, oportunidadeId: string) => {
    try {
      const avaliacao = await mobilihireApi.avaliarColaborador(oportunidadeId, colaboradorId)
      alert(`Avaliação concluída!\nPontuação: ${avaliacao.pontuacao}\nCompatibilidade: ${avaliacao.compatibilidade}`)
    } catch (error) {
      console.error("Erro ao avaliar colaborador:", error)
      alert("Erro ao avaliar colaborador")
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Carregando colaboradores...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Colaboradores</h1>
          <p className="text-muted-foreground">
            Visualize e gerencie os colaboradores da sua empresa
          </p>
        </div>
      </div>

      {/* Busca */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Buscar Colaboradores</CardTitle>
          <CardDescription>
            Digite o nome do colaborador para buscar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Nome do Colaborador</Label>
              <Input
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Digite o nome..."
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleSearch} disabled={!searchTerm.trim()}>
                <Search className="mr-2 h-4 w-4" />
                Buscar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Colaboradores */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {colaboradores.map((colaborador) => (
          <Card key={colaborador.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{colaborador.nome}</CardTitle>
                <Badge variant="secondary">
                  {colaborador.nivel}
                </Badge>
              </div>
              <CardDescription>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="mr-2 h-4 w-4" />
                  {colaborador.email}
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Building className="mr-2 h-4 w-4" />
                  {colaborador.departamento}
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => router.push(`/colaboradores/${colaborador.id}`)}
                  >
                    Ver Perfil
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => router.push(`/colaboradores/${colaborador.id}/avaliacoes`)}
                  >
                    Avaliações
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {colaboradores.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
            <Users className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Nenhum colaborador encontrado</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? "Tente buscar com outro termo" : "Não há colaboradores cadastrados"}
          </p>
        </div>
      )}
    </div>
  )
} 