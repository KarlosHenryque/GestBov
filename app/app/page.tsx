import { supabase } from "@/lib/supabase";

export default async function Home() {

  const { data, error } = await supabase
        .from("usuarios")
        .select("*")

    console.log(data);

  return (
    <div>
      <h1>Usuários</h1>

      {data?.map((user) => (
        <p key={user.id}>
          {user.nome}
        </p>
      ))}
    </div>
  )

}