import axios from "axios";
import "./dosificacion.css";
import moment from 'moment'
import { useEffect, useState } from "react";
import Loading from "./Loading";
import MensajeInfo from "./MensajeInfo";

function Dosificacion({NumCuenta,Periodo}) {
    const [dosificacion,setdosificacion] = useState({});
    const [error,setError] = useState({
        error:false,
        mensaje: ""
      });
      const [loading,setLoading] = useState(false);
      
    

    useEffect(() => {
        setLoading(true);
        axios.post(process.env.REACT_APP_ALUMNO_DOSIFICACION, {
            NumCuenta: NumCuenta,
            Periodo:Periodo
            },{withCredentials:true} 
            ).then((response) => {
                setLoading(false);
                setError({
                    error:false,
                    mensaje:""
                });
                console.log(response.data);
                const arregloDosificacion =response.data[0];
                const arregloAlumno=response.data[1];
                const {NumCuenta,NombreA,NombreC,Periodo} = arregloDosificacion[0];
                const {Fecha,NumTurno}=arregloAlumno[0];
                console.log(NumCuenta,NombreA,NombreC,Periodo,Fecha,NumTurno);
                const fecha =moment(Fecha).format("MMMM Do YYYY, h:mm:ss a");
                console.log(fecha);
                setdosificacion({
                    NumCuenta,
                    NombreA,
                    NombreC,
                    Periodo,
                    Fecha,
                    NumTurno
                });
                //setListaMaterias(response.data);
            }).catch((error) => {
                console.log(error.message);
                console.log(error.response);
                setLoading(false);
                setError({
                    error:true,
                    mensaje:"Dosificacion no disponible por el momento"
                });
              });


    },[]);


    return ( <>

            {
                 loading&&<div className="tamañoLoading">
                                <Loading/>
                            </div>
            }

            {
                /*loading ?
                <div className="tamañoLoading">
                    <Loading/>
                </div>
                        :*/
               
             (!loading&&!error.error)&& <div className="ContenedorD animate__animated animate__fadeInUp">

                        <div className="deconstructed titulo">
                            Dosificación
                            <div>Dosificación</div>
                            <div>Dosificación</div>
                            <div>Dosificación</div>
                            <div>Dosificación</div>
                        </div>

                        <ul className="list-group">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <span >Numero Cuenta:  </span>
                                <span >{dosificacion?.NumCuenta}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <span >Nombre:  </span>
                                <span > {dosificacion?.NombreA}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <span >Periodo:  </span>
                                <span >{dosificacion?.Periodo}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <span >carrera:  </span>
                                <span >{dosificacion?.NombreC}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <span >fecha:  </span>
                                <span >{moment(dosificacion?.Fecha).format("L")}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <span >hora:  </span>
                                <span >{moment(dosificacion?.Fecha).format("LT")}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <span >lugar:  </span>
                                <span >{dosificacion?.NumTurno}</span>
                            </li>
                        </ul>
                </div>
            }
                {
                    error.error&&<div className="tamañoMensaje">
                                 <MensajeInfo mensaje={error.mensaje}/>
                            </div>
                }  
            
            </> );
}

export default Dosificacion;