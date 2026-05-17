import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    const {
      usuario_id,
      origem,
      nome,
      sexo,
      raca,
      numeroBrinco,
      dataNascimento,
      pesoNascimento,
      vacaMaeId,
      touroPaiId,
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
      .from("bezerros")
      .insert([
        {
          usuario_id:
            Number(usuario_id),

          origem:
            origem ?? null,

          nome:
            nome ?? null,

          sexo:
            sexo ?? null,

          raca:
            raca ?? null,

          numero_brinco:
            numeroBrinco ?? null,

          data_nascimento:
            dataNascimento ??
            null,

          peso_nascimento:
            pesoNascimento
              ? Number(
                  pesoNascimento
                )
              : null,

          vaca_mae_id:
            vacaMaeId
              ? Number(
                  vacaMaeId
                )
              : null,

          touro_pai_id:
            touroPaiId
              ? Number(
                  touroPaiId
                )
              : null,

          comprado:
            origem ===
            "COMPRADO",
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
          "Bezerro cadastrado com sucesso!",

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