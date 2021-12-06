import React, {useRef,useState} from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import ReCAPTCHA from "react-google-recaptcha"; 
import useUser from '../hooks/useUser';
import axios from 'axios';
import Loading from "./Loading";


export default function Formulario() {

  const {iniciarSeccion}=useUser();

  const captcha = useRef(null);//useRef crea una variable adentro de react que podemos modificar y que no es afectada por los render del componente y mantiene su valor 
  
  const [verificacionCaptcha,setVerificacionCaptcha] = useState(true);
  const [errorLogin,setErrorLogin] = useState({
    error:false,
    mensaje: ""
  });
  const [loading,setLoading] = useState(false);
  



  const onChange = ()=>{  /*para que funcione el recaptcha*/
    console.log(captcha.current.getValue(),verificacionCaptcha)  
    if(captcha.current.getValue()){
      setVerificacionCaptcha(true);
    }
  }

  const formSchema = Yup.object().shape({
    Email: Yup.string().email().required("introduzca el email"),
    Password: Yup.string().required("introduzca el usuario"),
  });

  return (
    <>

<div className="col-md-6">

          <div className="card-body">

              <div className="brand-wrapper">
              
              </div>
              <p className="login-card-description titulo">Ingresar</p>
                {/*LA ETIQUETA FORMIK le pasamos los initialvalues que son los input a usar */}
            <Formik
              initialValues={{
                Email: "",
                Password: "",
              }}
              validationSchema={formSchema}

              onSubmit={(values) => {
                if(captcha.current.getValue()){
                  console.log(values.Email,values.Password);
                  setVerificacionCaptcha(true);

                  //iniciarSeccion({name:'bran',id:1234,rol:2});
                  const headers = {
                    'Accept' : '*/*',
                    'withCredentials': 'true'};
                    console.log(process.env.REACT_APP_HOST_SIGNIN);
                    setLoading(true);
                  axios.post(process.env.REACT_APP_HOST_SIGNIN, {
                    Email: values.Email,
                    Pword:values.Password,
                    },{withCredentials:true} 
                    ).then((response) => {
                          console.log(response.data);
                          console.log(response.data.accessToken)
                          setLoading(false);
                          setErrorLogin({
                            error:false,
                            mensaje: ""
                          });
                          iniciarSeccion(response.data);
                        }).catch((error) => {
                          console.log(error.message);
                          console.log(error.response);
                          console.log(error.response.data.message);
                          setLoading(false);
                          setErrorLogin({
                            error:true,
                            mensaje: error.response.data.message
                          });
                        });

                  /*  if(true){//simulamos un error de catch en la peticion de login
                      setErrorLogin(true);
                    }*/

                  
                }else{
                  setVerificacionCaptcha(false);
                }
              }
                }
  

                
            >
           {/* validationShema nos sirve para mandar las validadcion de cda input ojo debe ser los nombre igual a los de initialvalues*/}
            {/*el onsubmit nos sirve para el evento de submit, para mandar los datos al back-end */}
            

            <Form>

            <div className="form-group">
                <label htmlFor='Email' className="sr-only">ID Usuario: </label>
                <Field
                  className='form-control'
                  name='Email'
                  placeholder='Email'
                  type='text'
                />{/*la etiqueta field  sirve como input y es componente de la libreria */}
                <ErrorMessage
                  name='Email'
                  component='div'
                  className='field-error text-danger'
                />{/*Error es un componente para que imprima el mensaje de error que mandamos en yup, tiene para poder el name que es input que le sale el error,el tipo de componente como div,span etc, y apra poderle la clase y darle estilos*/}
              </div>

              <div className="form-group">
                <label htmlFor='Password' className="sr-only">Contraseña: </label>
                <Field
                  className='form-control'
                  name='Password'
                  placeholder='contraseña'
                  type='password'
                  autoComplete="off"
                />
                <ErrorMessage
                  name='Password'
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

              <div className="recaptchawe">
                <ReCAPTCHA
                ref={captcha}
                sitekey="6LfQSJwcAAAAAOr34C4XM7LO3H4oORErkePThXuX"
                onChange={onChange}/>
              </div>
              <div className="form-group">
                {verificacionCaptcha === false && <div className="alert alert-danger centrar contenedorError" role="alert">Porfavor completar el RECAPTCHA</div>}

                {errorLogin.error&&<div className="alert alert-danger centrar contenedorError">{errorLogin.mensaje}</div>}                  
              </div>   
          </div>
      </div>
                {
                  loading&&<Loading/>
                }
    </>
  );
}