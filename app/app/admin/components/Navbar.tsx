"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-green-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">

          <div>
            <h1 className="text-white text-2xl font-bold">
              GestBov
            </h1>

            <p className="text-green-100 text-sm">
              Sistema de Gestão Pecuária
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="/admin/cadastro"
            className="text-white font-medium hover:text-green-200 transition"
          >
            Cadastro
          </Link>

          <Link
            href="/admin/usuarios"
            className="text-white font-medium hover:text-green-200 transition"
          >
            Usuários
          </Link>

          <Link
            href="/"
            className="bg-white text-green-700 px-4 py-2 rounded-xl font-semibold hover:bg-green-100 transition shadow-md"
          >
            Sair
          </Link>

        </div>
      </div>
    </nav>
  );
}