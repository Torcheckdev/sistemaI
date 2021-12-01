import fondo from './fondoUnam.jpg';


function ImagenLogin() {
    return (  
      <div className="col-md-6">
            <img src={ fondo}alt="login" className="login-card-img"/>
      </div>
    );
}
export default ImagenLogin;