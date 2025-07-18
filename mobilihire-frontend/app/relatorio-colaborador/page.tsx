'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock,
  AlertTriangle,
  Lightbulb,
  Target,
  FileText,
  ArrowLeft
} from 'lucide-react';
import { 
  mobilihireApi,
  RelatorioMobilidade,
  OportunidadeInterna,
  Colaborador as ColaboradorApi
} from '@/api/mobilihire.api';

export default function RelatorioColaboradorPage() {
  const [oportunidades, setOportunidades] = useState<OportunidadeInterna[]>([]);
  const [colaboradores, setColaboradores] = useState<ColaboradorApi[]>([]);
  const [oportunidadeSelecionada, setOportunidadeSelecionada] = useState<string>('');
  const [colaboradorSelecionado, setColaboradorSelecionado] = useState<string>('');
  const [relatorioColaborador, setRelatorioColaborador] = useState<RelatorioMobilidade | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const [oportunidadesData, colaboradoresData] = await Promise.all([
        mobilihireApi.getOportunidades(),
        mobilihireApi.getColaboradores()
      ]);
      setOportunidades(oportunidadesData);
      setColaboradores(colaboradoresData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setError('Erro ao carregar dados');
    }
  };

  const handleGerarRelatorio = async () => {
    if (!oportunidadeSelecionada || !colaboradorSelecionado) {
      setError('Selecione uma oportunidade e um colaborador');
      return;
    }

    setLoading(true);
    setError('');
    setRelatorioColaborador(null);

    try {
      const relatorio = await mobilihireApi.gerarRelatorioColaborador(oportunidadeSelecionada, colaboradorSelecionado);
      setRelatorioColaborador(relatorio);
    } catch (error) {
      setError('Erro ao gerar relatório de colaborador');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getAdequacaoColor = (adequacao: string) => {
    if (adequacao.includes('Pronto')) return 'bg-green-100 text-green-800';
    if (adequacao.includes('Alto Potencial')) return 'bg-blue-100 text-blue-800';
    if (adequacao.includes('Requer Desenvolvimento')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getColaboradorSelecionado = () => {
    return colaboradores.find(c => c.id === colaboradorSelecionado);
  };

  const getOportunidadeSelecionada = () => {
    return oportunidades.find(o => o.id === oportunidadeSelecionada);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="sm" onClick={() => window.history.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Relatório de Colaborador</h1>
          <p className="text-muted-foreground">
            Gere relatórios detalhados de mobilidade interna para colaboradores
          </p>
        </div>
      </div>

      {/* Seleção de Dados */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Selecionar Colaborador e Oportunidade
          </CardTitle>
          <CardDescription>
            Escolha o colaborador e a oportunidade para gerar o relatório de mobilidade
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Selecione a Oportunidade</label>
              <Select value={oportunidadeSelecionada} onValueChange={setOportunidadeSelecionada}>
                <SelectTrigger>
                  <SelectValue placeholder="Escolha uma oportunidade" />
                </SelectTrigger>
                <SelectContent>
                  {oportunidades.map((oportunidade) => (
                    <SelectItem key={oportunidade.id} value={oportunidade.id}>
                      {oportunidade.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Selecione o Colaborador</label>
              <Select value={colaboradorSelecionado} onValueChange={setColaboradorSelecionado}>
                <SelectTrigger>
                  <SelectValue placeholder="Escolha um colaborador" />
                </SelectTrigger>
                <SelectContent>
                  {colaboradores.map((colaborador) => (
                    <SelectItem key={colaborador.id} value={colaborador.id}>
                      {colaborador.nome} - {colaborador.departamento}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            onClick={handleGerarRelatorio} 
            disabled={loading || !oportunidadeSelecionada || !colaboradorSelecionado}
            className="w-full"
          >
            {loading ? <Clock className="h-4 w-4 animate-spin mr-2" /> : <FileText className="h-4 w-4 mr-2" />}
            Gerar Relatório
          </Button>
        </CardContent>
      </Card>

      {/* Exibição de Erros */}
      {error && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Relatório Gerado */}
      {relatorioColaborador && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Relatório de Mobilidade Interna
            </CardTitle>
            <CardDescription>
              {getColaboradorSelecionado()?.nome} → {getOportunidadeSelecionada()?.nome}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Adequação de Mobilidade */}
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Adequação de Mobilidade
              </h3>
              <Badge className={getAdequacaoColor(relatorioColaborador.adequacaoMobilidade)}>
                {relatorioColaborador.adequacaoMobilidade}
              </Badge>
            </div>

            <Separator />

            {/* Pontos Fortes */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-yellow-600" />
                Pontos Fortes para Mobilidade
              </h3>
              <ul className="space-y-2">
                {relatorioColaborador.pontosFortesParaMobilidade.map((ponto, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{ponto}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            {/* Lacunas de Desenvolvimento */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                Lacunas de Desenvolvimento
              </h3>
              <ul className="space-y-2">
                {relatorioColaborador.gapsDesenvolvimento.map((gap, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{gap}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            {/* Plano de Ação */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-600" />
                Plano de Ação Recomendado
              </h3>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-900">{relatorioColaborador.planoAcaoRecomendado}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 