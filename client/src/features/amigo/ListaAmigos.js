import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './listaAmigos.css';
import { useGetAmigosQuery } from './amigoSlice';
import Loading from '../../Components/Loading';

const ListaAmigos = () => {
    const {data:amigos, isFetching, isSuccess} = useGetAmigosQuery({
        pagina: 1,
        limite: 8
    });

    useEffect(() => {
        if(isSuccess){
            console.log(amigos);
        }
    }, [amigos,isSuccess]);

    if (isFetching) {
        return (            
            <Loading/>
        )
    }else if (isSuccess){
        return (
            <div id='lista_amigos ' className='page bg-light'>
                <div className='container-fluid py-5'>
                    <div className='row row-cols-1 row-cols-lg-4 row-cols-md-3 g-3'>
                        {amigos['amigos'].map((amigo, index) => {
                            return (
                            <div key={index} className='col'>
                                <div className='card'>
                                    <div className='card-header'
                                     style={{ backgroundImage: `url(/images/${
                                        amigo.genero === 'M' ? "guy.png":
                                        amigo.genero === 'F' ? "girl.png" : "otros.png"
                                     })` }}/>
                                    <div className='card-body px-4'>
                                        <h5 className='card-title'>{amigo.nombre}</h5>
                                        <div className='card-text'>
                                            <div className="card-stats">
                                                <div>★★★☆☆</div> 
                                                <div>{amigo.n_clientes} 
                                                    
                                                </div>
                                            </div>
                                            <div className="card-actions">
                                            <Link to={`/amigos/${amigo.amigo_id}`}className='btn btn-azul'>Ver Perfil</Link>                     
                                                {amigo.precio_amigo}$/hr  
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )})}
                    </div>
                </div>
            </div>
        );
    }   
}

export default ListaAmigos;
