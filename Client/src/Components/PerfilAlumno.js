import BtnCerrarSeccion from "./BtnCerrarSeccion";
import "./perfilAlumno.css";

function PerfilAlumno() {
    return ( <>
                <div className="profile-card-4 z-depth-3 animate__animated animate__fadeInLeft">
     <div className="card">
       <div className=" card-body text-center rounded-top colorUser">
        <div className="user-box ">
         <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="user avatar"/>
       </div>
       <h5 className="mb-1 text-white">Usuario Prueba</h5>
       <h6 className="text-light">Alumno</h6>
      </div>
       <div className="card-body">
         <ul className="list-group shadow-none">
         <li className="list-group-item">
           <div className="list-details">
             <span> Numero cuenta: </span>
             <span>9910XXXXXX</span>
           </div>
         </li>
         <li className="list-group-item">
           <div className="list-details">
             <span> Email Address: </span>
             <span>info@example.com</span>
           </div>
         </li>
         <li className="list-group-item">
           <div className="list-details">
             <span> carrera: </span>
             <span>Informatica</span>
           </div>
         </li>
         </ul>
        </div>
        <BtnCerrarSeccion/>
    </div>
</div>
    </> );
}

export default PerfilAlumno;