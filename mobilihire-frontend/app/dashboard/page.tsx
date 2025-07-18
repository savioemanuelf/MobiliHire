"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import Link from "next/link"
import { FunilCandidatosEmpresa } from "@/components/dashboard/charts/candidato-funnel-chart"
import { useEffect, useState } from "react"
import { mobilihireApi, OportunidadeInterna, Empresa } from "@/api/mobilihire.api"

export default function DashboardPage() {
    const [oportunidades, setOportunidades] = useState<OportunidadeInterna[]>([]);
    const [empresa, setEmpresa] = useState<Empresa | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [oportunidadesData, empresaData] = await Promise.all([
                    mobilihireApi.getOportunidades(),
                    mobilihireApi.getEmpresa()
                ]);
                
                setOportunidades(oportunidadesData);
                setEmpresa(empresaData);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const oportunidadesAtivas = oportunidades.filter(op => op.isActive).length;
    const oportunidadesInativas = oportunidades.filter(op => !op.isActive).length;

    if (loading) {
        return (
            <DashboardShell>
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                        <p className="mt-2 text-muted-foreground">Carregando dashboard...</p>
                    </div>
                </div>
            </DashboardShell>
        );
    }

  return (
    <DashboardShell>
      <DashboardHeader 
        heading="Painel de Controle" 
        text={`Bem-vinda, ${empresa?.nome || 'Empresa'}. Visualize estatísticas e gerencie oportunidades de mobilidade interna.`} 
      />
      <section className="mt-4 flex flex-col md:flex-row gap-4">
        <div className="flex-column">
          <Card className="mb-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Oportunidades Ativas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{oportunidadesAtivas}</div>
            </CardContent>
          </Card>
          <Card className="mb-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Oportunidades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{oportunidades.length}</div>
            </CardContent>
          </Card>
          <Card className="mb-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Ativação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl">
                {oportunidades.length > 0 
                  ? `${Math.round((oportunidadesAtivas / oportunidades.length) * 100)}%` 
                  : '0%'
                }
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Oportunidades Internas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Gerenciar</div>
            <p className="text-xs text-muted-foreground">Crie e gerencie oportunidades de mobilidade interna</p>
            <div className="mt-4">
              <Link href="/oportunidades">
                <Button>Acessar</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Colaboradores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Visualizar</div>
            <p className="text-xs text-muted-foreground">Veja os colaboradores da sua empresa</p>
            <div className="mt-4">
              <Link href="/colaboradores">
                <Button>Acessar</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gerar Relatório</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Relatório</div>
            <p className="text-xs text-muted-foreground">Gere relatórios de mobilidade para colaboradores</p>
            <div className="mt-4">
              <Link href="/relatorio-colaborador">
                <Button>Acessar</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Teste de Endpoints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Testar</div>
            <p className="text-xs text-muted-foreground">Teste os endpoints de compatibilidade e avaliação</p>
            <div className="mt-4">
              <Link href="/teste-endpoints">
                <Button>Acessar</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Análise de Compatibilidade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Avaliar</div>
            <p className="text-xs text-muted-foreground">Analise compatibilidade de colaboradores com IA</p>
            <div className="mt-4">
              <Link href="/curriculos">
                <Button>Acessar</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Perfil da Empresa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Configurar</div>
            <p className="text-xs text-muted-foreground">Gerencie dados da sua empresa</p>
            <div className="mt-4">
              <Link href="/empresa">
                <Button>Acessar</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
