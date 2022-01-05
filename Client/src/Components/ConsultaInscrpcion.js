
import axios from "axios";
import { useEffect, useState } from "react";
import BotonPdf from "./BotonPdf";
import EfectoLetrasTitulo from "./EfectoLetrasTitulo";
import Loading from "./Loading";
import MensajeInfo from "./MensajeInfo";
import "./PDFInscrpcion.css";
//import { useState } from 'react';



function ConsultaInscrpcion({NumCuenta,Periodo}) {
    const [materias,setMaterias] = useState([]);
    const [infoAlumno,setinfoAlumno] = useState({});
    const [error,setError] = useState({
        error:false,
        mensaje: ""
      });
      const [loading,setLoading] = useState(false);
      const [btnPdf,setbtnPdf] = useState(false);

      useEffect(() => {
        setLoading(true);
        axios.post(process.env.REACT_APP_ALUMNO_CONSULTAINSCRIPCION, {
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
                const alumnoInformacion = response.data[0];
                const materiasInformacion = response.data[1];
                setMaterias(materiasInformacion);
                setinfoAlumno(alumnoInformacion[0]);
                console.log(materias,infoAlumno);
                setbtnPdf(true);
            }).catch((error) => {
                console.log(error.message);
                console.log(error.response);
                setError({
                    error:true,
                    mensaje:"Comprobante de inscrpcion no disponible por el momento"
                });
                setLoading(false);
              });


    },[]);

    

    return ( <>
                            {(!loading&&!error.error)&&<>
                             <EfectoLetrasTitulo titulo={"Comprobante de inscripcion"}/>
                             <div className="card mb-4 tablaOverflowe animate__animated animate__fadeInRight">


                                    <div className="card-body">


                                        <table className="table table-hover table-bordered table-sm">
                                            <thead className="mdb-color darken-3 colorEncabezado">
                                                <tr className="text-tabla">
                                                    <th>Numero Cuenta</th>
                                                    <th>Nombre</th>
                                                    <th>carrera</th>
                                                    <th>año inscrpcion</th>
                                                </tr>
                                            </thead>
                                            <tbody> 
                                                    <tr>
                                                        <th scope="row">{infoAlumno?.NumCuenta}</th>
                                                        <td>{infoAlumno?.NombreA}</td>
                                                        <td>{infoAlumno?.NombreC}</td>
                                                        <td>{infoAlumno?.AnioInscripcion}</td>
                                                    </tr>
                                            </tbody>
                                        </table> 
                                        <table className="table table-hover table-bordered table-sm">
                                            <thead className="mdb-color darken-3 colorEncabezado">
                                                <tr className="text-tabla">
                                                    <th>Plantel</th>
                                                    <th>Plan de estudios</th>
                                                    <th>periodo</th>
                                                </tr>
                                            </thead>
                                            <tbody> 
                                                    <tr>
                                                        <th scope="row">{infoAlumno?.NombreP}</th>
                                                        <td>{infoAlumno?.PlanEstudios}</td>
                                                        <td>{infoAlumno?.Periodo}</td>
                                                    </tr>
                                            </tbody>
                                        </table> 
                                        <table className="table table-hover table-bordered table-sm">
                                            <thead className="mdb-color darken-3 colorEncabezado">
                                                <tr className="text-tabla">
                                                    <th>Clave</th>
                                                    <th>Materia</th>
                                                    <th>Creditos</th>
                                                    <th>Semestre</th>
                                                    <th>Grupo</th>
                                                    <th>MOV.</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                    
                                                {materias.map(({IDmateria,Nombre,Grupo,Creditos,Semestre})=>{
                                                    return <tr>
                                                                <th scope="row">{IDmateria}</th>
                                                                <td>{Nombre}</td>
                                                                <td>{Creditos}</td>
                                                                <td>{Semestre}</td>
                                                                <td>{Grupo}</td>
                                                                <td>{"Alta"}</td>
                                                            </tr>
                                                })}
                                            </tbody>
                                        </table> 
                                    </div>
                             </div>
                             {btnPdf&&<BotonPdf name={"Inscripcion"} infoAlumno={{alumno:infoAlumno,materias:materias}}/>}
                             </>}
                             {
                 loading&&<div className="tamañoLoading">
                                <Loading/>
                            </div>
                }
                {error.error&&<div className="tamañoMensaje">
                                 <MensajeInfo mensaje={error.mensaje}/>
                            </div>}  
            </> );
}

export default ConsultaInscrpcion;