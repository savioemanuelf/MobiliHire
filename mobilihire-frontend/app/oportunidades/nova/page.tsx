"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save } from "lucide-react"
import { useRouter } from "next/navigation"
import { mobilihireApi, OportunidadeInternaCreate } from "@/api/mobilihire.api"

export default function NovaOportunidadePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<OportunidadeInternaCreate>({
    nome: "",
    isActive: true,
    habilidades: "",
    idiomas: "",
    formacaoAcademica: "",
    experiencia: "",
    pesoHabilidades: 0.3,
    pesoIdiomas: 0.2,
    pesoFormacaoAcademica: 0.3,
    pesoExperiencia: 0.2,
    pontuacaoMinima: 0.7,
    tipoMobilidade: "",
    departamentoOrigem: "",
    departamentoDestino: "",
    nivelOrigem: "",
    nivelDestino: "",
    prazoCandidatura: 30,
    requerAprovacaoGestor: true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await mobilihireApi.createOportunidade(formData)
      router.push("/oportunidades")
    } catch (error) {
      console.error("Erro ao criar oportunidade:", error)
      alert("Erro ao criar oportunidade. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof OportunidadeInternaCreate, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Função para garantir que a soma dos pesos seja 1
  const handlePesoChange = (field: keyof OportunidadeInternaCreate, value: number) => {
    // Lista dos campos de peso
    const pesoFields: (keyof OportunidadeInternaCreate)[] = [
      "pesoHabilidades",
      "pesoIdiomas",
      "pesoFormacaoAcademica",
      "pesoExperiencia"
    ];
    // Soma dos outros pesos
    const outros = pesoFields.filter(f => f !== field);
    const somaOutros = outros.reduce((acc, f) => acc + (formData[f] as number), 0);
    let novoValor = value;
    // Limitar valor entre 0 e 1
    if (novoValor < 0) novoValor = 0;
    if (novoValor > 1) novoValor = 1;
    // Se a soma passar de 1, ajustar proporcionalmente os outros
    let novaSoma = novoValor + somaOutros;
    let novoFormData = { ...formData, [field]: novoValor };
    if (novaSoma > 1) {
      const excesso = novaSoma - 1;
      // Reduzir proporcionalmente os outros pesos
      outros.forEach(f => {
        let atual = novoFormData[f] as number;
        let reduzido = atual - (excesso * (atual / somaOutros));
        if (reduzido < 0) reduzido = 0;
        novoFormData[f] = parseFloat(reduzido.toFixed(2));
      });
      novoFormData[field] = parseFloat(novoValor.toFixed(2));
    }
    setFormData(novoFormData);
  };

  // Soma dos pesos para exibir aviso
  const somaPesos =
    (formData.pesoHabilidades || 0) +
    (formData.pesoIdiomas || 0) +
    (formData.pesoFormacaoAcademica || 0) +
    (formData.pesoExperiencia || 0);
  const somaValida = Math.abs(somaPesos - 1) < 0.01;

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Nova Oportunidade Interna</h1>
          <p className="text-muted-foreground">
            Crie uma nova oportunidade de mobilidade interna
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
              <CardDescription>
                Dados principais da oportunidade
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome da Oportunidade *</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => handleInputChange("nome", e.target.value)}
                  placeholder="Ex: Desenvolvedor Full Stack"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tipoMobilidade">Tipo de Mobilidade *</Label>
                  <Select
                    value={formData.tipoMobilidade}
                    onValueChange={(value) => handleInputChange("tipoMobilidade", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="HORIZONTAL">Horizontal</SelectItem>
                      <SelectItem value="VERTICAL">Vertical</SelectItem>
                      <SelectItem value="FUNCIONAL">Funcional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="prazoCandidatura">Prazo (dias) *</Label>
                  <Input
                    id="prazoCandidatura"
                    type="number"
                    value={formData.prazoCandidatura}
                    onChange={(e) => handleInputChange("prazoCandidatura", parseInt(e.target.value))}
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => handleInputChange("isActive", checked)}
                />
                <Label htmlFor="isActive">Oportunidade Ativa</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="requerAprovacaoGestor"
                  checked={formData.requerAprovacaoGestor}
                  onCheckedChange={(checked) => handleInputChange("requerAprovacaoGestor", checked)}
                />
                <Label htmlFor="requerAprovacaoGestor">Requer Aprovação do Gestor</Label>
              </div>
            </CardContent>
          </Card>

          {/* Departamentos e Níveis */}
          <Card>
            <CardHeader>
              <CardTitle>Departamentos e Níveis</CardTitle>
              <CardDescription>
                Origem e destino da mobilidade
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="departamentoOrigem">Departamento Origem *</Label>
                  <Input
                    id="departamentoOrigem"
                    value={formData.departamentoOrigem}
                    onChange={(e) => handleInputChange("departamentoOrigem", e.target.value)}
                    placeholder="Ex: TI"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="departamentoDestino">Departamento Destino *</Label>
                  <Input
                    id="departamentoDestino"
                    value={formData.departamentoDestino}
                    onChange={(e) => handleInputChange("departamentoDestino", e.target.value)}
                    placeholder="Ex: Marketing"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nivelOrigem">Nível Origem *</Label>
                  <Select
                    value={formData.nivelOrigem}
                    onValueChange={(value) => handleInputChange("nivelOrigem", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o nível" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="JUNIOR">Júnior</SelectItem>
                      <SelectItem value="PLENO">Pleno</SelectItem>
                      <SelectItem value="SENIOR">Sênior</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="nivelDestino">Nível Destino *</Label>
                  <Select
                    value={formData.nivelDestino}
                    onValueChange={(value) => handleInputChange("nivelDestino", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o nível" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="JUNIOR">Júnior</SelectItem>
                      <SelectItem value="PLENO">Pleno</SelectItem>
                      <SelectItem value="SENIOR">Sênior</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Requisitos */}
          <Card>
            <CardHeader>
              <CardTitle>Requisitos</CardTitle>
              <CardDescription>
                Habilidades e qualificações necessárias
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="habilidades">Habilidades Necessárias *</Label>
                <Textarea
                  id="habilidades"
                  value={formData.habilidades}
                  onChange={(e) => handleInputChange("habilidades", e.target.value)}
                  placeholder="Ex: Java, Spring Boot, React, TypeScript"
                  required
                />
              </div>

              <div>
                <Label htmlFor="idiomas">Idiomas</Label>
                <Input
                  id="idiomas"
                  value={formData.idiomas}
                  onChange={(e) => handleInputChange("idiomas", e.target.value)}
                  placeholder="Ex: Inglês intermediário, Espanhol básico"
                />
              </div>

              <div>
                <Label htmlFor="formacaoAcademica">Formação Acadêmica *</Label>
                <Input
                  id="formacaoAcademica"
                  value={formData.formacaoAcademica}
                  onChange={(e) => handleInputChange("formacaoAcademica", e.target.value)}
                  placeholder="Ex: Ciência da Computação, Engenharia de Software"
                  required
                />
              </div>

              <div>
                <Label htmlFor="experiencia">Experiência</Label>
                <Input
                  id="experiencia"
                  value={formData.experiencia}
                  onChange={(e) => handleInputChange("experiencia", e.target.value)}
                  placeholder="Ex: 3+ anos em desenvolvimento web"
                />
              </div>
            </CardContent>
          </Card>

          {/* Pesos e Pontuação */}
          <Card>
            <CardHeader>
              <CardTitle>Pesos e Avaliação</CardTitle>
              <CardDescription>
                Configure os pesos para análise de compatibilidade
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="pesoHabilidades">Peso Habilidades ({formData.pesoHabilidades})</Label>
                <Input
                  id="pesoHabilidades"
                  type="number"
                  min="0"
                  max="1"
                  step="0.01"
                  value={formData.pesoHabilidades}
                  onChange={(e) => handlePesoChange("pesoHabilidades", parseFloat(e.target.value) || 0)}
                />
              </div>

              <div>
                <Label htmlFor="pesoIdiomas">Peso Idiomas ({formData.pesoIdiomas})</Label>
                <Input
                  id="pesoIdiomas"
                  type="number"
                  min="0"
                  max="1"
                  step="0.01"
                  value={formData.pesoIdiomas}
                  onChange={(e) => handlePesoChange("pesoIdiomas", parseFloat(e.target.value) || 0)}
                />
              </div>

              <div>
                <Label htmlFor="pesoFormacaoAcademica">Peso Formação ({formData.pesoFormacaoAcademica})</Label>
                <Input
                  id="pesoFormacaoAcademica"
                  type="number"
                  min="0"
                  max="1"
                  step="0.01"
                  value={formData.pesoFormacaoAcademica}
                  onChange={(e) => handlePesoChange("pesoFormacaoAcademica", parseFloat(e.target.value) || 0)}
                />
              </div>

              <div>
                <Label htmlFor="pesoExperiencia">Peso Experiência ({formData.pesoExperiencia})</Label>
                <Input
                  id="pesoExperiencia"
                  type="number"
                  min="0"
                  max="1"
                  step="0.01"
                  value={formData.pesoExperiencia}
                  onChange={(e) => handlePesoChange("pesoExperiencia", parseFloat(e.target.value) || 0)}
                />
              </div>

              {!somaValida && (
                <div className="text-red-600 font-semibold">
                  A soma dos pesos deve ser igual a 1. (Atual: {somaPesos.toFixed(2)})
                </div>
              )}

              <div>
                <Label htmlFor="pontuacaoMinima">Pontuação Mínima ({formData.pontuacaoMinima * 100}%)</Label>
                <Input
                  id="pontuacaoMinima"
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={formData.pontuacaoMinima}
                  onChange={(e) => handleInputChange("pontuacaoMinima", parseFloat(e.target.value))}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            <Save className="mr-2 h-4 w-4" />
            {loading ? "Criando..." : "Criar Oportunidade"}
          </Button>
        </div>
      </form>
    </div>
  )
} 