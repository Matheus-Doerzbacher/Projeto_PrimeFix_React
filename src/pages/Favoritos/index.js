import { useEffect, useState } from "react";
import "./favoritos.css"
import { Link } from "react-router-dom";

function Favoritos(){
    const [filmes, setFilmes] = useState([]);

    useEffect(()=>{

        const minhaLista = localStorage.getItem("@primeflix");
        setFilmes(JSON.parse(minhaLista) || [])

    }, [])

    function escluirFilme(id){
        alert("ID Clicado " + id)
    }
    return(
        <div className="meus-filmes">
            <h1>Meus Filmes</h1>

            <ul>
                {filmes.map((item) => {
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                                <button  onClick={() => escluirFilme(item.id)}>Excluir</button>
                            </div>

                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;