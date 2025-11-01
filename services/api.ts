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

/* const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzMxMGY4ZDdjYmI4NzlkZDlkOTFlNDc5MTk0M2M1YiIsIm5iZiI6MTc2MjA0OTA1MC4wMDEsInN1YiI6IjY5MDZiYzE5NGM5OGM3ZTE1NDU5N2U3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.t4P4lEmWi4mlhwNExcsKnTUQxdoJd0C7qFjhwbwKfYE'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err)); */
