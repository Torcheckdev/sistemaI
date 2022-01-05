import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAlert } from "react-alert";
import axios from "axios";
import PeriodoActivo from '../../context/PeriodoActivo';
import {useState,useContext} from "react"; 
import  "./FormularioEPchecheckbox.css";

function FormularioElegirPeriodo() {

  const {periodoActivo,setPeriodoActivo}=useContext(PeriodoActivo);
  const [auxperiodo,setAuxperiodo]=useState({})
  const procesoHandler = (e) => {
    if (e.target.id =="check1") { 
    setAuxperiodo({Periodo:periodoActivo.Periodo,Inscripcion:"true",Aybajas:"false" })
  }else if (e.target.id=="check2"){

    setAuxperiodo({Periodo:periodoActivo.Periodo,Inscripcion:"false",Aybajas:"true" })}
  
};

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
        Inscripcion:auxperiodo.Inscripcion,
        Aybajas:auxperiodo.Aybajas
        
        },{withCredentials:true} 
        ).then((response) => {
              console.log(response.data);
              alert.show("Periodo elegido exitosamente");
              setPeriodoActivo({Periodo:values.Periodo, Inscripcion:auxperiodo.Inscripcion,Aybajas:auxperiodo.Aybajas});
              resetForm();
            }).catch((error) => {
              console.log(error.message);
              console.log(error.response);
              alert.show("Nose pudo elegir el periodo");
            });

      }}
    >
      <Form>

        <h2 class="card-title text-center">Selecciona  el período y el proceso :</h2>
        
        <div className="form-group">
              
        <label htmlFor="Periodo">Período:</label>
        <Field id="Periodo" name="Periodo" placeholder="Periodo"  className='form-control'/>

            <ErrorMessage
                name='Periodo'
                component='div'
                className='field-error text-danger'
            />
         </div>
          <div style={{display:`flex`,justifyContent:`space-around`}}> 
          <label class="container1"  onClick={(e) => procesoHandler(e)} >Inscripción
  <input type="radio"   checked= {periodoActivo.Inscripcion == "true" ? "checked" :null} name="radio" />
  <span class="checkmark"  id="check1"  ></span>
</label>


<label class="container1"   onClick={(e) => procesoHandler(e)}  >Altas y Bajas
  <input type="radio" name="radio" checked= {periodoActivo.Aybajas == "true" ? "checked" :null} />
  <span class="checkmark" id= "check2"></span>

</label>
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