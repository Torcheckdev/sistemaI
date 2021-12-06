import { useState } from "react";

function ComponentePruebaselect() {
   const [stateMateria,setstateMateria]= useState({value:"Seleccionar materia"});
   const  handleChangeMateria=(event)=> {
         setstateMateria({value: event.target.value});
      }
    const [stateGrupo,setstateGrupo]= useState({value:"Seleccionar grupo"});
    const  handleChangeGrupo=(event)=> {
            setstateGrupo({value: event.target.value});
         }
       
    
      const handleSubmit=(event)=> {
        alert('Your favorite flavor is: ' + stateMateria.value);
        event.preventDefault();
      }
    
    
    return ( <>
     <form onSubmit={handleSubmit}>
        <div  className="form-group">
            <label htmlFor="selectmaterias">Materias:</label>
            <select value={stateMateria.value} onChange={handleChangeMateria}
            className="form-control" id="selectmaterias" name="selectMaterias">
                 <option value="Seleccionar materia">Seleccionar materia</option>
                {inputmaterias.map(materia=>{
                return <option value={materia?.Nombre}>{materia?.Nombre}</option>;
                })}
            </select>
        </div> 
        <div className="form-row">
            <div  className="form-group col">
                <label htmlFor="selectgrupos">Grupos:</label>
                <select name="selectGrupo" className="form-control" id="selectgrupos"
                 value={stateGrupo.value} onChange={handleChangeGrupo}>
                    <option value="Seleccionar grupo">Seleccionar grupo</option>
                    {
                    inputGrupos.map(grupo=>{
                    return <option value={grupo}>{grupo}</option>;
                    })
                                    
                    }
                </select>
            </div>
            <div  className="col central">
                    <button
                        color='primary'
                        type='submit'
                        className="button inscripcion"
                    >
                        <span>Agregar</span>
                        <div className='liquid'></div>
                    </button>
             </div>

        </div> 
        {/*<input type="submit" value="Submit" />*/}
    </form>
    
            </> );
}

export default ComponentePruebaselect;