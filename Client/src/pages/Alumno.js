import { useEffect, useState,useContext } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Dosificacion from '../Components/Dosificacion';
import Inscripcion from '../Components/Inscripicion';
import PerfilAlumno from '../Components/PerfilAlumno';
import Saturacion from '../Components/Saturacion';
import useUser from '../hooks/useUser';
import axios from 'axios';
import Altasybajas from '../Components/Altasybajas';
import ConsultaAltasybajas from "../Components/ConsultaAltasybajas";
//import 'react-tabs/style/react-tabs.css';
import "./alumno.css";
import alumnoImg from "./iconos/alumno.png";
import dosificacionImg from "./iconos/dosificacion.png";
import inscripcionImg from "./iconos/inscripcion.png";
import saturacionImg from "./iconos/saturacion.png";
import Periodoactivo  from '../context/PeriodoActivo';

//import ComponentePruebaselect from '../Components/ComponentePruebaselect';

function Alumno() {
    const {user,cerrarSeccion} = useUser();
    const [alumno,setAlumno] = useState({});
    const [active,setActive] = useState({
            tab1: true,
            tab2:false,
            tab3:false,
            tab4:false

    });
    //peticion a la api alumno
const [periodoActivo,setPeriodoActivo]=useState({});  
const[comprobanteab, setComprobanteab]=useState(false);
//
const [materias,setMaterias] = useState([]);
const [infoAlumno,setinfoAlumno] = useState({});
const [materias1,setMaterias1] = useState([]);
const [infoAlumno1,setinfoAlumno1] = useState({});


async function existeunComprobanteAB(){
    axios.post(process.env.REACT_APP_ALUMNO_CONSULTAALTASYBAJAS, {
        NumCuenta: alumno.NumCuenta,
        Periodo:periodoActivo.Periodo
        },{withCredentials:true} 
        ).then(json=>
            {
                const alumnoInformacion = json.data[0];
                const materiasInformacion = json.data[1];
                setMaterias(materiasInformacion);
                setinfoAlumno(alumnoInformacion[0]);
                setComprobanteab(true);
            }
              
            ).catch((error)=> {
              console.log(error);
            });
}

     async function periodoenCurso(){
        axios.get(process.env.REACT_APP_ADM_PERIODOSISTEMA).then(json=>
        {
          setPeriodoActivo({Periodo:json.data[0].Periodo,Inscripcion: json.data[0].Inscripcion, Aybajas:json.data[0].Aybajas })
        }
          
        ).catch((error)=> {
          console.log(error);
        });
    }

 async function datosAlumno(){
    axios.post(process.env.REACT_APP_ALUMNO, {
        Email: user.Email,
        },{withCredentials:true} 
        ).then((response) => {
              console.log(response.data);
              const [datos] = response.data;
              const { NumCuenta, NombreA,NombreC,PlanEstudios,Periodo,Modalidad}= datos
              console.log(datos.NumCuenta,datos.NombreA,datos.NombreC,datos.PlanEstudios,datos.Periodo,datos.Modalidad);
              console.log(NumCuenta, NombreA,NombreC,PlanEstudios,Periodo,Modalidad);
                setAlumno({
                NumCuenta, 
                NombreA,
                NombreC,
                PlanEstudios,
                Periodo,
                Modalidad,
                email: user.Email
              });
            }).catch((error) => {
              console.log(error.message);
              console.log(error.response);
              cerrarSeccion();
            });
 }

 async function existeunComprobanteInscripcion(){

        axios.post(process.env.REACT_APP_ALUMNO_CONSULTAINSCRIPCION, {
            NumCuenta: alumno.NumCuenta,
            Periodo:periodoActivo.Periodo
            },{withCredentials:true} 
            ).then((response) => {
                const alumnoInformacion = response.data[0];
                const materiasInformacion = response.data[1];
                setMaterias1(materiasInformacion);
                setinfoAlumno1(alumnoInformacion[0]);
            }).catch((error) => {
                console.log(error.message);
                console.log(error.response);
              });
 }

      
    useEffect(() => {
        (async () => {
            await datosAlumno();
        })();
        
        },[])

        useEffect(() => {
            (async () => {
                await   periodoenCurso();

            })();
            
            },[])


            useEffect(() => {
                if(alumno?.NumCuenta && periodoActivo?.Periodo){
                (async () => {
                    await existeunComprobanteAB();
                    await existeunComprobanteInscripcion();
                })();
                
             }else {return }

                },[alumno,periodoActivo])
    




    return ( 
        <>

           <br/>
            <br/>
            <Tabs>
                <div className="container colorContenedor animate__animated animate__backInDown">

                <TabList className="nav contenedor">
                    <Tab className={`nav-link  navComponent`}  onClick={(()=>{ if(active.tab1===false){
                        setActive({tab1:true, tab2: active.tab2===true&&false,
                        tab3: active.tab3===true&&false,tab4: active.tab4===true&&false});}})}>
                         <div className={`efectoNav  ${active.tab1 ? "efecto":""}`}href="#">
                            <span>Alumno</span>
                            <span>
                                <img src={alumnoImg} alt="icono"/>
                            </span>
                        </div>
                    </Tab>

                    <Tab className={`nav-link  navComponent `}  onClick={(()=>{ if(active.tab2===false){
                        setActive({tab2:true, tab1: active.tab1===true&&false,
                        tab3: active.tab3===true&&false,tab4: active.tab4===true&&false});}})}>
                           <div className={`efectoNav  ${active.tab2 ? "efecto":""}`}href="#">
                            <span>Dosificación</span>
                            <span>
                            <img src={dosificacionImg} alt="icono"/>
                            </span>
                        </div>
                    </Tab>

                    <Tab className={`nav-link  navComponent `}  onClick={(()=>{ if(active.tab3===false){
                        setActive({tab3:true, tab2: active.tab2===true&&false,
                        tab1: active.tab1===true&&false,tab4: active.tab4===true&&false});}})}>
                        <div className={`efectoNav  ${active.tab3 ? "efecto":""}`}href="#">
                            <span>{periodoActivo.Aybajas == "true"? "Altas y bajas" : "Inscripción"}</span>
                            <span>
                            <img src={inscripcionImg} alt="icono"/>
                            </span>
                        </div>
                    </Tab>

                    <Tab className={`nav-link  navComponent`}  onClick={(()=>{ if(active.tab4===false){
                        setActive({tab4:true, tab2: active.tab2===true&&false,
                        tab3: active.tab3===true&&false,tab1: active.tab1===true&&false});}})}>
                            <div className={`efectoNav  ${active.tab4 ? "efecto":""}`}href="#">
                            <span>Saturación</span>
                            <span>
                            <img src={saturacionImg} alt="icono"/>
                            </span>
                        </div>
                    </Tab>
                </TabList>

                <TabPanel>
                    <PerfilAlumno alumno={alumno} infoAlumno={{alumno:infoAlumno,materias:materias}} infoAlumno1={{alumno:infoAlumno1,materias:materias1}} />
                </TabPanel>
                <TabPanel>
                    <Dosificacion Periodo={periodoActivo?.Periodo} NumCuenta={alumno?.NumCuenta}/>
                </TabPanel>
                <TabPanel>
                   {periodoActivo.Aybajas == "true" && comprobanteab == false?
                   <Altasybajas Periodo={periodoActivo?.Periodo} NumCuenta={alumno?.NumCuenta} planEstudios={alumno?.PlanEstudios}/>
                   :periodoActivo.Aybajas == "true" && comprobanteab == true ? <ConsultaAltasybajas Periodo={periodoActivo?.Periodo} NumCuenta={alumno?.NumCuenta}/>  : <Inscripcion Periodo={periodoActivo?.Periodo} NumCuenta={alumno?.NumCuenta} planEstudios={alumno?.PlanEstudios}> </Inscripcion>} 
                </TabPanel>
                <TabPanel>
                    <Saturacion planEstudios={alumno?.PlanEstudios}/>
                </TabPanel>
                </div>
            </Tabs>


        </>

     );

}

export default Alumno;