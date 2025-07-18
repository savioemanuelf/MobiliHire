import Image from "next/image"
import Link from "next/link"
import Owl from "../assets/owl.png"
import choice from "../assets/right-choice.jpg";
import latina from "../assets/latina-handshake.jpg"
import hand from "../assets/handshake-glasses.jpg"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container flex h-16 items-center px-4 md:px-6">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src={Owl}
              alt="MobiliHire Logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="text-xl font-bold">MobiliHire</span>
          </div>
          <Link href="/auth/login">
            <Button variant="outline">Entrar</Button>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <section className="container grid items-center gap-6 pb-8 pt-6 md:grid-cols-2 md:py-10 px-10">
          <div className="flex flex-col items-start gap-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">MobiliHire</h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Transforme a mobilidade interna da sua empresa com inteligência artificial. Crie oportunidades internas, 
              analise compatibilidade de colaboradores e promova o crescimento profissional de forma inteligente.
            </p>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Nossa plataforma conecta colaboradores e oportunidades internas de forma eficiente, 
              identificando talentos e promovendo a mobilidade interna com base em análise de compatibilidade.
            </p>
            <Link href="/auth/login" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto">
                Começar agora
              </Button>
            </Link>
          </div>
          <div className="flex justify-center">
            <Image
              src={latina}
              alt="MobiliHire Platform"
              /* width={400}
              height={400} */
              className="rounded-lg object-cover"
              priority
            />
          </div>
        </section>
        <section className="bg-muted py-12">
          <div className="container flex flex-col items-center gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Simplifique a mobilidade interna
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Junte-se a empresas que já transformaram seu processo de mobilidade interna com análise inteligente.
            </p>
            <Link href="/auth/login">
              <Button size="lg" className="mt-4">
                Acessar a plataforma
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <footer className="py-6 px-10">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} MobiliHire. Todos os direitos reservados.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Termos de Uso
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Política de Privacidade
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
