"use client";

import { useEffect, useState, KeyboardEvent } from "react";
import Navbar from "@/app/admin/components/Navbar";
import Swal from "sweetalert2";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  tipo: string;
  status: boolean;
}

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [busca, setBusca] = useState("");

  async function buscarUsuarios() {
    try {

      const response = await fetch(
        "/api/usuarios/listar"
      );

      const data = await response.json();

      // filtro frontend
      if (busca.trim() !== "") {

        const filtrados = data.filter(
          (usuario: Usuario) =>
            usuario.nome
              .toLowerCase()
              .includes(busca.toLowerCase())
        );

        setUsuarios(filtrados);

      } else {

        setUsuarios(data);
      }

    } catch (error) {

      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Erro ao buscar usuários",
        confirmButtonColor: "#16a34a",
      });
    }
  }

  function handleEnter(
    e: KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "Enter") {
      buscarUsuarios();
    }
  }

  useEffect(() => {
    buscarUsuarios();
  }, []);

async function alterarStatus(
    id: number,
    statusAtual: boolean
  ) {

    const acao =
      statusAtual
        ? "desativar"
        : "ativar";

    const resultado =
      await Swal.fire({
        title: `Tem certeza?`,
        text: `Deseja realmente ${acao} este usuário?`,
        icon: "warning",
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonColor: "#16a34a",
        cancelButtonColor: "#dc2626",
        confirmButtonText: "Sim",
        cancelButtonText: "Cancelar",
      });

    // cancelou
    if (!resultado.isConfirmed) {
      return;
    }

    try {

      const response = await fetch(
        "/api/usuarios/status",
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            id,
            status: !statusAtual,
          }),
        }
      );

      if (!response.ok) {

        throw new Error(
          "Erro ao atualizar status"
        );
      }

      await Swal.fire({
        icon: "success",
        title: "Sucesso",
        text: `Usuário ${acao}do com sucesso!`,
        confirmButtonColor: "#16a34a",
      });

      buscarUsuarios();

    } catch (error) {

      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Erro ao alterar status",
        confirmButtonColor: "#16a34a",
      });
    }
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-green-50 p-8">
        <div className="max-w-7xl mx-auto">

          <div className="mb-8">
            <h1 className="text-4xl font-bold text-green-700">
              Usuários
            </h1>

            <p className="text-gray-500 mt-2">
              Gerencie os usuários do sistema
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-green-100 mb-8">

            <div className="flex gap-4">

              <input
                type="text"
                placeholder="Buscar usuário pelo nome..."
                value={busca}
                onChange={(e) =>
                  setBusca(e.target.value)
                }
                onKeyDown={handleEnter}
                className="flex-1 p-4 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <button
                onClick={buscarUsuarios}
                className="bg-green-600 hover:bg-green-700 transition text-white px-8 rounded-xl font-semibold shadow-md"
              >
                Buscar
              </button>

            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-green-100 overflow-hidden">

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-green-600 text-white">

                  <tr>

                    <th className="text-left px-6 py-4">
                      ID
                    </th>

                    <th className="text-left px-6 py-4">
                      Nome
                    </th>

                    <th className="text-left px-6 py-4">
                      Email
                    </th>

                    <th className="text-left px-6 py-4">
                      Tipo
                    </th>

                    <th className="text-left px-6 py-4">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {usuarios.length > 0 ? (

                    usuarios.map((usuario) => (

                      <tr
                        key={usuario.id}
                        className="border-b border-green-100 hover:bg-green-50 transition"
                      >

                        <td className="px-6 py-4">
                          {usuario.id}
                        </td>

                        <td className="px-6 py-4 font-medium">
                          {usuario.nome}
                        </td>

                        <td className="px-6 py-4">
                          {usuario.email}
                        </td>

                        <td className="px-6 py-4">

                          <span
                            className={`px-4 py-1 rounded-full text-sm font-semibold ${
                              usuario.tipo === "ADMIN"
                                ? "bg-green-200 text-green-800"
                                : "bg-gray-200 text-gray-700"
                            }`}
                          >
                            {usuario.tipo}
                          </span>

                        </td>

                        <td className="px-6 py-4">

                          <label className="relative inline-flex items-center cursor-pointer">

                            <input
                              type="checkbox"
                              checked={usuario.status}
                              onChange={() =>
                                alterarStatus(
                                  usuario.id,
                                  usuario.status
                                )
                              }
                              className="sr-only peer"
                            />

                            <div className="
                              w-14
                              h-7
                              bg-gray-300
                              rounded-full
                              peer
                              peer-checked:bg-green-600
                              transition
                              after:content-['']
                              after:absolute
                              after:top-1
                              after:left-1
                              after:bg-white
                              after:border-gray-300
                              after:border
                              after:rounded-full
                              after:h-5
                              after:w-5
                              after:transition-all
                              peer-checked:after:translate-x-7
                            ">
                            </div>

                          </label>

                        </td>

                      </tr>
                    ))

                  ) : (

                    <tr>

                      <td
                        colSpan={4}
                        className="text-center py-10 text-gray-500"
                      >
                        Nenhum usuário encontrado
                      </td>

                    </tr>
                  )}

                </tbody>

              </table>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}