import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAlert } from "react-alert";
import axios from "axios";


import "./FormularioModificarGrupo.css";

function FormularioModificarGrupo({grupo}) {
   
    const alert = useAlert();

    const formSchema = Yup.object().shape({
        folioAsig: Yup.string().required(""),
        Grupo: Yup.number().required("introduzca el grupo"),
        Cupo: Yup.number().required("introduzca el cupo"),
        NombreProf: Yup.string().required(""),
        Nombremateria: Yup.string().required(""),
        Inscritos: Yup.string().required(""),
      });
    
    return ( <>
                <Formik
              initialValues={{
                folioAsig: grupo?.folioAsig,
                Grupo: grupo?.Grupo,
                Cupo:grupo?.Cupo,
                NombreProf:grupo?.NombreProf,
                Nombremateria:grupo?.Nombremateria,
                Inscritos:grupo?.Inscritos
              }}
              validationSchema={formSchema}

              onSubmit={(values) => {
                console.log(values);
                axios.post(process.env.REACT_APP_ADM_MODINSCASIGNATURA, {
                    folioAsig: values.folioAsig,
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
                <label htmlFor='NombreProf' className="">Profesor: </label>
                <Field
                  className='form-control'
                  name='NombreProf'
                  placeholder='Hora'
                  type='text'
                  autoComplete="off"
                  disabled
                />
                <ErrorMessage
                  name='NombreProf'
                  component='div'
                  className='field-error text-danger'
                />
              </div>

              
              <div className="form-group">
                <label htmlFor='Nombremateria' className="">Materia: </label>
                <Field
                  className='form-control'
                  name='Nombremateria'
                  placeholder='Materia'
                  type='text'
                  autoComplete="off"
                  disabled
                />
                <ErrorMessage
                  name='Nombremateria'
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
                    <span>Enviar</span>
                    <div className='liquid'></div>
                  </button>
              </div>
            </Form>

          </Formik>
 
          
            
            </> );
}

export default FormularioModificarGrupo;