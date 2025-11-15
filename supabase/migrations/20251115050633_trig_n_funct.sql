
create or replace function check_if_movie_saved(
    input_movie_id varchar(255),
    input_user_id uuid
) returns boolean as $$
begin
    return exists (select 1 from public.saved_movies where movie_id = input_movie_id and user_id = input_user_id);
end;
$$ language plpgsql;


create or replace function insert_save_movie(
    input_movie_id varchar(255),
    input_user_id uuid,
    input_title varchar(255),
    input_poster_path varchar(255),
    input_vote_average integer,
    input_release_date date
) returns void as $$
begin
    
    if check_if_movie_saved(input_movie_id, input_user_id) then
        raise exception 'Movie already saved';
    end if;

    insert into public.saved_movies (
        movie_id, 
        user_id, title, 
        poster_path, 
        vote_average, 
        release_date
    ) 
    values (
        input_movie_id, 
        input_user_id, 
        input_title, 
        input_poster_path, 
        input_vote_average, 
        input_release_date
    );

    return;
end;
$$ language plpgsql;