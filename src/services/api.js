import axios from "axios";

// BASE DA URL: https://api.themoviedb.org/3/
// URL DA API: https://api.themoviedb.org/3/movie/now_playing?api_key=451007c8ae3c6db33c87b50352d233da&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;