"use client";

import Navbar from "@/app/client/components/NavbarClient";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface Animal {
  id: number;
  nome: string;
}

export default function CadastroBezerro() {

  const [vacas, setVacas] =
    useState<Animal[]>([]);

  const [touros, setTouros] =
    useState<Animal[]>([]);

  const [form, setForm] = useState({
    origem: "",
    nome: "",
    sexo: "",
    raca: "",
    numeroBrinco: "",
    dataNascimento: "",
    pesoNascimento: "",
    vacaMaeId: "",
    touroPaiId: "",
  });

  useEffect(() => {

    async function carregarDados() {

      const usuarioId =
        localStorage.getItem(
          "usuarioId"
        );

      if (!usuarioId) {
        return;
      }

      try {

        const vacasResponse =
          await fetch(
            `/api/vacas/listar?usuario_id=${usuarioId}`
          );

        const vacasData =
          await vacasResponse.json();

        setVacas(vacasData);

        const tourosResponse =
          await fetch(
            `/api/touros/listar?usuario_id=${usuarioId}`
          );

        const tourosData =
          await tourosResponse.json();

        setTouros(tourosData);

      } catch (error) {

        Swal.fire({
          icon: "error",
          title: "Erro",
          text:
            "Erro ao carregar vacas e touros",
        });
      }
    }

    carregarDados();

  }, []);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement
    >
  ) {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    const usuarioId =
      localStorage.getItem(
        "usuarioId"
      );

    try {

      const response =
        await fetch(
          "/api/bezerros/criar",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              ...form,
              usuario_id:
                usuarioId,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {

        Swal.fire({
          icon: "error",
          title:
            "Erro ao cadastrar",
          text:
            data.message ||
            "Algo deu errado",
        });

        return;
      }

      Swal.fire({
        icon: "success",
        title: "Sucesso!",
        text:
          "Bezerro cadastrado com sucesso!",
        timer: 2000,
        showConfirmButton:
          false,
      });

      setForm({
        origem: "",
        nome: "",
        sexo: "",
        raca: "",
        numeroBrinco: "",
        dataNascimento: "",
        pesoNascimento: "",
        vacaMaeId: "",
        touroPaiId: "",
      });

    } catch (error) {

      Swal.fire({
        icon: "error",
        title:
          "Erro de conexão",
        text:
          "Não foi possível conectar ao servidor",
      });
    }
  }

  return (
    <>
      <Navbar />

      <div className="
        min-h-[85vh]
        bg-gray-100
        flex
        items-center
        justify-center
        p-6
      ">

        <div className="
          bg-white
          shadow-lg
          rounded-2xl
          w-full
          max-w-3xl
          p-8
        ">

          <h1 className="
            text-2xl
            font-bold
            text-green-700
            mb-6
          ">
            Cadastro de Bezerro
          </h1>

          <form
            onSubmit={handleSubmit}
            className="
              grid
              grid-cols-2
              gap-4
            "
          >

            <select
              name="origem"
              value={form.origem}
              onChange={handleChange}
              className="
                border
                p-3
                rounded-xl
                col-span-2
              "
            >

              <option value="">
                Selecione a Origem
              </option>

              <option value="PARIDO">
                Parido
              </option>

              <option value="COMPRADO">
                Comprado
              </option>

            </select>

            <input
              name="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="Nome do Bezerro"
              className="
                border
                p-3
                rounded-xl
                col-span-2
              "
            />

            <input
              name="numeroBrinco"
              value={form.numeroBrinco}
              onChange={handleChange}
              placeholder="Número do Brinco"
              className="
                border
                p-3
                rounded-xl
              "
            />

            <select
              name="sexo"
              value={form.sexo}
              onChange={handleChange}
              className="
                border
                p-3
                rounded-xl
              "
            >

              <option value="">
                Sexo
              </option>

              <option value="MACHO">
                Macho
              </option>

              <option value="FEMEA">
                Fêmea
              </option>

            </select>

            <input
              name="raca"
              value={form.raca}
              onChange={handleChange}
              placeholder="Raça"
              className="
                border
                p-3
                rounded-xl
              "
            />

            <input
              type="number"
              step="0.01"
              name="pesoNascimento"
              value={
                form.pesoNascimento
              }
              onChange={handleChange}
              placeholder="Peso Nascimento"
              className="
                border
                p-3
                rounded-xl
              "
            />

            <div className="
              flex
              flex-col
            ">

              <label className="
                text-sm
                font-medium
                mb-1
              ">
                Data de Nascimento
              </label>

              <input
                type="date"
                name="dataNascimento"
                value={
                  form.dataNascimento
                }
                onChange={handleChange}
                className="
                  border
                  p-3
                  rounded-xl
                "
              />

            </div>

            {
              form.origem ===
              "PARIDO" && (

                <>
                  <div className="
                    flex
                    flex-col
                  ">

                    <label className="
                      text-sm
                      font-medium
                      mb-1
                    ">
                      Nome da Vaca Mãe
                    </label>

                    <select
                      name="vacaMaeId"
                      value={
                        form.vacaMaeId
                      }
                      onChange={
                        handleChange
                      }
                      className="
                        border
                        p-3
                        rounded-xl
                      "
                    >

                      <option value="">
                        Selecione a Vaca
                      </option>

                      {
                        vacas.map(
                          (vaca) => (
                            <option
                              key={
                                vaca.id
                              }
                              value={
                                vaca.id
                              }
                            >
                              {
                                vaca.nome
                              }
                            </option>
                          )
                        )
                      }

                    </select>

                  </div>

                  <div className="
                    flex
                    flex-col
                  ">

                    <label className="
                      text-sm
                      font-medium
                      mb-1
                    ">
                      Nome do Touro Pai
                    </label>

                    <select
                      name="touroPaiId"
                      value={
                        form.touroPaiId
                      }
                      onChange={
                        handleChange
                      }
                      className="
                        border
                        p-3
                        rounded-xl
                      "
                    >

                      <option value="">
                        Selecione o Touro
                      </option>

                      {
                        touros.map(
                          (touro) => (
                            <option
                              key={
                                touro.id
                              }
                              value={
                                touro.id
                              }
                            >
                              {
                                touro.nome
                              }
                            </option>
                          )
                        )
                      }

                    </select>

                  </div>
                </>
              )
            }

            <button
              type="submit"
              className="
                bg-green-700
                hover:bg-green-800
                transition
                text-white
                font-semibold
                p-3
                rounded-xl
                col-span-2
              "
            >
              Cadastrar Bezerro
            </button>

          </form>

        </div>

      </div>
    </>
  );
}