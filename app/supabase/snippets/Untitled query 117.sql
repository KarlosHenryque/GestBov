create table touros (
  id bigint generated always as identity primary key,

  nome varchar(255) not null,
  numero_brinco varchar(50),
  numero_registro varchar(50),

  data_nascimento date,
  data_compra date,

  raca varchar(100)
);

alter table touros disable row level security;