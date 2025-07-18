'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  TrendingUp, 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock,
  AlertTriangle,
  Lightbulb,
  Target,
  ArrowLeft
} from 'lucide-react';
import { 
  mobilihireApi,
  RelatorioMobilidade,
  OportunidadeInterna,
  Colaborador as ColaboradorApi
} from '@/api/mobilihire.api';



export default function TesteEndpointsPage() {
  const [oportunidades, setOportunidades] = useState<OportunidadeInterna[]>([]);
  const [colaboradores, setColaboradores] = useState<ColaboradorApi[]>([]);
  const [oportunidadeSelecionada, setOportunidadeSelecionada] = useState<string>('');
  const [colaboradorSelecionado, setColaboradorSelecionado] = useState<string>('');
  const [resultadoCompatibilidade, setResultadoCompatibilidade] = useState<string>('');
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

  const handleTestarCompatibilidade = async () => {
    if (!oportunidadeSelecionada) {
      setError('Selecione uma oportunidade');
      return;
    }

    setLoading(true);
    setError('');
    setResultadoCompatibilidade('');

    try {
      const resultado = await mobilihireApi.analisarCompatibilidade(oportunidadeSelecionada);
      setResultadoCompatibilidade(resultado);
    } catch (error) {
      setError('Erro ao testar compatibilidade');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGerarRelatorioColaborador = async () => {
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

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="sm" onClick={() => window.history.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Teste de Endpoints</h1>
          <p className="text-muted-foreground">
            Teste os endpoints específicos do MobiliHire
          </p>
        </div>
      </div>

      {/* Cards de Teste */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Teste de Compatibilidade */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Teste de Compatibilidade
            </CardTitle>
            <CardDescription>
              Endpoint: POST /oportunidades-internas/{'{OPORTUNIDADE_ID}'}/compatibilidade
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
            <Button 
              onClick={handleTestarCompatibilidade} 
              disabled={loading || !oportunidadeSelecionada}
              className="w-full"
            >
              {loading ? <Clock className="h-4 w-4 animate-spin mr-2" /> : <TrendingUp className="h-4 w-4 mr-2" />}
              Testar Compatibilidade
            </Button>
          </CardContent>
        </Card>

        {/* Relatório de Colaborador */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Relatório de Colaborador
            </CardTitle>
            <CardDescription>
              Endpoint: POST /oportunidades-internas/{'{OPORTUNIDADE_ID}'}/colaboradores/{'{COLABORADOR_ID}'}/avaliar
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
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
              onClick={handleGerarRelatorioColaborador} 
              disabled={loading || !oportunidadeSelecionada || !colaboradorSelecionado}
              className="w-full"
            >
              {loading ? <Clock className="h-4 w-4 animate-spin mr-2" /> : <Users className="h-4 w-4 mr-2" />}
              Gerar Relatório
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Exibição de Erros */}
      {error && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Resultado do Teste */}
      <div className="space-y-6">
        {/* Resultado da Compatibilidade */}
        {resultadoCompatibilidade && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Resultado da Compatibilidade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm">{resultadoCompatibilidade}</pre>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Relatório de Colaborador */}
        {relatorioColaborador && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Relatório de Colaborador
              </CardTitle>
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
    </div>
  );
} 