import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAlert } from "react-alert";
import axios from "axios";

function FormularioElegirPeriodo() {

    const alert = useAlert();
    const formSchema = Yup.object().shape({
        Periodo: Yup.string().required("introduzca el periodo"),
      });
   
   
   
   return ( <>
             <Formik
      initialValues={{
        Periodo: '',
      }}

      validationSchema={formSchema}

      onSubmit={ (values,{  resetForm  }) => {

       console.log(values);

       axios.post(process.env.REACT_APP_ADM_PERIODOENCURSO, {
        Periodo: values.Periodo,
        
        },{withCredentials:true} 
        ).then((response) => {
              console.log(response.data);
              alert.show("Periodo elegido exitosamente");
              resetForm();
            }).catch((error) => {
              console.log(error.message);
              console.log(error.response);
              alert.show("Nose pudo elegir el periodo");
            });

      }}
    >
      <Form>

        <h2 class="card-title text-center">Elegir el periodo:</h2>
        
        <div className="form-group">
              
        <label htmlFor="Periodo">periodo:</label>
        <Field id="Periodo" name="Periodo" placeholder="Periodo"  className='form-control'/>

            <ErrorMessage
                name='Periodo'
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

export default FormularioElegirPeriodo;