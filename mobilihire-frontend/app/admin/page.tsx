"use client"

import { Empresa } from "@/api/empresa.api"
import { mobilihireApi } from "@/api/mobilihire.api"
import { CrudSection } from "@/components/crud/crud-section"
import { DashboardHeader } from "@/components/painel/dashboard-header"
import { DashboardShell } from "@/components/painel/dashboard-shell"
import { DashboardSidebar } from "@/components/painel/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function AdminPage() {
  const API_URL = "http://localhost:8080/empresas";
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [empresa, setEmpresa] = useState<any>({ nome: "", cnpj: "", telefone: "", email: "", senha: "" });
  const [empresaBuscada, setEmpresaBuscada] = useState<Empresa | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const sidebarItems = [
    { id: "atualizar", label: "Atualizar dados de empresa" },
    { id: "apagar", label: "Apagar dados de empresa" },
  ]

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const cookieToken = document.cookie
          .split(';')
          .map(cookie => cookie.trim())
          .find(cookie => cookie.startsWith('token='))
          ?.split('=')[1];
      setToken(cookieToken || null);
      console.log("Cookies atuais: ", document.cookie);
      console.log("Este é o token extraído: ", cookieToken);
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    mobilihireApi.getEmpresa().then((data) => {
      setEmpresa({
        nome: data.nome || "",
        cnpj: data.cnpj || "",
        telefone: data.telefone || "",
        email: data.email || "",
        senha: ""
      });
    });
  }, [token]);

    useEffect(() => {
        if (!token) {
            console.log("Token não disponível ainda para AdminPage. Aguarde");
            return;
        }

        fetch(API_URL, { 
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then(async (res) => {
                if (!res.ok) {
                    return res.json().then(err => { throw new Error(err.message || res.statusText); });
                }
                return res.json();
            })
            .then((data: Empresa[]) => {
                setEmpresas(data);
            })
            .catch((error) => {
                console.error("Erro ao buscar empresas: ", error);
            });
    }, [token]);
  

  async function atualizarEmpresa(data: any) {
    try {
      const response = await fetch(`${API_URL}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token && {Authorization: `Bearer ${token}`}),
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) { throw new Error(`Erro do servidor: ${response.status}`); }

      const result = await response.json()
      console.log("Empresa atualizada:", result)
      alert("Dados da empresa atualizados com sucesso!")
    } catch (error) {
      alert(`Erro ao atualizar empresa: ${error}`)
      console.error("Erro ao atualizar empresa:", error)
    }
  }


async function apagarEmpresa() {
  const confirmacao = window.confirm("Deseja mesmo excluir sua empresa? Esta ação é irreversível.");

  if (!confirmacao) {
    return;
  }

  try {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    const response = await fetch("http://localhost:8080/empresas", {
      method: "DELETE",
      headers: {
        Authorization: `