import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAlert } from "react-alert";
import axios from "axios";
import EfectoLetrasTitulo from "./EfectoLetrasTitulo";


function FormularioGDosficacion() {
    const alert = useAlert();
    const formSchema = Yup.object().shape({
        FechaDosificacion: Yup.string().required("introduzca el Fecha Dosificacion"),
        Horam: Yup.string().required("introduzca el Hora"),
        Sumiteracion: Yup.string().required("introduzca Sumiteracion"),
      });
    
    return ( <>
                <Formik
              initialValues={{
                FechaDosificacion: "",
                Horam:"",
                Sumiteracion:""
              }}
              validationSchema={formSchema}

              onSubmit={(values) => {
                console.log(values);
                axios.post(process.env.REACT_APP_ADM_GENERARDOSIFICACION, {
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
            <EfectoLetrasTitulo titulo={"Generar Dosificacion:"}/>


              <div className="form-group">
                <label htmlFor='FechaDosificacion' className="">Fecha Dosificacion: </label>
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
                <label htmlFor='Horam' className="">Hora: </label>
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
                <label htmlFor='Sumiteracion' className="">Sumiteracion: </label>
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
          
            </> );
}

export default FormularioGDosficacion;