import Select from 'react-select';
import profesorMateria from '../../helpers/JsonProfesorMateria';
/*const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];*/

const options =()=>{
    const arreglo = profesorMateria.map(profMat=>{
        return {value : profMat.nombreProfesor+":"+profMat.NombreMateria, label : "profesor:"+profMat.nombreProfesor+" Materia: "+profMat.NombreMateria}
    })
    return arreglo;
};

function InscribirMaestro() {
    return ( <>
    
            </> );
}

export default InscribirMaestro;