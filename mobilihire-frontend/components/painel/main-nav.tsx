"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Owl from "../../assets/owl.png"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="flex items-center gap-6">
      <Link href="/dashboard" className="flex items-center gap-2">
        <Image
          src={Owl}
          alt="MobiliHire Logo"
          width={32}
          height={32}
          className="h-8 w-8"
        />
        <span className="hidden font-bold sm:inline-block">MobiliHire</span>
      </Link>
      <nav className="flex items-center gap-4">
        <Link href="/admin">
          <Button variant={pathname.startsWith("/admin") ? "default" : "ghost"} className="h-8 px-3">
            Área do Administrador
          </Button>
        </Link>
        <Link href="/curriculos">
          <Button variant={pathname.startsWith("/curriculos") ? "default" : "ghost"} className="h-8 px-3">
            Análise de Currículos
          </Button>
        </Link>
      </nav>
    </div>
  )
}
