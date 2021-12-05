import { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Dosificacion from '../Components/Dosificacion';
import Inscripcion from '../Components/Inscripicion';
import PerfilAlumno from '../Components/PerfilAlumno';
import Saturacion from '../Components/Saturacion';
import useUser from '../hooks/useUser';
import axios from 'axios';

//import 'react-tabs/style/react-tabs.css';
import "./alumno.css";
import alumnoImg from "./iconos/alumno.png";
import dosificacionImg from "./iconos/dosificacion.png";
import inscripcionImg from "./iconos/inscripcion.png";
import saturacionImg from "./iconos/saturacion.png";
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
    useEffect(() => {
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


    },[]);


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
                            <span>dosificacion</span>
                            <span>
                            <img src={dosificacionImg} alt="icono"/>
                            </span>
                        </div>
                    </Tab>

                    <Tab className={`nav-link  navComponent `}  onClick={(()=>{ if(active.tab3===false){
                        setActive({tab3:true, tab2: active.tab2===true&&false,
                        tab1: active.tab1===true&&false,tab4: active.tab4===true&&false});}})}>
                        <div className={`efectoNav  ${active.tab3 ? "efecto":""}`}href="#">
                            <span>Inscripcion</span>
                            <span>
                            <img src={inscripcionImg} alt="icono"/>
                            </span>
                        </div>
                    </Tab>

                    <Tab className={`nav-link  navComponent`}  onClick={(()=>{ if(active.tab4===false){
                        setActive({tab4:true, tab2: active.tab2===true&&false,
                        tab3: active.tab3===true&&false,tab1: active.tab1===true&&false});}})}>
                            <div className={`efectoNav  ${active.tab4 ? "efecto":""}`}href="#">
                            <span>Saturacion</span>
                            <span>
                            <img src={saturacionImg} alt="icono"/>
                            </span>
                        </div>
                    </Tab>
                </TabList>

                <TabPanel>
                    <PerfilAlumno alumno={alumno}/>
                </TabPanel>
                <TabPanel>
                    <Dosificacion Periodo={alumno?.Periodo} NumCuenta={alumno?.NumCuenta}/>
                </TabPanel>
                <TabPanel>
                    <Inscripcion Periodo={alumno?.Periodo} NumCuenta={alumno?.NumCuenta} planEstudios={alumno?.PlanEstudios}/>
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