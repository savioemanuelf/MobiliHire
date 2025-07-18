"use client"

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Building, User, ArrowLeft } from "lucide-react";
import { mobilihireApi, Colaborador } from "@/api/mobilihire.api";

export default function ColaboradorPerfilPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params as { id: string };
  const [colaborador, setColaborador] = useState<Colaborador | null>(null);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState<any>({});
  const [editando, setEditando] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchColaborador = async () => {
      try {
        const data = await mobilihireApi.getColaborador(id);
        setColaborador(data);
        setEditData({
          matricula: data.matricula || "",
          departamentoAtual: data.departamentoAtual || "",
          cargoAtual: data.cargoAtual || "",
          nivelAtual: data.nivelAtual || "",
          avaliacaoDesempenho: data.avaliacaoDesempenho || ""
        });
      } catch (error) {
        setMsg("Erro ao carregar colaborador");
      } finally {
        setLoading(false);
      }
    };
    fetchColaborador();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handlePatch = async () => {
    setMsg(null);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/gestor/colaboradores/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(editData),
      });
      if (!response.ok) throw new Error('Erro ao atualizar colaborador');
      const updated = await response.json();
      setColaborador(updated);
      setEditando(false);
      setMsg("Colaborador atualizado com sucesso!");
    } catch (error) {
      setMsg("Erro ao atualizar colaborador");
    }
  };

  if (loading) {
    return <div className="p-6">Carregando...</div>;
  }
  if (!colaborador) {
    return <div className="p-6 text-red-500">Colaborador não encontrado</div>;
  }

  return (
    <div className="container mx-auto p-6 max-w-xl">
      <Button variant="outline" size="sm" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>{colaborador.nome}</CardTitle>
          <CardDescription>
            <div className="flex items-center text-sm text-muted-foreground">
              <Mail className="mr-2 h-4 w-4" /> {colaborador.email}
            </div>
            {colaborador.departamentoAtual && (
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <Building className="mr-2 h-4 w-4" /> {colaborador.departamentoAtual}
              </div>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div><b>Matrícula:</b> {colaborador.matricula || '-'}</div>
            <div><b>Cargo Atual:</b> {colaborador.cargoAtual || '-'}</div>
            <div><b>Nível Atual:</b> {colaborador.nivelAtual || '-'}</div>
            <div><b>Avaliação de Desempenho:</b> {colaborador.avaliacaoDesempenho ?? '-'}</div>
          </div>
          <Button variant="outline" size="sm" onClick={() => setEditando(!editando)}>
            {editando ? 'Cancelar' : 'Editar Informações'}
          </Button>
          {editando && (
            <form className="space-y-3 mt-4" onSubmit={e => { e.preventDefault(); handlePatch(); }}>
              <div>
                <Label htmlFor="matricula">Matrícula</Label>
                <Input name="matricula" value={editData.matricula} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="departamentoAtual">Departamento Atual</Label>
                <Input name="departamentoAtual" value={editData.departamentoAtual} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="cargoAtual">Cargo Atual</Label>
                <Input name="cargoAtual" value={editData.cargoAtual} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="nivelAtual">Nível Atual</Label>
                <Input name="nivelAtual" value={editData.nivelAtual} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="avaliacaoDesempenho">Avaliação de Desempenho</Label>
                <Input name="avaliacaoDesempenho" type="number" step="0.1" value={editData.avaliacaoDesempenho} onChange={handleChange} />
              </div>
              <Button type="submit">Salvar</Button>
            </form>
          )}
          {msg && <div className="mt-4 text-sm text-muted-foreground">{msg}</div>}
        </CardContent>
      </Card>
    </div>
  );
} 