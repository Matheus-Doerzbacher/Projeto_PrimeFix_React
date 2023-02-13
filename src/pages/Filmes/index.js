import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";


function Filme(){
    const { id } = useParams();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

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
            })
        }

        loadFilme();

        return () => {
            console.log("Componente foi desmontado")
        }
    },[])


    return(
        <div>
            <h1>Acessando filme {id}</h1>
        </div>
    )
}

export default Filme;