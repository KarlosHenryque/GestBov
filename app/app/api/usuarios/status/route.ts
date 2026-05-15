import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function PUT(req: Request) {

  try {

    const body = await req.json();

    const {
      id,
      status
    } = body;

    const { error } = await supabase
      .from("usuarios")
      .update({
        status
      })
      .eq("id", id);

    if (error) {

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Status atualizado"
    });

  } catch (error) {

    return NextResponse.json(
      { error: "Erro interno" },
      { status: 500 }
    );
  }
}