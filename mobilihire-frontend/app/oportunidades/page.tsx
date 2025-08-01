"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Users, TrendingUp, Calendar, ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"
import { mobilihireApi, OportunidadeInterna } from "@/api/mobilihire.api"
import { useRouter } from "next/navigation"

export default function OportunidadesPage() {
  const [oportunidades, setOportunidades] = useState<OportunidadeInterna[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchOportunidades = async () => {
      try {
        const data = await mobilihireApi.getOportunidades()
        setOportunidades(data)
      } catch (error) {
        console.error("Erro ao buscar oportunidades:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOportunidades()
  }, [])

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta oportunidade?")) {
      try {
        await mobilihireApi.deleteOportunidade(id)
        setOportunidades(oportunidades.filter(op => op.id !== id))
      } catch (error) {
        console.error("Erro ao deletar oportunidade:", error)
      }
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Carregando oportunidades...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Oportunidades Internas</h1>
          <p className="text-muted-foreground">
            Gerencie as oportunidades de mobilidade interna da sua empresa
          </p>
        </div>
        <Button onClick={() => router.push("/oportunidades/nova")}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Oportunidade
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {oportunidades.map((oportunidade) => (
          <Card key={oportunidade.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{oportunidade.nome}</CardTitle>
                <Badge variant={oportunidade.isActive ? "default" : "secondary"}>
                  {oportunidade.isActive ? "Ativa" : "Inativa"}
                </Badge>
              </div>
              <CardDescription>
                {oportunidade.departamentoOrigem} → {oportunidade.departamentoDestino}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  {oportunidade.tipoMobilidade}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="mr-2 h-4 w-4" />
                  {oportunidade.nivelOrigem} → {oportunidade.nivelDestino}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  Prazo: {oportunidade.prazoCandidatura} dias
                </div>
                
                <div className="flex gap-2 pt-2 items-center">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => router.push(`/oportunidades/${oportunidade.id}`)}
                  >
                    Ver Detalhes
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDelete(oportunidade.id)}
                  >
                    Excluir
                  </Button>
                  {}
                  <input
                    id={`file-upload-${oportunidade.id}`}
                    type="file"
                    accept="application/zip"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        try {
                          await mobilihireApi.analisarCurriculos(oportunidade.id, file);
                          alert("Arquivo enviado e análise iniciada com sucesso!");
                        } catch (error: any) {
                          alert("Erro ao enviar/analisar o arquivo: " + (error?.message || error));
                        }
                        e.target.value = "";
                      }
                    }}
                  />
                  <div className="flex items-center gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => document.getElementById(`file-upload-${oportunidade.id}`)?.click()}
                      title="Enviar currículos (.zip) para análise"
                      className="flex items-center gap-2 px-3 py-2"
                    >
                      <Upload className="h-4 w-4" />
                      <span className="text-primary-foreground text-sm font-medium whitespace-nowrap">Adicionar colaboradores</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {oportunidades.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
            <Users className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Nenhuma oportunidade encontrada</h3>
          <p className="text-muted-foreground mb-4">
            Comece criando sua primeira oportunidade interna
          </p>
          <Button onClick={() => router.push("/oportunidades/nova")}>
            <Plus className="mr-2 h-4 w-4" />
            Criar Oportunidade
          </Button>
        </div>
      )}
    </div>
  )
} 