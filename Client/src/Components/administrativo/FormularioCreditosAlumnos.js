import { Formik, Field, Form, ErrorMessage } from "formik";
import { useAlert } from "react-alert";
import axios from "axios";
import * as Yup from "yup";


function FormularioCreditosAlumnos() {
    const alert = useAlert();
    const formSchema = Yup.object().shape({
        NumCuenta: Yup.number().required("introduzca el numero de cuenta"),
        Creditos: Yup.number().required("introduzca los creditos"),
      });
   
   
   
   return ( <>
             <Formik
      initialValues={{
        NumCuenta: '',
        Creditos: '',
      }}

      validationSchema={formSchema}

      onSubmit={ (values,{  resetForm  }) => {
       
        console.log(values);


        axios.post(process.env.REACT_APP_ADM_EXTENSIONCREDITOS, {
            NumCuenta: values.NumCuenta,
            Creditos:values.Creditos,
            },{withCredentials:true} 
            ).then((response) => {
                  console.log(response.data);
                  alert.show("creditos modificados exitosamente");
                  resetForm();
                }).catch((error) => {
                  console.log(error.message);
                  console.log(error.response);
                  alert.show("Nose pudo modificar los creditos");
                });

      }}
    >
      <Form>

        <h2 class="card-title text-center">Créditos alumno:</h2>
        
        <div className="form-group">
              
        <label htmlFor="NumCuenta">Numero de cuenta:</label>
        <Field id="NumCuenta" name="NumCuenta" placeholder="ejemplo: 41705612"  className='form-control'/>

            <ErrorMessage
                name='NumCuenta'
                component='div'
                className='field-error text-danger'
            />
         </div>


        <div className="form-group">
              
        <label htmlFor="Creditos">Créditos: </label>
        <Field id="Creditos" name="Creditos"  placeholder="ejemplo: 41"  className='form-control'/>

              <ErrorMessage
                name='Creditos'
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

export default FormularioCreditosAlumnos;