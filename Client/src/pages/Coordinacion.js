import SaturacionAdministracion from "../Components/administrativo/SaturacionAdministrativo";
import BtnCerrarSeccion from "../Components/BtnCerrarSeccion";


function Coordinacion() {
    return ( <>
        <br />
        <div className="container colorContenedor animate__animated animate__backInDown containerAdministracion">
            <SaturacionAdministracion/>
            <BtnCerrarSeccion/>
        </div>
        
    
    
    </>
     );
}

export default Coordinacion;