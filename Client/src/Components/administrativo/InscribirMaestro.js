import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import Select from 'react-select';
import EfectoLetrasTitulo from '../EfectoLetrasTitulo';

import Loading from "../Loading";
import MensajeInfo from "../MensajeInfo";

/*const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];*/

const optionsProfesor =(profesores)=>{
    const arreglo = profesores.map(prof=>{
        return {value : prof.IDprofesor, label : "profesor:"+prof.Nombre+" Matricula: "+prof.IDprofesor}
    })
    return arreglo;
};

const optionsMaterias =(materias)=>{
    const arreglo = materias.map(materia=>{
        return {value : materia.IDmateria, label : "Materia:"+materia.Nombre+" Creditos: "+materia.Creditos}
    })
    return arreglo;
};

function InscribirMaestro() {
   
    const alert = useAlert();

    const [selectedOption1, setSelectedOption1] = useState(null);
    const [selectedOption2, setSelectedOption2] = useState(null);
    const [options,setOptions] = useState({option1:[],option2:[]});


    const [error,setError] = useState({
      error:false,
      mensaje: ""
    });
    const [loading,setLoading] = useState(false);

    useEffect(() => {
      setLoading(true);
      axios.get(process.env.REACT_APP_ADM_LISTAMATERIAPROF)
          .then(response => {
            setLoading(false);
            setError({
                error:false,
                mensaje:""
            });

              const listaGrupos = response.data;
              console.log(listaGrupos);

              const [materias,profes] = listaGrupos;
              console.log(materias,profes);
              setOptions({option1:optionsProfesor(profes),option2:optionsMaterias(materias)});
          })
          .catch(e => {
              // Podemos mostrar los errores en la consola
              console.log(e);
              setError({
                error:true,
                mensaje:"no disponible para inscribir maestro"
            });
          })
  },[]);

  const handleSubmit= (event) => {
    event.preventDefault();
    //console.log(e);
    console.log(selectedOption1,selectedOption2);

    if(selectedOption1 === null || selectedOption2 === null ){
      alert.show("no tiene un profesor o materia elegido");
      return
    }

   axios.post(process.env.REACT_APP_ADM_INSCPROFESOR, {
        IDmateria: selectedOption2.value,
        IDprofesor:selectedOption1.value
        },{withCredentials:true} 
        ).then((response) => {
              console.log(response.data);
              alert.show("Maestro inscrito ");
            }).catch((error) => {
              console.log(error.message);
              console.log(error.response);
              alert.show("Nose pudo inscribir al maestro a la materia");
            });

  }
    

    return ( <>

            {
            loading&&<div className="tamañoLoading">
                                <Loading/>
                            </div>
            }

            { (!loading&&!error.error)&&
              <form onSubmit={handleSubmit} className="formularioIM">

            <EfectoLetrasTitulo titulo={"Inscribir maestro:"}/>

            <div className="form-group">
                <label htmlFor='Profesor' className="">Profesor: </label>
                <Select
                    defaultValue={selectedOption1}
                    onChange={setSelectedOption1}
                    options={options.option1}
                    name='Profesor'
                    />

              </div>

              <div className="form-group">
                     <label htmlFor='materia' className="">materia: </label>
               
                    <Select
                    defaultValue={selectedOption2}
                    onChange={setSelectedOption2}
                    options={options.option2}
                    name='materia'
                        />

              </div>
              <div className="centrar">
                  <button
                    color='primary'
                    type='submit'
                    className="button"
                  >
                    <span>Enviar</span>
                    <div className='liquid'></div>
                  </button>
              </div>
            </form>}


            {
                    error.error&&<div className="tamañoMensaje">
                                 <MensajeInfo mensaje={error.mensaje}/>
                            </div>
                }  


            </> );
}

export default InscribirMaestro;