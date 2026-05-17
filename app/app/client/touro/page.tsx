"use client";

import Navbar from "@/app/client/components/NavbarClient";
import { useState } from "react";
import Swal from "sweetalert2";

export default function CadastroTouro() {
  const [form, setForm] = useState({
    nome: "",
    numeroBrinco: "",
    numeroRegistro: "",
    dataNascimento: "",
    dataCompra: "",
    raca: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            const res = await fetch("/api/touros/criar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
            Swal.fire({
                icon: "error",
                title: "Erro ao cadastrar",
                text: data.message || "Algo deu errado",
            });

            return;
            }

            Swal.fire({
            icon: "success",
            title: "Sucesso!",
            text: "Touro cadastrado com sucesso!",
            timer: 2000,
            showConfirmButton: false,
            });

            setForm({
            nome: "",
            numeroBrinco: "",
            numeroRegistro: "",
            dataNascimento: "",
            dataCompra: "",
            raca: "",
            });

        } catch (error) {
            Swal.fire({
            icon: "error",
            title: "Erro de conexão",
            text: "Não foi possível conectar ao servidor",
            });
        }
    }

  return (
    <>
      <Navbar />

      <div className="min-h-[85vh] bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-2xl w-full max-w-2xl p-8">

          <h1 className="text-2xl font-bold text-green-700 mb-6">
            Cadastro de Touro
          </h1>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

            <input
              name="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="Nome do Touro"
              className="border p-2 rounded-lg col-span-2"
            />

            <input
              name="numeroBrinco"
              value={form.numeroBrinco}
              onChange={handleChange}
              placeholder="Número Brinco"
              className="border p-2 rounded-lg"
            />

            <input
              name="numeroRegistro"
              value={form.numeroRegistro}
              onChange={handleChange}
              placeholder="Número Registro"
              className="border p-2 rounded-lg"
            />

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">
                Data de Nascimento
              </label>

              <input
                type="date"
                name="dataNascimento"
                value={form.dataNascimento}
                onChange={handleChange}
                className="border p-2 rounded-lg"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">
                Data de Compra
              </label>

              <input
                type="date"
                name="dataCompra"
                value={form.dataCompra}
                onChange={handleChange}
                className="border p-2 rounded-lg"
              />
            </div>

            <input
              name="raca"
              value={form.raca}
              onChange={handleChange}
              placeholder="Raça"
              className="border p-2 rounded-lg col-span-2"
            />

            <button
              type="submit"
              className="bg-green-700 text-white p-3 rounded-xl col-span-2"
            >
              Cadastrar Touro
            </button>

          </form>
        </div>
      </div>
    </>
  );
}