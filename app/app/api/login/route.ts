import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const {
      email,
      senha
    } = body;

    // procura usuário
    const { data: usuario, error } =
      await supabase
        .from("usuarios")
        .select("*")
        .eq("email", email)
        .single();

    if (error || !usuario) {

      return NextResponse.json(
        { error: "Email inválido" },
        { status: 400 }
      );
    }

    // verifica status
    if (!usuario.status) {

      return NextResponse.json(
        {
          error:
            "Usuário desativado",
        },
        { status: 403 }
      );
    }

    // verifica senha
    const senhaCorreta =
      await bcrypt.compare(
        senha,
        usuario.senha
      );

    if (!senhaCorreta) {

      return NextResponse.json(
        { error: "Senha inválida" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      id: usuario.id,
      nome: usuario.nome,
      tipo: usuario.tipo,
    });

  } catch (error) {

    return NextResponse.json(
      { error: "Erro interno" },
      { status: 500 }
    );
  }
}