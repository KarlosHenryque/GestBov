"use client";

import { FormEvent, useState } from "react";
import Swal from "sweetalert2";

export default function Home() {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function login(e: FormEvent) {

    e.preventDefault();

    try {

      const response = await fetch(
        "/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
            senha,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {

        Swal.fire({
          icon: "error",
          title: "Erro",
          text: data.error,
          confirmButtonColor:
            "#16a34a",
        });

        return;
      }

      Swal.fire({
        icon: "success",
        title: "Sucesso",
        text: "Login realizado!",
        confirmButtonColor:
          "#16a34a",
      });

      if (data.tipo === "ADMIN") {
        window.location.href =
          "/admin/cadastro";

      } else {
        window.location.href =
          "/client/homeClient";
      }

    } catch (error) {

      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Erro ao realizar login",
        confirmButtonColor:
          "#16a34a",
      });
    }
  }

  return (
    <div className="
      min-h-screen
      bg-green-50
      flex
      items-center
      justify-center
      px-4
    ">

      <div className="
        w-full
        max-w-md
        bg-white
        rounded-3xl
        shadow-2xl
        border
        border-green-100
        p-10
      ">

        <div className="text-center mb-10">

          <div className="
            w-24
            h-24
            bg-green-600
            rounded-full
            mx-auto
            flex
            items-center
            justify-center
            shadow-lg
            mb-5
          ">

            <span className="
              text-white
              text-4xl
              font-bold
            ">
              GB
            </span>

          </div>

          <h1 className="
            text-4xl
            font-bold
            text-green-700
          ">
            GestBov
          </h1>

          <p className="
            text-gray-500
            mt-2
          ">
            Sistema de Gestão Pecuária
          </p>

        </div>

        <form
          onSubmit={login}
          className="
            flex
            flex-col
            gap-5
          "
        >

          <div>

            <label className="
              block
              mb-2
              text-sm
              font-medium
              text-gray-700
            ">
              Email
            </label>

            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="
                w-full
                p-4
                border
                border-green-200
                rounded-2xl
                focus:outline-none
                focus:ring-2
                focus:ring-green-500
                transition
              "
            />

          </div>

          <div>

            <label className="
              block
              mb-2
              text-sm
              font-medium
              text-gray-700
            ">
              Senha
            </label>

            <input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) =>
                setSenha(
                  e.target.value
                )
              }
              className="
                w-full
                p-4
                border
                border-green-200
                rounded-2xl
                focus:outline-none
                focus:ring-2
                focus:ring-green-500
                transition
              "
            />

          </div>

          <button
            type="submit"
            className="
              bg-green-600
              hover:bg-green-700
              transition
              text-white
              font-semibold
              py-4
              rounded-2xl
              shadow-lg
            "
          >
            Entrar
          </button>

        </form>

      </div>

    </div>
  );
}