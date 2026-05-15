create table usuarios (
  id bigint generated always as identity primary key,
  nome text not null,
  email text unique not null,
  senha text not null,
  tipo text not null default 'USER'
);

alter table usuarios disable row level security;


insert into usuarios
(nome, email, senha, tipo)
values
(
  'Administrador',
  'admin@email.com',
  '$2a$10$5Qhupow7xJxK6yFqHimN2eK6.xlY2vNhbbX6YsJhBKt3vnDnN/SfG',
  'ADMIN'
);

alter table usuarios
add column status boolean default true;