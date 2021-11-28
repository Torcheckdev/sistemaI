import { Formik, Field, Form} from "formik";
import "./inscrpcion.css";

function Inscripcion() {
    
    const funcionOnBlur = (e)=>{//function Inscripcion para manejar el select de materias
        console.log(e.currentTarget.value);//es para obtener la informacion del select cuando sufre un cambio como elegir otra opcion
            //e.currentTarget.value obtiene el select que fue selecionado
            //aqui tengo que realizar la programacion pra llenar un estado para que lo renderize en el select de grupos
      }
    
    
    
    return ( <>
            <div className="contenedorInscripcion animate__animated animate__fadeInUp">
            <div className="deconstructed titulo">
                 Inscripción
                <div>Inscripción</div>
                <div>Inscripción</div>
                <div>Inscripción</div>
                <div>Inscripción</div>
            </div>
                <div className="card mb-4 tablaOverflowe">
                <div className="card-body">
                    <table className="table table-hover table-bordered table-sm ">
                        <thead className="mdb-color darken-3 colorEncabezado">
                            <tr className="text-tabla">
                                <th>#</th>
                                <th>Materia</th>
                                <th>grupo</th>
                                <th>boton</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Matematicas 1</td>
                                <td>1102</td>
                                
                                <td>
                                    <button
                                     className="button btnEliminar"
                                     >
                                        <span>quitar</span>
                                        <div className='liquid'></div>
                                     </button>    
                                </td>
                            
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Matematicas 1</td>
                                <td>1102</td>
                                <td>
                                    <button
                                     className="button btnEliminar"
                                     >
                                        <span>quitar</span>
                                        <div className='liquid'></div>
                                     </button>    
                                </td>
                            
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Matematicas 1</td>
                                <td>1102</td>
                                   <td>
                                    <button
                                     className="button btnEliminar"
                                     >
                                        <span>quitar</span>
                                        <div className='liquid'></div>
                                     </button>    
                                </td>
                            
                            </tr>
                            <tr>
                                <th scope="row">4</th>
                                <td>Matematicas 1</td>
                                <td>1102</td>
                                   <td>
                                    <button
                                     className="button btnEliminar"
                                     >
                                        <span>quitar</span>
                                        <div className='liquid'></div>
                                     </button>    
                                </td>
                            
                            </tr>
                            <tr>
                                <th scope="row">5</th>
                                <td>Matematicas 1</td>
                                <td>1102</td>
                                   <td>
                                    <button
                                     className="button btnEliminar"
                                     >
                                        <span>quitar</span>
                                        <div className='liquid'></div>
                                     </button>    
                                </td>
                            
                            </tr>
                            <tr>
                                <th scope="row">6</th>
                                <td>Matematicas 1</td>
                                <td>1102</td>
                                   <td>
                                    <button
                                     className="button btnEliminar"
                                     >
                                        <span>quitar</span>
                                        <div className='liquid'></div>
                                     </button>    
                                </td>
                            
                            </tr>
                            <tr>
                                <th scope="row">7</th>
                                <td>Matematicas 1</td>
                                <td>1102</td>
                                   <td>
                                    <button
                                     className="button btnEliminar"
                                     >
                                        <span>quitar</span>
                                        <div className='liquid'></div>
                                     </button>    
                                </td>
                            
                            </tr>
                            <tr>
                                <th scope="row">8</th>
                                <td>Matematicas 1</td>
                                <td>1102</td>
                                   <td>
                                    <button
                                     className="button btnEliminar"
                                     >
                                        <span>quitar</span>
                                        <div className='liquid'></div>
                                     </button>    
                                </td>
                            
                            </tr>
                            <tr>
                                <th scope="row">9</th>
                                <td>Matematicas 1</td>
                                <td>1102</td>
                                   <td>
                                    <button
                                     className="button btnEliminar"
                                     >
                                        <span>quitar</span>
                                        <div className='liquid'></div>
                                     </button>    
                                </td>
                            
                            </tr>
                            <tr>
                                <th scope="row">10</th>
                                <td>Matematicas 1</td>
                                <td>1102</td>
                                   <td>
                                    <button
                                     className="button btnEliminar"
                                     >
                                        <span>quitar</span>
                                        <div className='liquid'></div>
                                     </button>    
                                </td>
                            
                            </tr>
                        </tbody>
                      
                    </table>
                    
                </div>
            </div>
 

            <Formik
              initialValues={{
                selectMaterias: "",
                selectGrupo: "",
              }}
              onSubmit={(values) => {
                  console.log(values);
                }}
            >

                <Form >
                    <div  className="form-group">
                    <label htmlFor="selectmaterias">Materias:</label>
                        <Field as="select" name="selectMaterias"  onBlur={funcionOnBlur}  className="form-control" id="selectmaterias">
                            <option value="red">Red</option>
                            <option value="green">Green</option>
                            <option value="blue">Blue</option>
                        </Field>

                    </div>

                    <div className="form-row">
                        <div  className="form-group col">
                        <label htmlFor="selectgrupos">Grupos:</label>
                            <Field as="select" name="selectGrupo" className="form-control" id="selectgrupos">
                            
                            </Field>
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
                </Form>
            </Formik>
            <div className="central">
                <button
                        className="button inscripcion"
                        >
                            <span>Inscribirme</span>
                            <div className='liquid'></div>
                </button>    
            </div>
        </div>
            </> );
}

export default Inscripcion;