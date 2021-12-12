import { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
//import useUser from '../hooks/useUser';

import "./alumno.css";
import "./administracion.css";
import alumnoImg from "./iconos/alumno.png";
import dosificacionImg from "./iconos/dosificacion.png";
import inscripcionImg from "./iconos/inscripcion.png";
import saturacionImg from "./iconos/saturacion.png";
import ModificarGrupo from '../Components/administrativo/ModificarGrupo';
import CrearGrupo from '../Components/administrativo/CrearGrupo';
import InscribirMaestro from '../Components/administrativo/InscribirMaestro';
import SaturacionAdministracion from '../Components/administrativo/SaturacionAdministrativo';
import BtnCerrarSeccion from '../Components/BtnCerrarSeccion';
import FormularioGDosficacion from '../Components/FormularioGDosificacion';
function Administracion() {
   
  /*const {user,cerrarSeccion} = useUser();
    const [alumno,setAlumno] = useState({});*/
    const [active,setActive] = useState({
            tab1: true,
            tab2:false,
            tab3:false,
            tab4:false,
            tab5:false

    });
   
    return ( 
        <>
                <br />
                <Tabs>
                    <div className="container colorContenedor animate__animated animate__backInDown containerAdministracion">

                    <TabList className="nav contenedor">
                        <Tab className={`nav-link  navComponent`}  onClick={(()=>{ if(active.tab1===false){
                            setActive({tab1:true, tab2: active.tab2===true&&false,
                            tab3: active.tab3===true&&false,tab4: active.tab4===true&&false,tab5: active.tab5===true&&false});}})}>
                            <div className={`efectoNav  ${active.tab1 ? "efecto":""}`}href="#">
                                <span>Administración</span>
                                <span>
                                    <img src={alumnoImg} alt="icono"/>
                                </span>
                            </div>
                        </Tab>

                        <Tab className={`nav-link  navComponent `}  onClick={(()=>{ if(active.tab2===false){
                            setActive({tab2:true, tab1: active.tab1===true&&false,
                            tab3: active.tab3===true&&false,tab4: active.tab4===true&&false, tab5: active.tab5===true&&false});}})}>
                            <div className={`efectoNav  ${active.tab2 ? "efecto":""}`}href="#">
                                <span>Crear Grupo</span>
                                <span>
                                <img src={dosificacionImg} alt="icono"/>
                                </span>
                            </div>
                        </Tab>

                        <Tab className={`nav-link  navComponent `}  onClick={(()=>{ if(active.tab3===false){
                            setActive({tab3:true, tab2: active.tab2===true&&false,
                            tab1: active.tab1===true&&false,tab4: active.tab4===true&&false,tab5: active.tab5===true&&false});}})}>
                            <div className={`efectoNav  ${active.tab3 ? "efecto":""}`}href="#">
                                <span>Modificar Grupo</span>
                                <span>
                                <img src={inscripcionImg} alt="icono"/>
                                </span>
                            </div>
                        </Tab>

                        <Tab className={`nav-link  navComponent`}  onClick={(()=>{ if(active.tab4===false){
                            setActive({tab4:true, tab2: active.tab2===true&&false,
                            tab3: active.tab3===true&&false,tab1: active.tab1===true&&false,tab5: active.tab5===true&&false});}})}>
                                <div className={`efectoNav  ${active.tab4 ? "efecto":""}`}href="#">
                                <span>inscribir maestro </span>
                                <span>
                                <img src={saturacionImg} alt="icono"/>
                                </span>
                            </div>
                        </Tab>
                        <Tab className={`nav-link  navComponent`}  onClick={(()=>{ if(active.tab5===false){
                            setActive({tab5:true, tab2: active.tab2===true&&false,
                            tab3: active.tab3===true&&false,tab1: active.tab1===true&&false,tab4: active.tab4===true&&false});}})}>
                                <div className={`efectoNav  ${active.tab5 ? "efecto":""}`}href="#">
                                <span>Generar Dosificacion </span>
                                <span>
                                <img src={saturacionImg} alt="icono"/>
                                </span>
                            </div>
                        </Tab>
                    </TabList>

                    <TabPanel>
                        <SaturacionAdministracion/>
                        <BtnCerrarSeccion/>
                    </TabPanel>
                    <TabPanel>
                        <CrearGrupo/>
                    </TabPanel>
                    <TabPanel>
                        <ModificarGrupo/>
                    </TabPanel>
                    <TabPanel>
                        <InscribirMaestro/>
                    </TabPanel>
                    <TabPanel>
                        <FormularioGDosficacion/>
                    </TabPanel>
                    </div>
                </Tabs>

        </>

     );
}

export default Administracion;