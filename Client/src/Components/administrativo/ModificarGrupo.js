import React, { useState } from 'react';
import Select from 'react-select';//componente de react para el select contiene: el buscador,animaciones, muchas funciones utiles
import profesorMateria from '../../helpers/JsonProfesorMateria';
/*const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];*/

const options =()=>{
    const arreglo = profesorMateria.map(profMat=>{
        return {value : profMat.nombreProfesor+":"+profMat.nombreMateria, label : "profesor:"+profMat.nombreProfesor+" Materia: "+profMat.nombreMateria}
    })
    return arreglo;
};

function ModificarGrupo() {
    const [selectedOption, setSelectedOption] = useState(null);//declaramos el estado para guardar la opcion que escoje en el select

    console.log(profesorMateria);

    const opciones = options();//obtenemos las opciones para los options de los select

    const handleChangeSelect = (selectedOptionF) => {//Esta funcion sirve para obtener el evento cuando el usuario seleciona el la opcion de selet y obtener un value
        console.log(selectedOptionF);
        setSelectedOption(selectedOptionF.value);//lo agregamos al estado 
        console.log(selectedOption);
    
    }
    return ( <>
                    {/*
                    select es el componente a renderizar, defaulValue sirve para pasarle estado que va mostrar el value en el select
                    onChange recive la funcion que va realizar el evento cuando seleccionemos una opcion del select
                    options es un arreglo de los options o los items del select tienes que manda {value: "valor", label: "nombre del item"}
                    defaultValue recive el item que queremos que muestre cuando se renderize
                        */}
                    <Select
                        defaultValue={selectedOption}
                        onChange={handleChangeSelect}
                        options={opciones}
                        defaultValue={opciones[0]}
                    /> 
            </> );
}

export default ModificarGrupo;