import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import Select from 'react-select';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';

import Loading from "../Loading";
import MensajeInfo from "../MensajeInfo";
import EfectoLetrasTitulo from '../EfectoLetrasTitulo';

/*const options1 = [
  { value: 'chocolate1', label: 'Chocolate1' },
  { value: 'strawberry1', label: 'Strawberry1' },
  { value: 'vanilla1', label: 'Vanilla1' },
];
const options2 = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];*/

const optionsMateriaProfesor =(materiasProf)=>{
    const arreglo = materiasProf.map(profMat=>{
        return {value : profMat.IDpm, label : "profesor:"+profMat.nombreProfesor+" Materia: "+profMat.nombre}
    })
    return arreglo;
};

const horariolista  =(horarios)=>{
    const arreglo = horarios.map(horario=>{
        return {value : horario.IDhorario, label :" Dia:"+horario.Dia+" Horario: "+horario.Horario+" Turno:"+horario.Turno}
    })
    return arreglo;
};


function CrearGrupo() {
    const alert = useAlert();

    const [selectedOption1, setSelectedOption1] = useState(null);
    const [selectedOption2, setSelectedOption2] = useState(null);
    const [options,setOptions] = useState({option1:[],option2:[]})
    const [MateriasProfesores,setMateriasProfesores] = useState([]);
    const [horariosG,setHorariosG] = useState([]);


    const [error,setError] = useState({
      error:false,
      mensaje: ""
    });
    const [loading,setLoading] = useState(false);
    
  

    const formSchema = Yup.object().shape({
        Grupo: Yup.number().required("introduzca el grupo"),
        Cupo: Yup.number().required("introduzca el cupo"),
      });

      useEffect(() => {
        setLoading(true);
        axios.get(process.env.REACT_APP_ADM_LISTAINSCASIGNATURA)
            .then(response => {

              setLoading(false);
              setError({
                  error:false,
                  mensaje:""
              });

                const listaGrupos = response.data;
                console.log(listaGrupos);

                const [materiasProf,horario] = listaGrupos;
                console.log(materiasProf,horario);
                setOptions({option1:optionsMateriaProfesor(materiasProf),option2:horariolista(horario)});
                setMateriasProfesores(materiasProf);
                setHorariosG(horario);
            })
            .catch(e => {
                // Podemos mostrar los errores en la consola
                console.log(e);
                setError({
                  error:true,
                  mensaje:"no disponible para crear un grupo"
              });

            })
    },[]);
    
    return ( <>

          {
                 loading&&<div className="tamañoLoading">
                                <Loading/>
                            </div>
            }

{
            (!loading&&!error.error)&&

                <Formik
              initialValues={{
                Grupo: "",
                Cupo:"",
              }}
              validationSchema={formSchema}

              onSubmit={(values,{  resetForm  }) => {
                console.log(values);

                console.log(selectedOption1,selectedOption2);

                if(selectedOption1 ===null ||  selectedOption2 ===null){
                    alert.show("Falta elegir un horario o Profesor/materia");
                    return;
                }

                const horario = horariosG.find(horario => { 
                    return horario?.IDhorario === selectedOption2.value});

                const maestroMateria =MateriasProfesores.find(maProf => { 
                    return maProf?.IDpm === selectedOption1.value});


                    console.log(horario,maestroMateria);



                axios.post(process.env.REACT_APP_ADM_INSASIGNATURA, {
                    IDpm: maestroMateria.IDpm,
                    IDhorario:horario.IDhorario,
                    Grupo:values.Grupo,
                    Cupo:values.Cupo
                    },{withCredentials:true} 
                    ).then((response) => {
                          console.log(response.data);
                          alert.show("Grupo creado completado");
                          resetForm();
                        }).catch((error) => {
                          console.log(error.message);
                          console.log(error.response);
                          alert.show("Nose pudo crear el grupo");
                        });

              }
                }
                
                
                >
         
              <Form className="formularioN">
              <EfectoLetrasTitulo titulo={"Crear Grupo:"}/>

              <div className="form-group">
                  <label htmlFor='Profesor/materia' className="">Profesor/materia: </label>
                  <Select
                      defaultValue={selectedOption1}
                      onChange={setSelectedOption1}
                      options={options.option1}
                      name='Profesor/materia'
                      />

                </div>

                <div className="form-group">
                      <label htmlFor='horarios' className="">horarios: </label>
                
                      <Select
                      defaultValue={selectedOption2}
                      onChange={setSelectedOption2}
                      options={options.option2}
                      name='horarios'
                          />

                </div>
                
                <div className="form-group">
                  <label htmlFor='Grupo' className="">Grupo: </label>
                  <Field
                    className='form-control'
                    name='Grupo'
                    placeholder='Grupo'
                    type='text'
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name='Grupo'
                    component='div'
                    className='field-error text-danger'
                  />
                </div>


              
                <div className="form-group">
                  <label htmlFor='Cupo' className="">Cupo: </label>
                  <Field
                    className='form-control'
                    name='Cupo'
                    placeholder='Cupo'
                    type='text'
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name='Cupo'
                    component='div'
                    className='field-error text-danger'
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


              </Form>
        
          </Formik>
          }
          {
                    error.error&&<div className="tamañoMensaje">
                                 <MensajeInfo mensaje={error.mensaje}/>
                            </div>
                }  
            
            </> );
}

export default CrearGrupo;