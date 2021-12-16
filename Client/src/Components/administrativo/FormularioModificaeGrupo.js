import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAlert } from "react-alert";
import Select from 'react-select';
import axios from "axios";


import "./FormularioModificarGrupo.css";
import { useEffect, useState } from "react";

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

function FormularioModificarGrupo({grupo,reset,listaHorario,listaMaestroMateria}) {
   
    const alert = useAlert();
  console.log(grupo,reset,listaHorario,listaMaestroMateria);
    const [selectedOption1, setSelectedOption1] = useState(null);
    const [selectedOption2, setSelectedOption2] = useState(null);
    //setOptions({option1:optionsMateriaProfesor(listaMaestroMateria),option2:horariolista(listaHorario)});// no modificar estados afuera del useEffect porque en cada renderizado se va ejecutar esta linea de codigo
   
    useEffect(() => {
        const horarioActual = listaHorario.filter(horario=>{
          return horario.IDhorario === grupo.IDHorario
      }).map(horario =>{
        return  {value : horario.IDhorario, label :" Dia:"+horario.Dia+" Horario: "+horario.Horario+" Turno:"+horario.Turno}
      })[0];
      setSelectedOption2(horarioActual);
      console.log(horarioActual);
      const maestroMateriaActual =listaMaestroMateria.filter(maProf => { 
        return maProf?.IDpm === grupo?.IDpm
    }).map(profMat =>{
      return  {value : profMat.IDpm, label : "profesor:"+profMat.nombreProfesor+" Materia: "+profMat.nombre}
    })[0];
    setSelectedOption1(maestroMateriaActual);
    },[grupo]);//el useEffect se va activar cada vez que la props grupo cambie porque si no los select van a tener siempre los datos del grupo anterior
    
    const formSchema = Yup.object().shape({
        folioAsig: Yup.string().required(""),
        Grupo: Yup.number().required("introduzca el grupo"),
        Cupo: Yup.number().required("introduzca el cupo"),
        Inscritos: Yup.string().required(""),
      });

      const eliminarOpcion =()=>{
        axios.post(process.env.REACT_APP_ADM_BORRARINSCASIGNATURA, {
          folioAsig: grupo?.folioAsig,
          },{withCredentials:true} 
          ).then((response) => {
                console.log(response.data);
                alert.show("se borro exitosamente");
                reset(grupo);
              }).catch((error) => {
                console.log(error.message);
                console.log(error.response);
                alert.show("Nose puede eliminar el grupo porque tiene alumnos inscriptos");
              });

      };
    
    return ( <>
                <Formik
              initialValues={{
                folioAsig: grupo?.folioAsig,
                Grupo: grupo?.Grupo,
                Cupo:grupo?.Cupo,
                Inscritos:grupo?.Inscritos
              }}
              validationSchema={formSchema}

              onSubmit={(values) => {
                console.log(values);
                console.log(selectedOption1,selectedOption2);

               axios.post(process.env.REACT_APP_ADM_MODINSCASIGNATURA, {
                    folioAsig: values.folioAsig,
                    IDpm: selectedOption1.value,
                    IDhorario:selectedOption2.value,
                    Grupo:values.Grupo,
                    Cupo:values.Cupo
                    },{withCredentials:true} 
                    ).then((response) => {
                          console.log(response.data);
                          alert.show("Modificacion completado");
                        }).catch((error) => {
                          console.log(error.message);
                          console.log(error.response);
                          alert.show("Nose pudo modificar el grupo");
                        });

              }
                }
                
                enableReinitialize={true}
                
                >
                {/* 
                    enableReinitialize={true} esta opcion por defecto tiene false porque cada que se renderize el componente formulario los value van a
                    tener su valor y no van a cambiar pero si lo podemos el true,cada vez que se renderize los componentes su valor va cambiar por el defecto que
                    tiene en el  initialValues, pero como el initialValues iniciamos los valores de cada field por medio de las props y en cada renderizado del padre cambia las props
                    y si tenemos el false la opcion enableReinitialize, va a permancecer el primer valor de las props pero si podemos true, cada que se renderize va cambiar los values porque los props cambia en cada renderizado               
                
                */}
           {/* validationShema nos sirve para mandar las validadcion de cda input ojo debe ser los nombre igual a los de initialvalues*/}
            {/*el onsubmit nos sirve para el evento de submit, para mandar los datos al back-end */}
            

            <Form className="formularioM">

            <div className="form-group">
                <label htmlFor='folioAsig' className="">Folio del grupo: </label>
                <Field
                  className='form-control'
                  name='folioAsig'
                  placeholder='Folio'
                  type='text'
                  disabled
                />{/*la etiqueta field  sirve como input y es componente de la libreria 
                        la opcion "disabled" es para que no pueda el usuario modificar el input
                    */}
                <ErrorMessage
                  name='folioAsig'
                  component='div'
                  className='field-error text-danger'
                />{/*Error es un componente para que imprima el mensaje de error que mandamos en yup, tiene para poder el name que es input que le sale el error,el tipo de componente como div,span etc, y apra poderle la clase y darle estilos*/}
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
                  <label htmlFor='Profesor/materia' className="">Profesor/materia: </label>
                  <Select
                      defaultValue={selectedOption1}
                      onChange={setSelectedOption1}
                      options={optionsMateriaProfesor(listaMaestroMateria)}
                      name='Profesor/materia'
                      placeholder={selectedOption1?.label}
                      />

                </div>

                <div className="form-group">
                      <label htmlFor='horarios' className="">horarios: </label>
                
                      <Select
                      defaultValue={selectedOption2}
                      onChange={setSelectedOption2}
                      options={horariolista(listaHorario)}
                      name='horarios'
                      placeholder={selectedOption2?.label}
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

              <div className="form-group">
                <label htmlFor='Inscritos' className="">Inscritos: </label>
                <Field
                  className='form-control'
                  name='Inscritos'
                  placeholder='Inscritos'
                  type='text'
                  autoComplete="off"
                  disabled
                />
                <ErrorMessage
                  name='Inscritos'
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
                    <span>Modificar</span>
                    <div className='liquid'></div>
                  </button>
              </div>
            </Form>

          </Formik>
              <button
                 className="button btnEliminar centrar"
                  onClick={()=>{
                    eliminarOpcion();
                  }}
                  >
                      <span>Borrar grupo</span>
                      <div className='liquid'></div>
                  </button>                 
 

            
            </> );
}

export default FormularioModificarGrupo;