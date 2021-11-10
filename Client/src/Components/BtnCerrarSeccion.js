import useUser from "../hooks/useUser";

function BtnCerrarSeccion() {
    const {cerrarSeccion} = useUser();

    const accionBoton= ()=>{
        cerrarSeccion();
    }
    
    return ( 
        <>
        <button onClick={accionBoton}>Cerrar Sesion </button>
        </>
     );
}

export default BtnCerrarSeccion;