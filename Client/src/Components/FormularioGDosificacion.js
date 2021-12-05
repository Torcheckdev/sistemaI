import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import BtnCerrarSeccion from "./BtnCerrarSeccion";
import { useAlert } from "react-alert";
import axios from "axios";


function FormularioGDosficacion() {
    const alert = useAlert();
    const formSchema = Yup.object().shape({
        periodo: Yup.string().required("introduzca el periodo"),
        FechaDosificacion: Yup.string().required("introduzca el Fecha Dosificacion"),
        Horam: Yup.string().required("introduzca el Hora"),
        Sumiteracion: Yup.string().required("introduzca Sumiteracion"),
      });
    
    return ( <>
                <Formik
              initialValues={{
                periodo: "",
                FechaDosificacion: "",
                Horam:"",
                Sumiteracion:""
              }}
              validationSchema={formSchema}

              onSubmit={(values) => {
                console.log(values);
                axios.post(process.env.REACT_APP_ADM_GENERARDOSIFICACION, {
                    Periodo: values.periodo,
                    FechaDosificacion:values.FechaDosificacion,
                    Horam:values.Horam,
                    Sumiteracion:values.Sumiteracion
                    },{withCredentials:true} 
                    ).then((response) => {
                          console.log(response.data);
                          alert.show("Dosificacion creado exitosamente");
                        }).catch((error) => {
                          console.log(error.message);
                          console.log(error.response);
                          alert.show("Nose registro la dosificacion");
                        });

              }
                }
  

                
            >
           {/* validationShema nos sirve para mandar las validadcion de cda input ojo debe ser los nombre igual a los de initialvalues*/}
            {/*el onsubmit nos sirve para el evento de submit, para mandar los datos al back-end */}
            

            <Form>

            <div className="form-group">
                <label htmlFor='periodo' className="sr-only">periodo: </label>
                <Field
                  className='form-control'
                  name='periodo'
                  placeholder='periodo'
                  type='text'
                />{/*la etiqueta field  sirve como input y es componente de la libreria */}
                <ErrorMessage
                  name='periodo'
                  component='div'
                  className='field-error text-danger'
                />{/*Error es un componente para que imprima el mensaje de error que mandamos en yup, tiene para poder el name que es input que le sale el error,el tipo de componente como div,span etc, y apra poderle la clase y darle estilos*/}
              </div>

              <div className="form-group">
                <label htmlFor='FechaDosificacion' className="sr-only">Fecha Dosificacion: </label>
                <Field
                  className='form-control'
                  name='FechaDosificacion'
                  placeholder='FechaDosificacion'
                  type='text'
                  autoComplete="off"
                />
                <ErrorMessage
                  name='FechaDosificacion'
                  component='div'
                  className='field-error text-danger'
                />
              </div>
              <div className="form-group">
                <label htmlFor='Horam' className="sr-only">Hora: </label>
                <Field
                  className='form-control'
                  name='Horam'
                  placeholder='Hora'
                  type='text'
                  autoComplete="off"
                />
                <ErrorMessage
                  name='Horam'
                  component='div'
                  className='field-error text-danger'
                />
              </div>
              <div className="form-group">
                <label htmlFor='Sumiteracion' className="sr-only">Sumiteracion: </label>
                <Field
                  className='form-control'
                  name='Sumiteracion'
                  placeholder='Sumiteracion'
                  type='text'
                  autoComplete="off"
                />
                <ErrorMessage
                  name='Sumiteracion'
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
 
          <BtnCerrarSeccion/>
            
            </> );
}

export default FormularioGDosficacion;