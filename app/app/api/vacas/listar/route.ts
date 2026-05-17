import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  req: Request
) {

  try {

    const { searchParams } =
      new URL(req.url);

    const usuario_id =
      searchParams.get(
        "usuario_id"
      );

    if (!usuario_id) {

      return NextResponse.json(
        {
          message:
            "Usuário não informado",
        },
        {
          status: 400,
        }
      );
    }

    const {
      data,
      error,
    } = await supabase
      .from("vacas")
      .select(`
        id,
        nome
      `)
      .eq(
        "usuario_id",
        Number(usuario_id)
      )
      .order(
        "nome",
        {
          ascending: true,
        }
      );

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
      data
    );

  } catch (error) {

    return NextResponse.json(
      {
        message:
          "Erro interno",
      },
      {
        status: 500,
      }
    );
  }
}