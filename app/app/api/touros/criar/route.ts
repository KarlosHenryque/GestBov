import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { data, error } = await supabase
      .from("touros")
      .insert([
        {
          nome: body.nome ?? null,
          numero_brinco: body.numeroBrinco ?? null,
          numero_registro: body.numeroRegistro ?? null,
          data_nascimento: body.dataNascimento ?? null,
          data_compra: body.dataCompra ?? null,
          raca: body.raca ?? null,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { message: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Touro cadastrado com sucesso!",
        data,
      },
      { status: 201 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}