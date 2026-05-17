import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const {
      nome,
      numeroBrinco,
      numeroRegistro,
      dataNascimento,
      dataCompra,
      raca,
      usuario_id,
    } = body;

    if (!usuario_id) {

      return NextResponse.json(
        {
          message:
            "Usuário não autenticado",
        },
        {
          status: 401,
        }
      );
    }

    const {
      data,
      error,
    } = await supabase
      .from("vacas")
      .insert([
        {
          nome:
            nome ?? null,

          numero_brinco:
            numeroBrinco ?? null,

          numero_registro:
            numeroRegistro ?? null,

          data_nascimento:
            dataNascimento ?? null,

          data_compra:
            dataCompra ?? null,

          raca:
            raca ?? null,

          usuario_id:
            Number(usuario_id),
        },
      ])
      .select()
      .single();

    if (error) {

      return NextResponse.json(
        {
          message:
            error.message,
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        message:
          "Vaca cadastrado com sucesso!",

        data,
      },
      {
        status: 201,
      }
    );

  } catch (error) {

    return NextResponse.json(
      {
        message:
          "Erro interno no servidor",
      },
      {
        status: 500,
      }
    );
  }
}