import { useEffect, useState } from "react";
import "./saturacion.css";
import axios from 'axios';
import Loading from "./Loading";
import MensajeInfo from "./MensajeInfo";
function Saturacion({planEstudios}) {
    const [ListaMaterias,setListaMaterias] = useState([]);
    const [error,setError] = useState({
        error:false,
        mensaje: ""
      });
      const [loading,setLoading] = useState(false);
      
    

    useEffect(() => {
        setLoading(true);
        axios.post(process.env.REACT_APP_ALUMNO_SATURACION, {
            PlanEstudios: planEstudios,
            },{withCredentials:true} 
            ).then((response) => {
                setLoading(false);
                setError({
                    error:false,
                    mensaje:""
                });
                console.log(response.data);
                const {IDmateria,Nombre,Grupo,Cupo,Inscritos} = response.data[0];
                
                console.log(IDmateria,Nombre,Grupo,Cupo,Inscritos);
                setListaMaterias(response.data);
            }).catch((error) => {
                console.log(error.message);
                console.log(error.response);
                setError({
                    error:true,
                    mensaje:"saturacion no disponible por el momento"
                });
                setLoading(false);
              });


    },[]);

    return ( <>

                {
                 loading&&<div className="tamañoLoading">
                                <Loading/>
                            </div>
                }
                {/*loading?
                    <div className="tamañoLoading">
                        <Loading/>
                    </div>
                        :*/
                        
                       (!loading&&!error.error)&& <div className="card mb-4 tablaOverflowe animate__animated animate__fadeInRight">
                            <div className="deconstructed titulo">
                                Saturación
                                <div>Saturación</div>
                                <div>Saturación</div>
                                <div>Saturación</div>
                                <div>Saturación</div>
                            </div>
                        <div className="card-body">
                            <table className="table table-hover table-bordered table-sm">
                                <thead className="mdb-color darken-3 colorEncabezado">
                                    <tr className="text-tabla">
                                        <th>Clave</th>
                                        <th>Materia</th>
                                        <th>grupo</th>
                                        <th>total lugares</th>
                                        <th>ocupados</th>
                                        <th>disponibles</th>
                                    </tr>
                                </thead>
                                <tbody>
        
                                    {ListaMaterias.map(({IDmateria,Nombre,Grupo,Cupo,Inscritos})=>{
                                          return <tr>
                                                    <th scope="row">{IDmateria}</th>
                                                    <td>{Nombre}</td>
                                                    <td>{Grupo}</td>
                                                    <td>{Cupo}</td>
                                                    <td>{Inscritos}</td>
                                                    <td>{Cupo-Inscritos}</td>
                                                </tr>
                                    })}
                                </tbody>
                            
                            </table>
                            
                        </div>
                    </div>
                }
              {error.error&&<div className="tamañoMensaje">
                                 <MensajeInfo mensaje={error.mensaje}/>
                            </div>}  
            </> );
}

export default Saturacion;