
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
    input_user_id uuid
) returns void as $$
begin
    
    if check_if_movie_saved(input_movie_id, input_user_id) then
        raise exception 'Movie already saved';
    end if;

    insert into public.saved_movies (movie_id, user_id) values (input_movie_id, input_user_id);

    return;
end;
$$ language plpgsql;