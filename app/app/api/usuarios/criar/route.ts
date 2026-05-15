import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const {
      nome,
      email,
      senha
    } = body;

    // validação
    if (!nome || !email || !senha) {

      return NextResponse.json(
        { error: "Preencha todos os campos" },
        { status: 400 }
      );
    }

    // verifica email
    const { data: usuarioExistente } =
      await supabase
        .from("usuarios")
        .select("*")
        .eq("email", email)
        .single();

    if (usuarioExistente) {

      return NextResponse.json(
        { error: "Email já cadastrado" },
        { status: 400 }
      );
    }

    // criptografa senha
    const senhaCriptografada =
      await bcrypt.hash(senha, 10);

    // salva usuário
    const { data, error } =
      await supabase
        .from("usuarios")
        .insert([
          {
            nome,
            email,
            senha: senhaCriptografada,
            tipo: "USER",
          },
        ]);

    if (error) {

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);

  } catch (error) {

    return NextResponse.json(
      { error: "Erro interno" },
      { status: 500 }
    );
  }
}