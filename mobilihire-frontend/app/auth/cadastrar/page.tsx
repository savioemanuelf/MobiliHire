"use client"

import { CrudSection } from "@/components/crud/crud-section"
import { Card, CardFooter} from "@/components/ui/card"
import Link from "next/link"
import { mobilihireApi } from "@/api/mobilihire.api"
import { useRouter } from "next/navigation"

export default function CadastrarPage() {
  const router = useRouter();

  async function adicionarEmpresa(data: any) {
    try {
      await mobilihireApi.cadastrarEmpresa(data);
      console.log("Empresa adicionada:", data);
      alert("Empresa cadastrada com sucesso!");
      router.push("/auth/login");
    } catch (error) {
      console.error("Erro ao adicionar empresa:", error);
      alert("Erro ao cadastrar empresa. Tente novamente.");
    }
  }
    
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-md">
        <CrudSection
          id="adicionar"
          title="Cadastro MobiliHire"
          description="Preencha as informações sobre sua empresa para se cadastrar na plataforma de mobilidade interna."
          fields={[
            { name: "nome", label: "Nome da Empresa", type: "text" },
            { name: "cnpj", label: "CNPJ", type: "text" },
            { name: "telefone", label: "Telefone", type: "text" },
            { name: "email", label: "Email", type: "email" },
            { name: "senha", label: "Senha", type: "password" },
          ]}
          submitLabel="Cadastrar Empresa"
          onSubmit={adicionarEmpresa}
        />

        <CardFooter className="flex flex-col space-y-4">
          <br/>
          <div className="text-center text-sm">
              Já possui conta? <Link href="/auth/login" className="text-muted-foreground hover:underline">Faça login aqui</Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
