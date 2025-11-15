
create table saved_movies (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) not null,
    movie_id varchar(255) not null,
    title varchar(255) not null,
    poster_path varchar(255) not null,
    vote_average integer not null,
    release_date date not null,
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
