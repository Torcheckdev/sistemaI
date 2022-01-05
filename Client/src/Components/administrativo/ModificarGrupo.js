import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';//componente de react para el select contiene: el buscador,animaciones, muchas funciones utiles
//import profesorMateria from '../../helpers/JsonProfesorMateria';
import FormularioModificarGrupo from './FormularioModificaeGrupo';

import Loading from "../Loading";
import MensajeInfo from "../MensajeInfo";
import EfectoLetrasTitulo from '../EfectoLetrasTitulo';
/*const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];*/

const options =(profesorMateria)=>{
    const arreglo = profesorMateria.map(profMat=>{
        //return {value : profMat.nombreProfesor+":"+profMat.nombreMateria, label : "profesor:"+profMat.nombreProfesor+" Materia: "+profMat.nombreMateria}
        return {value : profMat?.folioAsig, label :"Folio: "+profMat?.folioAsig+ " profesor:"+profMat?.NombreProf+" Materia: "+profMat?.Nombremateria};
    });
    return arreglo;
};

function ModificarGrupo() {
    const [selectedOption, setSelectedOption] = useState(null);//declaramos el estado para guardar la opcion que escoje en el select
    const [grupos, setGrupos] = useState({estado:false,itemElegido:0,grups:[]});
    const [opciones,setOpciones] = useState([]);
    const [defaultItem,setDefaultItem] = useState("");
    const [listas,setListas] = useState({listaProfMa:[],listaHorario:[]});


    const [error,setError] = useState({
        error:false,
        mensaje: ""
      });
      const [loading,setLoading] = useState(false);

    //const opciones = options();//obtenemos las opciones para los options de los select

    const handleChangeSelect = (selectedOptionF) => {//Esta funcion sirve para obtener el evento cuando el usuario seleciona el la opcion de selet y obtener un value
        setGrupos({...grupos,estado:false});
        console.log(selectedOptionF);
        setSelectedOption(selectedOptionF.value);//lo agregamos al estado 
        console.log(selectedOption);
        const nuMgrupo = grupos.grups.find(grup => { 
            //console.log(grup?.folioAsig,selectedOption,(grup?.folioAsig === selectedOptionF.value));
            return grup?.folioAsig === selectedOptionF.value});
        console.log(nuMgrupo);
        setGrupos({...grupos,estado:true,itemElegido:nuMgrupo});
    
    }

    const restaurarItem = (grupo)=>{
        setOpciones(opciones.filter((item)=>{
            return item.value != grupo.folioAsig ;
          }))
        setGrupos({...grupos,estado:false});
        setSelectedOption(null);
    }

    useEffect(() => {
        setLoading(true);
        axios.get(process.env.REACT_APP_ADM_LISTAMODINSCASIGNATURA)
            .then(response => {
                setLoading(false);
                setError({
                    error:false,
                    mensaje:""
                });
                const listaGrupos = response.data[0];
                const maestroMateria = response.data[1];
                const horarios = response.data[2];
                setListas({listaProfMa:maestroMateria,listaHorario:horarios});
                console.log(listaGrupos);
                setGrupos({...grupos,grups: listaGrupos});
                const opciones = options(listaGrupos);
                setOpciones(opciones);

            })
            .catch(e => {
                // Podemos mostrar los errores en la consola
                console.log(e);
                setError({
                    error:true,
                    mensaje:"no disponible para modificar un grupo"
                });
  

            })
    },[]);
    console.log(grupos);
    console.log(opciones);
    console.log(selectedOption);
    
    return ( <>
                     {
                 loading&&<div className="tamañoLoading">
                                <Loading/>
                            </div>
                     }



                    {/*
                    select es el componente a renderizar, defaulValue sirve para pasarle estado que va mostrar el value en el select
                    onChange recive la funcion que va realizar el evento cuando seleccionemos una opcion del select
                    options es un arreglo de los options o los items del select tienes que manda {value: "valor", label: "nombre del item"}
                    defaultValue recive el item que queremos que muestre cuando se renderize
                        */}
                  {(!loading&&!error.error)&& <div>
                    <EfectoLetrasTitulo titulo={"Modificar Grupo:"}/>
                       <div className={`${(!selectedOption) ? "selectProf":""}`}>
                            <Select
                                defaultValue={selectedOption}
                                onChange={handleChangeSelect}
                                options={opciones}
                                defaultValue={defaultItem}
                                placeholder={"Elige un grupo"}
                            /> 
                       </div>

                        {grupos.estado&& <FormularioModificarGrupo grupo={grupos.itemElegido}  reset={restaurarItem} listaHorario={listas.listaHorario} listaMaestroMateria={listas.listaProfMa}  />}  
                    </div>     }

                    {
                    error.error&&<div className="tamañoMensaje">
                                 <MensajeInfo mensaje={error.mensaje}/>
                            </div>
                    }  
            </> );
}

export default ModificarGrupo;