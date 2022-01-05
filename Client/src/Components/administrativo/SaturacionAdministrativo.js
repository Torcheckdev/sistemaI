import { useEffect, useState } from "react";
import axios from 'axios';
import Loading from "../Loading";
import MensajeInfo from "../MensajeInfo";
//import useUser from "../../hooks/useUser";


function SaturacionAdministracion() {
    //const {cerrarSeccion} = useUser();
    const [ListaMaterias,setListaMaterias] = useState([]);
    const [error,setError] = useState({
        error:false,
        mensaje: ""
      });
      const [loading,setLoading] = useState(false);
      
    

    useEffect(() => {
        setLoading(true);
        axios.post(process.env.REACT_APP_ALUMNO_SATURACION, {
            PlanEstudios: "1119",
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
                    mensaje:"Horario de grupos no disponible por el momento"
                });
                setLoading(false);
                //cerrarSeccion();
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
                                Lista de grupos
                                <div>Lista de grupos</div>
                                <div>Lista de grupos</div>
                                <div>Lista de grupos</div>
                                <div>Lista de grupos</div>
                            </div>
                        <div className="card-body">
                            <table className="table table-hover table-bordered table-sm">
                                <thead className="mdb-color darken-3 colorEncabezado">
                                    <tr className="text-tabla">
                                        <th>Clave</th>

                                        <th>Folio</th>

                                        <th>Materia</th>
                                        <th>Grupo</th>

                                        <th>Día</th>
                                        <th>Horario</th>

                                        <th>Total lugares</th>
                                        <th>Ocupados</th>
                                        <th>Disponibles</th>
                                    </tr>
                                </thead>
                                <tbody>
        
                                    {ListaMaterias.map(({IDmateria,Nombre,Grupo,Cupo,Inscritos,folioAsig,Dia,Horario})=>{
                                          return <tr>
                                                    <th scope="row">{IDmateria}</th>

                                                    <td>{folioAsig}</td>

                                                    <td>{Nombre}</td>
                                                    <td>{Grupo}</td>

                                                    <td>{Dia}</td>
                                                    <td>{Horario}</td>

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

export default SaturacionAdministracion;