'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { mobilihireApi, OportunidadeInterna } from '@/api/mobilihire.api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BadgeCheck, XCircle } from 'lucide-react';

export default function OportunidadeDetalhePage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [oportunidade, setOportunidade] = useState<OportunidadeInterna | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    mobilihireApi.getOportunidade(id)
      .then(setOportunidade)
      .catch(() => setError('Oportunidade não encontrada.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Carregando oportunidade...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !oportunidade) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center h-64">
          <XCircle className="h-10 w-10 text-destructive mb-4" />
          <p className="text-lg font-semibold text-destructive">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Detalhes da Oportunidade</h1>
          <p className="text-muted-foreground">Visualize todas as informações da oportunidade</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{oportunidade.nome}</CardTitle>
          <CardDescription>
            {oportunidade.isActive ? (
              <span className="inline-flex items-center gap-1 text-green-700"><BadgeCheck className="h-4 w-4" /> Ativa</span>
            ) : (
              <span className="inline-flex items-center gap-1 text-red-700"><XCircle className="h-4 w-4" /> Inativa</span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <strong>Tipo de Mobilidade:</strong> {oportunidade.tipoMobilidade}
          </div>
          <div>
            <strong>Departamento Origem:</strong> {oportunidade.departamentoOrigem}
          </div>
          <div>
            <strong>Departamento Destino:</strong> {oportunidade.departamentoDestino}
          </div>
          <div>
            <strong>Nível Origem:</strong> {oportunidade.nivelOrigem}
          </div>
          <div>
            <strong>Nível Destino:</strong> {oportunidade.nivelDestino}
          </div>
          <div>
            <strong>Prazo de Candidatura:</strong> {oportunidade.prazoCandidatura} dias
          </div>
          <div>
            <strong>Requer Aprovação do Gestor:</strong> {oportunidade.requerAprovacaoGestor ? 'Sim' : 'Não'}
          </div>
          <div>
            <strong>Pontuação Mínima:</strong> {oportunidade.pontuacaoMinima}
          </div>
          <div>
            <strong>Requisitos:</strong>
            <ul className="list-disc ml-6 mt-1">
              <li><strong>Habilidades:</strong> {oportunidade.requisitos?.habilidades}</li>
              <li><strong>Idiomas:</strong> {oportunidade.requisitos?.idiomas}</li>
              <li><strong>Formação Acadêmica:</strong> {oportunidade.requisitos?.formacaoAcademica}</li>
              <li><strong>Experiência:</strong> {oportunidade.requisitos?.experiencia}</li>
            </ul>
          </div>
          <div>
            <strong>Pesos:</strong>
            <ul className="list-disc ml-6 mt-1">
              <li><strong>Habilidades:</strong> {oportunidade.requisitos?.pesoHabilidades}</li>
              <li><strong>Idiomas:</strong> {oportunidade.requisitos?.pesoIdiomas}</li>
              <li><strong>Formação Acadêmica:</strong> {oportunidade.requisitos?.pesoFormacaoAcademica}</li>
              <li><strong>Experiência:</strong> {oportunidade.requisitos?.pesoExperiencia}</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 