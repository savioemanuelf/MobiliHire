"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { mobilihireApi, Empresa, EmpresaUpdate } from "@/api/mobilihire.api"

export default function EmpresaPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [empresa, setEmpresa] = useState<Empresa | null>(null)
  const [formData, setFormData] = useState<EmpresaUpdate>({
    nome: "",
    email: "",
    cnpj: "",
    telefone: "",
    endereco: "",
  })

  useEffect(() => {
    const fetchEmpresa = async () => {
      try {
        const data = await mobilihireApi.getEmpresa()
        setEmpresa(data)
        setFormData({
          nome: data.nome || "",
          email: data.email || "",
          cnpj: data.cnpj || "",
          telefone: data.telefone || "",
          endereco: data.endereco || "",
        })
      } catch (error) {
        console.error("Erro ao buscar dados da empresa:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEmpresa()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const updatedEmpresa = await mobilihireApi.updateEmpresa(formData)
      setEmpresa(updatedEmpresa)
      alert("Dados atualizados com sucesso!")
    } catch (error) {
      console.error("Erro ao atualizar empresa:", error)
      alert("Erro ao atualizar dados. Tente novamente.")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (confirm("Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.")) {
      try {
        await mobilihireApi.deleteEmpresa()
        localStorage.removeItem('token')
        router.push("/")
      } catch (error) {
        console.error("Erro ao deletar empresa:", error)
        alert("Erro ao deletar conta. Tente novamente.")
      }
    }
  }

  const handleInputChange = (field: keyof EmpresaUpdate, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Carregando dados da empresa...</p>
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
          <h1 className="text-3xl font-bold">Perfil da Empresa</h1>
          <p className="text-muted-foreground">
            Gerencie os dados da sua empresa
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Informações da Empresa</CardTitle>
              <CardDescription>
                Atualize os dados da sua empresa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome da Empresa</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => handleInputChange("nome", e.target.value)}
                  placeholder="Nome da sua empresa"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input
                  id="cnpj"
                  value={formData.cnpj}
                  onChange={(e) => handleInputChange("cnpj", e.target.value)}
                  placeholder="00.000.000/0000-00"
                />
              </div>

              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  value={formData.telefone}
                  onChange={(e) => handleInputChange("telefone", e.target.value)}
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div>
                <Label htmlFor="endereco">Endereço</Label>
                <Input
                  id="endereco"
                  value={formData.endereco}
                  onChange={(e) => handleInputChange("endereco", e.target.value)}
                  placeholder="Endereço completo"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between gap-4 mt-6">
            <Button 
              type="button" 
              variant="destructive" 
              onClick={handleDelete}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Excluir Conta
            </Button>
            <div className="flex gap-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancelar
              </Button>
              <Button type="submit" disabled={saving}>
                <Save className="mr-2 h-4 w-4" />
                {saving ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
} 