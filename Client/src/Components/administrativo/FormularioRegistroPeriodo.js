import { Formik, Field, Form, ErrorMessage } from "formik";
import { useAlert } from "react-alert";
import axios from "axios";
import * as Yup from "yup";
import moment from 'moment';



function FormularioPeriodo() {
   
  const alert = useAlert();
    const formSchema = Yup.object().shape({
        periodo: Yup.string().required("introduzca el periodo"),
        fechaInicio: Yup.string().required("fehca inicio requerido"),
        fechatermino: Yup.string().required("fecha finalizado requerido"),
      });
   
   
   
   return ( <>
             <Formik
      initialValues={{
        periodo: '',
        fechaInicio: '',
        fechatermino: '',
      }}

      validationSchema={formSchema}

      onSubmit={ (values,{  resetForm  }) => {
       
        console.log(values);
        const fechaInicio =  moment(values.fechaInicio).format("L");
        const fechatermino =  moment(values.fechatermino).format("L");

        console.log(fechaInicio,fechatermino,values.periodo);

        axios.post(process.env.REACT_APP_ADM_REGISTROPERIODO, {
          Periodo: values.periodo,
          Fechainicio:fechaInicio,
          Fechatermino:fechatermino,
          },{withCredentials:true} 
          ).then((response) => {
                console.log(response.data);
                alert.show("periodo creado exitosamente");
                resetForm();
              }).catch((error) => {
                console.log(error.message);
                console.log(error.response);
                alert.show("Nose registro el periodo");
              });
      }}
    >
      <Form>

        <h2 class="card-title text-center">Regristro de perido:</h2>
        
        <div className="form-group">
              
        <label htmlFor="periodo">periodo:</label>
        <Field id="periodo" name="periodo" placeholder="periodo"  className='form-control'/>

            <ErrorMessage
                name='periodo'
                component='div'
                className='field-error text-danger'
            />
         </div>


        <div className="form-group">
              
        <label htmlFor="fechaInicio">fecha Inicio:</label>
        <Field id="fechaInicio" name="fechaInicio" type="date"  className='form-control'/>

              <ErrorMessage
                name='fechaInicio'
                component='div'
                className='field-error text-danger'
              />
        </div>

        <div className="form-group">
           
            <label htmlFor="fechatermino">fecha termino:</label>
            <Field  id="fechatermino" name="fechatermino"  type="date"  className='form-control'/> 
             
             <ErrorMessage
                  name='fechatermino'
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

export default FormularioPeriodo;