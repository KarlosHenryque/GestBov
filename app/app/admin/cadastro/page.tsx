"use client";

import { FormEvent, useState } from "react";
import Navbar from "@/app/admin/components/Navbar"
import Swal from "sweetalert2";

export default function CadastroPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function cadastrar(e: FormEvent) {
    e.preventDefault();

    const response = await fetch("/api/usuarios/criar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome,
        email,
        senha,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Sucesso",
        text: "Usuário cadastrado com sucesso!",
        confirmButtonColor: "#16a34a",
      });

      setNome("");
      setEmail("");
      setSenha("");
    } else {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: data.error,
        confirmButtonColor: "#16a34a",
      });
    }
  }

  return (
    <>
        
        <Navbar />

        <div className="flex items-center justify-center min-h-[85vh] bg-green-50 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-green-100">
                <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-green-700">
                    Cadastro
                </h1>

                <p className="text-gray-500 mt-2">
                    Crie um novo usuário
                </p>
                </div>

                <form
                onSubmit={cadastrar}
                className="flex flex-col gap-5"
                >
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                    Nome
                    </label>

                    <input
                    type="text"
                    placeholder="Digite seu nome"
                    value={nome}
                    onChange={(e) =>
                        setNome(e.target.value)
                    }
                    className="w-full p-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                    Email
                    </label>

                    <input
                    type="email"
                    placeholder="Digite seu email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    className="w-full p-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                    Senha
                    </label>

                    <input
                    type="password"
                    placeholder="Digite sua senha"
                    value={senha}
                    onChange={(e) =>
                        setSenha(e.target.value)
                    }
                    className="w-full p-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 transition text-white font-semibold py-3 rounded-xl shadow-md"
                >
                    Cadastrar
                </button>
                </form>
            </div>
        </div>
    </>
  );
}