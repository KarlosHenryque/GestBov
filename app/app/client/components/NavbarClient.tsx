"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function NavbarClient() {
  const [open, setOpen] = useState<boolean>(false);

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (menuRef.current && !menuRef.current.contains(target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="w-full bg-green-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo / Título */}
        <div>
          <h1 className="text-white text-2xl font-bold">
            GestBov
          </h1>

          <p className="text-green-100 text-sm">
            Sistema de Gestão Pecuária
          </p>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">

          <Link
            href="/client/homeClient"
            className="text-white font-medium hover:text-green-200 transition"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>


          {/* DROPDOWN */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="text-white font-medium hover:text-green-200 transition"
            >
              Cadastro
            </button>

            {open && (
              <div className="absolute top-10 left-0 bg-white shadow-lg rounded-lg w-40 overflow-hidden z-50">
                <Link
                  href="/client/bezerros/criar"
                  className="block px-4 py-2 hover:bg-green-100"
                  onClick={() => setOpen(false)}
                >
                  Bezerro
                </Link>

                <Link
                  href="/client/touro/criar"
                  className="block px-4 py-2 hover:bg-green-100"
                  onClick={() => setOpen(false)}
                >
                  Touro
                </Link>

                <Link
                  href="/client/vacas/criar"
                  className="block px-4 py-2 hover:bg-green-100"
                  onClick={() => setOpen(false)}
                >
                  Vacas
                </Link>
              </div>
            )}
          </div>

          {/* Sair */}
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