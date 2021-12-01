import "./dosificacion.css";

function Dosificacion() {
    return ( <>
               <div className="ContenedorD animate__animated animate__fadeInUp">

                    <div className="deconstructed titulo">
                        Dosificación
                        <div>Dosificación</div>
                        <div>Dosificación</div>
                        <div>Dosificación</div>
                        <div>Dosificación</div>
                    </div>

                    <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <span >Numero Cuenta:  </span>
                            <span >41257841</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <span >Nombre:  </span>
                            <span > Avila Flores Brandon</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <span >Turno:  </span>
                            <span >Matutino</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <span >carrera:  </span>
                            <span >Informatica</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <span >fecha:  </span>
                            <span >12-12-21</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <span >hora:  </span>
                            <span >09:40</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <span >lugar:  </span>
                            <span >6</span>
                        </li>
                    </ul>
               </div>
    
            </> );
}

export default Dosificacion;