'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { TrendingUp, CheckCircle, XCircle, Clock, Users, ArrowLeft } from 'lucide-react';
import { mobilihireApi, OportunidadeInterna } from '@/api/mobilihire.api';

export default function AnalisarCompatibilidadePage() {
  const [oportunidades, setOportunidades] = useState<OportunidadeInterna[]>([]);
  const [oportunidadeSelecionada, setOportunidadeSelecionada] = useState<string>('');
  const [resultado, setResultado] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchOportunidades = async () => {
      try {
        const data = await mobilihireApi.getOportunidades();
        setOportunidades(data);
      } catch (error) {
        setError('Erro ao buscar oportunidades');
      }
    };
    fetchOportunidades();
  }, []);

  const handleTestarCompatibilidade = async () => {
    if (!oportunidadeSelecionada) {
      setError('Selecione uma oportunidade');
      return;
    }
    setLoading(true);
    setError('');
    setResultado(null);
    try {
      const res = await mobilihireApi.analisarCompatibilidade(oportunidadeSelecionada);
      let parsed;
      try {
        parsed = JSON.parse(res);
      } catch {
        parsed = res;
      }
      setResultado(parsed);
    } catch (error) {
      setError('Erro ao analisar compatibilidade');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="sm" onClick={() => window.history.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Análise de Compatibilidade</h1>
          <p className="text-muted-foreground">
            Selecione uma oportunidade para ver a compatibilidade dos colaboradores
          </p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Teste de Compatibilidade
          </CardTitle>
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
      {error && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {resultado && (
        <>
          <div className="mb-4">
            <p className="text-base text-muted-foreground">
              O ranqueamento dos colaboradores abaixo foi realizado automaticamente por inteligência artificial, levando em conta os requisitos definidos na oportunidade cadastrada e as informações fornecidas pelo gestor para cada colaborador. Assim, você pode identificar rapidamente quais colaboradores têm maior aderência ao perfil desejado para a mobilidade interna.
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Resultado da Compatibilidade
              </CardTitle>
            </CardHeader>
            <CardContent>
              {typeof resultado === 'object' && resultado.candidates ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-2 text-left">Colaborador</th>
                        <th className="px-4 py-2 text-left">Pontuação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultado.candidates
                        .slice() 
                        .sort((a: any, b: any) => {
                          let scoreA = 0;
                          
                          if (typeof a.score_total === 'string' && a.score_total.includes(':')) {
                            scoreA = parseFloat(a.score_total.split(':')[1]);
                          } else if (typeof a.score_total === 'number') {
                            scoreA = a.score_total;
                          } else if (typeof a.score_total === 'string') {
                            scoreA = parseFloat(a.score_total);
                          }

                          let scoreB = 0;
                          if (typeof b.score_total === 'string' && b.score_total.includes(':')) {
                            scoreB = parseFloat(b.score_total.split(':')[1]);
                          } else if (typeof b.score_total === 'number') {
                            scoreB = b.score_total;
                          } else if (typeof b.score_total === 'string') {
                            scoreB = parseFloat(b.score_total);
                          }
                          return scoreB - scoreA;
                        })
                        .map((c: any, i: number) => {
                          let nome = '';
                          let score = '';
                          if (typeof c.score_total === 'string' && c.score_total.includes(':')) {
                            const parts = c.score_total.split(':');
                            nome = parts[0];
                            score = parts[1];
                          } else if (typeof c === 'object' && c.nome && c.score_total) {
                            nome = c.nome;
                            score = c.score_total;
                          } else {
                            nome = '-';
                            score = c.score_total || '-';
                          }
                          return (
                            <tr key={i} className="border-b">
                              <td className="px-4 py-2">{nome}</td>
                              <td className="px-4 py-2">{score}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <pre className="whitespace-pre-wrap text-sm">{typeof resultado === 'string' ? resultado : JSON.stringify(resultado, null, 2)}</pre>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
} 