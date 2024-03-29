import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./home.css";

// URL DA API: https://api.themoviedb.org/3/movie/now_playing?api_key=451007c8ae3c6db33c87b50352d233da&language=pt-BR

function Home(){
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadFilmes(){
            const reponse = await api.get("movie/now_playing", {
                params:{
                    api_key: "451007c8ae3c6db33c87b50352d233da",
                    language: "pt-BR",
                    page: 1,
                }
            })

            // console.log(reponse.data.results.slice(0, 10));
            setFilmes(reponse.data.results.slice(0, 20));
            setLoading(false);

        }

        loadFilmes();
        

    },[])

    if(loading){
        return(
            <div className="loading">
                <h2>Carregando Filmes...</h2>
            </div>
        )
    }

    return(
        <div className="container">
            <div className="lista-filmes">
                {filmes.map((filme) => {
                    return(
                        <div className="teste">
                            <article key={filme.id}>
                                <div className="container-filmes">
                                    <strong>{filme.title}</strong>
                                    <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                                    <Link to={`/filme/${filme.id}`}>Acessar</Link>
                                </div>
                            </article>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;