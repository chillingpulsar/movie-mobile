import { supabase } from '@/lib/supabase';

export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    HEADERS: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
};

export const fetchPopularMovies = async ({ q }: { q: string }) => {
    const endpoint = q
        ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${q}`
        : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.HEADERS
    });

    if (!response.ok) {
        //@ts-ignore
        throw new Error('Failed to fetch movies', response.statusText);
    }

    const data = await response.json();

    return data.results;
};

export const fetchMovieDetails = async ({ id }: { id: string }) => {
    const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/${id}`;

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.HEADERS
    });

    if (!response.ok) {
        //@ts-ignore
        throw new Error('Failed to fetch movie details', response.statusText);
    }

    const data = await response.json();

    return data;
};

export const saveMovie = async ({ id, userId }: { id: string; userId: string }) => {
    const { error } = await supabase.rpc('insert_save_movie', {
        input_movie_id: id,
        input_user_id: userId
    });

    if (error) {
        return { errorMsg: error.message };
    }

    return { errorMsg: null };
};

export const checkIfMovieSaved = async ({ id, userId }: { id: string; userId: string }) => {
    const { data, error } = await supabase.rpc('check_if_movie_saved', {
        input_movie_id: id,
        input_user_id: userId
    });

    if (error) {
        return { errorMsg: error.message, isSaved: false };
    }

    return { errorMsg: null, isSaved: data };
};

export const unsaveMovie = async ({ id, userId }: { id: string; userId: string }) => {
    const { error } = await supabase
        .from('saved_movies')
        .delete()
        .match({ movie_id: id, user_id: userId });

    if (error) {
        return { errorMsg: error.message };
    }

    return { errorMsg: null };
};
