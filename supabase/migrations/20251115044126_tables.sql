create table saved_movies (
    id uuid primary key default gen_random_uuid(),
    movie_id varchar(255) not null,
    user_id uuid references auth.users(id) not null,
    created_at timestamp with time zone default now() not null,
    updated_at timestamp,
    deleted_at timestamp
);

comment on table saved_movies is 'Table to store saved movies';

--for now anonymous ratings
create table movie_ratings (
    id uuid primary key default gen_random_uuid(),
    movie_id varchar(255) not null unique,
    rating integer not null,
    created_at timestamp with time zone default now() not null,
    updated_at timestamp,
    deleted_at timestamp
);

comment on table movie_ratings is 'Table to store movie ratings';
