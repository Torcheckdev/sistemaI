import ImagenLogin from "../Components/ImagenLogin";
import Formulario from "../Components/LoginFormik";
import "./login.css";

function Login() {
    return ( <>
                <div className="d-flex align-items-center min-vh-100 py-3 py-md-0">
                    <div className="container container-modificacion animate__animated animate__backInDown animate__delay-1s">
                        <div className="card login-card">
                            <div className="row no-gutters">
                                <ImagenLogin/>
                                <Formulario/>
                            </div>   
                        </div>
                    </div>
                </div>
            </> );
}

export default Login;