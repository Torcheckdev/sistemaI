import React, {useRef,useState} from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import ReCAPTCHA from "react-google-recaptcha"; 
import useUser from '../hooks/useUser';


export default function Formulario() {

  const {iniciarSeccion}=useUser();

  const captcha = useRef(null);//useRef crea una variable adentro de react que podemos modificar y que no es afectada por los render del componente y mantiene su valor 
  
  const [verificacionCaptcha,setVerificacionCaptcha] = useState(true);
  const [errorLogin,setErrorLogin] = useState(false);

  const onChange = ()=>{  /*para que funcione el recaptcha*/
    console.log(captcha.current.getValue(),verificacionCaptcha)  
    if(captcha.current.getValue()){
      setVerificacionCaptcha(true);
    }
  }




  const formSchema = Yup.object().shape({
    UserName: Yup.string()
      .min(5, `Mínimo 5 caracteres`)
      .max(25, `Máximo 25 caracteres`)
      .required("Campo Requerido"),
    Password: Yup.string()
      .required("Campo Requerido")
      .min(5, `Mínimo 5 caracteres`),
  });

  return (
    <>
    {/*LA ETIQUETA FORMIK le pasamos los initialvalues que son los input a usar */}
      <Formik
        initialValues={{
          UserName: "",
          Password: "",
        }}
        validationSchema={formSchema}

        onSubmit={(values) => {
          if(captcha.current.getValue()){
            console.log(values)
            setVerificacionCaptcha(true);

            iniciarSeccion({name:'bran',id:1234,rol:2});

              if(true){//simulamos un error de catch en la peticion de login
                setErrorLogin(true);
              }

            
          }else{
            setVerificacionCaptcha(false);
          }
        }
          }

          
          
      >
          {/* validationShema nos sirve para mandar las validadcion de cda input ojo debe ser los nombre igual a los de initialvalues*/}
        {/*el onsubmit nos sirve para el evento de submit, para mandar los datos al back-end */}
        <Form>
          <div>
            <label htmlFor='UserName'>ID Usuario: </label>
            <Field
              className='form-control'
              name='UserName'
              placeholder='TU ID'
              type='text'
            />{/*la etiqueta field  sirve como input y es componente de la libreria */}
            <ErrorMessage
              name='UserName'
              component='div'
              className='field-error text-danger'
            />{/*Error es un componente para que imprima el mensaje de error que mandamos en yup, tiene para poder el name que es input que le sale el error,el tipo de componente como div,span etc, y apra poderle la clase y darle estilos*/}
          </div>
          <div>
            <label htmlFor='Password'>Contraseña: </label>
            <Field
              className='form-control'
              name='Password'
              placeholder='TU CONTRASEÑA'
              type='password'
              autoComplete="off"
            />
            <ErrorMessage
              name='Password'
              component='div'
              className='field-error text-danger'
            />
          </div>
          
              <button
                color='primary'
                className='mr-1 mb-1 btn-block'
                type='submit'
              >
                Enviar
              </button>
        </Form>
      </Formik>
          <div>
            <ReCAPTCHA
            ref={captcha}
            sitekey="6LfQSJwcAAAAAOr34C4XM7LO3H4oORErkePThXuX"
            onChange={onChange}/>
            {verificacionCaptcha === false && <div>Porfavor completar el reCAPTCHA</div>}
            </div>

            {errorLogin&&<div>Error de contaseñao usuario</div>}
    </>
  );
}