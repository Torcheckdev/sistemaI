import BtnCerrarSeccion from "./BtnCerrarSeccion";
import "./perfilAlumno.css";
import avatar from './avatar Alumno.png';

function PerfilAlumno({alumno}) {
    console.log(alumno);
    return ( <>
                <div className="profile-card-4 z-depth-3 animate__animated animate__fadeInLeft">
     <div className="card">
       <div className=" card-body text-center rounded-top colorUser">
        <div className="user-box ">
         <img src={ avatar} alt="user avatar"/>
       </div>
       <h5 className="mb-1 text-white">{alumno?.NombreA ? alumno?.NombreA:" "}</h5>
       <h6 className="text-light">Alumno</h6>
      </div>
       <div className="card-body">
         <ul className="list-group shadow-none">
         <li className="list-group-item">
           <div className="list-details">
             <span> Numero cuenta: </span>
             <span>{alumno?.NumCuenta ? alumno?.NumCuenta:" "}</span>
           </div>
         </li>
         <li className="list-group-item">
           <div className="list-details">
             <span> Correo electronico: </span>
             <span>{alumno?.email ? alumno?.email:" "}</span>
           </div>
         </li>
         <li className="list-group-item">
           <div className="list-details">
             <span> carrera: </span>
             <span>{alumno?.NombreC ? alumno?.NombreC:" "}</span>
           </div>
         </li>
         <li className="list-group-item">
           <div className="list-details">
             <span> Plan estudios: </span>
             <span>{alumno?.PlanEstudios ? alumno?.PlanEstudios:" "}</span>
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