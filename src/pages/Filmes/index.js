import { useEffect, useState } from "react";
import { useParams, useNavigate, json } from "react-router-dom";
import api from "../../services/api";
import "./filmes.css"
import { toast } from "react-toastify";


function Filme(){
    const { id } = useParams();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: "451007c8ae3c6db33c87b50352d233da",
                    language: "pt-BR",
                }
            })
            .then((response) => {
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=>{
                console.log("Filme Não Encontrado")
                navigate("/",{replace: true})
                return;
            })
        }

        loadFilme();

        return () => {
            console.log("Componente foi desmontado")
        }    
    }, [id, navigate])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmesSalvos) => filmesSalvos.id == filme.id)

        if(hasFilme){
            toast.warn("Esse filme ja está na lista");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        toast.success("Filmes salvo com sucesso");
    }

    if(loading){
        return(
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
           <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}  />
           
           <h3>Sinopse</h3>
           <span>{filme.overview}</span>
           <strong>Avaliação: {filme.vote_average.toFixed(2)}/10</strong>

           <div className="area-buttons">
            <button onClick={salvarFilme}>Salvar</button>
            <button>
                <a target="blank" rell="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                    Trailer
                </a>
            </button>

           </div>

        </div>
    )
}

export default Filme;