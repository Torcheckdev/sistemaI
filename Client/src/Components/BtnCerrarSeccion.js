import useUser from "../hooks/useUser";
import "./btnCerrarSeccion.css";
function BtnCerrarSeccion() {
    const {cerrarSeccion} = useUser();

    const accionBoton= ()=>{
        cerrarSeccion();
    }
    
    return ( 
        <>
         <div className="central btnC">
                <button
                        onClick={accionBoton}
                        className="button"
                        >
                            <span>Cerrar Sesion</span>
                            <div className='liquid'></div>
                </button>    
            </div>
        </>
     );
}

export default BtnCerrarSeccion;