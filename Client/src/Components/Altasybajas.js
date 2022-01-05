import "./inscrpcion.css";
import { useAlert } from "react-alert";
import Loading from "./Loading";
import MensajeInfo from "./MensajeInfo";
import { useEffect, useState } from "react";
import axios from "axios";
import ConsultaAltasybajas from "./ConsultaAltasybajas";
import BotonPdf from "./BotonPdf";
import "./PDFInscrpcion.css";

//import arregloFalsoMaterias from "../helpers/JsonMaterias" ;//descomentar para hacer pruebas sin la peticion post al servidor



function Inscripcion({NumCuenta,Periodo,planEstudios}) {

    var datos=[];
                                





    
        const [stateMateria,setstateMateria]= useState({value:"Seleccionar materia"});//este estado sirve para darle al select un valor para el formulario en el onChange
       
        const  handleChangeMateria=(event)=> {
              setstateMateria({value: event.target.value});
              console.log(!(event.target.value==="Seleccionar materia"));
              console.log(event.target.value);
              if(!(event.target.value==="Seleccionar materia")){
                  console.log("adentro del if de materias");
                  //SetInputGrupos(flitrarPorGrupo(event.target.value,arregloFalsoMaterias));//con el faldo arreglo
                  SetInputGrupos(flitrarPorGrupo(event.target.value,materias));
                }
                setstateGrupo({value:"Seleccionar grupo"});
           }

         const [stateGrupo,setstateGrupo]= useState({value:"Seleccionar grupo"});

         const  handleChangeGrupo=(event)=> {
                 setstateGrupo({value: event.target.value});
              }
            
function llenaTablaMateriasInscritas(){
   
    console.log(materiasInscritas);
    console.log(materias);


   

    for( var i in materiasInscritas){

            var  materia = materiaInscribir(materias,materiasInscritas[i].Nombre,materiasInscritas[i].Grupo);
    

            if(materiasInscrbir.length>0){//verificar el traslape de horarios
                
                const horas = horarioEnSegundos(materia.Horario);
                console.log("segundos del horario:"+materia.Horario+"= "+horas.hora1+"-"+horas.hora2);

                materiasInscrbir.forEach(materiaObj =>{

                    if(materiaObj.Dia===materia.Dia){//si el horario nuevo a introducir a la lista de materias inscribir es su dia igual al dia de una materia que tiene lista de materia entonces entra al if
                        const horarioMateriaSegundos = horarioEnSegundos(materiaObj.Horario);
                        if(horarioMateriaSegundos.hora1 > horas.hora1&&horarioMateriaSegundos.hora1<horas.hora2){//comenzamos a comparar los horarios de cada uno de las materias
                            alert.show(materia.Nombre+" "+"("+materia.Horario+")"+" se traslapa con: "+materiaObj.Nombre+" "+"("+materiaObj.Horario+").");
                        }else if(horarioMateriaSegundos.hora2 > horas.hora1&&horarioMateriaSegundos.hora2<horas.hora2){
                            alert.show(materia.Nombre+" "+"("+materia.Horario+")"+" se traslapa con: "+materiaObj.Nombre+" "+"("+materiaObj.Horario+").");
                        }
                    }
                });

            }
           

     
var otroarray =inputmaterias ;

    for(var j in otroarray){
    if(otroarray[j].Nombre == materiasInscritas[i].Nombre){
        otroarray.splice(j, 1); 
      j--;
    }
    }
    
    }
    console.log("aqui mero")
console.log(otroarray)
setinputmaterias(otroarray);

/*setinputmaterias([...inputmaterias,inputmaterias.filter(inputMateria=>{
    console.log(inputMateria.Nombre)
    console.log(materiasInscritas[i].Nombre)

                    return console.log(inputMateria.Nombre != materiasInscritas[i].Nombre)
                })  ]   );

            }*/
           

            setMateriasInscrbir(materiasInscritas);
            console.log(materiasInscrbir)
          /*  console.log(newinput)
            console.log(otherinput)*/
      //setinputmaterias(prevState => [...inputmaterias , inputmaterias.filter(inputMateria=>  inputMateria.Nombre == materiasInscritas)]);
            setstateGrupo({value:"Seleccionar grupo"});
    
        if(materiasInscrbir.length>0){//verifico si la lista de materias a inscribir tiene alguna materia para hacer el calculo del promedio
            const creditos = materiasInscrbir.reduce(function(acumulador, siguienteValor){
                return {
                 Creditos: acumulador.Creditos + siguienteValor.Creditos
                };
              }, {Creditos: 0});

              console.log(creditos);
              if( creditos.Creditos > 58){
                alert.show("No tienes que pasarte de los 58 creditos");
              }
        }
        console.log(inputmaterias)
    
}



         //Aqui puedo mandarle IDmateria y Grupo
           const handleSubmit=(event)=> {
            event.preventDefault();
  
            
             console.log('Your favorite flavor is: ' + stateMateria.value);
             if(stateMateria.value!="Seleccionar materia" && stateGrupo.value!="Seleccionar grupo" ){
                
                //con el arreglo falso prueba
                 //const materia = materiaInscribir(arregloFalsoMaterias,stateMateria.value,stateGrupo.value);//obtenemos la materia que eligio en los select los value trae el valor de cada select
                                                //el arreglo false de materia representa el estado que contiene el arreglo de las materias traidas del post
                                                //const materia guarda el valor de la asignatura que eligio en los select pero con todos sus atributos.

                           var materia=[];                     
                //con el arreglo original 
               materia = materiaInscribir(materias,stateMateria.value,stateGrupo.value);

        

                /*________________________________________________*/
                if(materiasInscrbir.length>0){//verificar el traslape de horarios
                    
                    const horas = horarioEnSegundos(materia.Horario);
                    console.log("segundos del horario:"+materia.Horario+"= "+horas.hora1+"-"+horas.hora2);

                    materiasInscrbir.forEach(materiaObj =>{

                        if(materiaObj.Dia===materia.Dia){//si el horario nuevo a introducir a la lista de materias inscribir es su dia igual al dia de una materia que tiene lista de materia entonces entra al if
                            const horarioMateriaSegundos = horarioEnSegundos(materiaObj.Horario);
                            if(horarioMateriaSegundos.hora1 > horas.hora1&&horarioMateriaSegundos.hora1<horas.hora2){//comenzamos a comparar los horarios de cada uno de las materias
                                alert.show(materia.Nombre+" "+"("+materia.Horario+")"+" se traslapa con: "+materiaObj.Nombre+" "+"("+materiaObj.Horario+").");
                            }else if(horarioMateriaSegundos.hora2 > horas.hora1&&horarioMateriaSegundos.hora2<horas.hora2){
                                alert.show(materia.Nombre+" "+"("+materia.Horario+")"+" se traslapa con: "+materiaObj.Nombre+" "+"("+materiaObj.Horario+").");
                            }
                        }
                    });

                }
                setMateriasInscrbir([...materiasInscrbir,materia]);
                setinputmaterias(inputmaterias.filter(inputMateria=>{
                    return !(inputMateria.Nombre === stateMateria.value); 
                }));
                setstateGrupo({value:"Seleccionar grupo"});
            }
            if(materiasInscrbir.length>0){//verifico si la lista de materias a inscribir tiene alguna materia para hacer el calculo del promedio
                const creditos = materiasInscrbir.reduce(function(acumulador, siguienteValor){
                    return {
                     Creditos: acumulador.Creditos + siguienteValor.Creditos
                    };
                  }, {Creditos: 0});

                  console.log(creditos);
                  if( creditos.Creditos > 58){
                    alert.show("No tienes que pasarte de los 58 creditos");
                  }
            }
            
           }

           const btnInscribirse =()=>{
               var bajas = "";
               var arregloIncripcionMaterias=[];

            if(materiasInscrbir.length===0){
                alert.show("No tiene materias que inscribir");
                return;
            }
            if(materiasInscrbir.length>0){
                const creditos = materiasInscrbir.reduce(function(acumulador, siguienteValor){
                    return {
                     Creditos: acumulador.Creditos + siguienteValor.Creditos
                    };
                  }, {Creditos: 0});

                  console.log(creditos);
                  /*if( creditos.Creditos > 50){
                    alert.show("No puedes inscribirte porque sobre pasas los 50 creditos");
                    return;
                  }*/

                  
                
                  }
                  console.log(arregloIncripcionMaterias);
                  if(existeinscripcion === true){
                
                    var bajas  = materiasInscritas.filter(ar => !materiasInscrbir.find(rm => (rm.folioAsig === ar.folioAsig ) ))

                    arregloIncripcionMaterias[0]= materiasInscrbir.map((materia)=>{
                        return {NumCuenta:NumCuenta.toString() ,folioAsig:materia.folioAsig.toString(),Periodo:Periodo,Calificacion:"0",TipoExamen:"ORD",IDmateria:materia.IDmateria.toString(),Movimiento:"Alta"}
                  });

                   arregloIncripcionMaterias[1]= bajas.map((materia)=>{
                    return {NumCuenta:NumCuenta.toString() ,folioAsig:materia.folioAsig.toString(),Periodo:Periodo,Calificacion:"0",TipoExamen:"ORD",IDmateria:materia.IDmateria.toString(),Movimiento:"Baja"}
              });;
                }
                else {
                    arregloIncripcionMaterias[0]= materiasInscrbir.map((materia)=>{
                        return {NumCuenta:NumCuenta.toString() ,folioAsig:materia.folioAsig.toString(),Periodo:Periodo,Calificacion:"0",TipoExamen:"ORD",IDmateria:materia.IDmateria.toString(),Movimiento:"Alta"}
                  });
                }
                axios.post(process.env.REACT_APP_ALUMNO_INSCRIBIRMATERIAAB, arregloIncripcionMaterias,{withCredentials:true} 
                    ).then((response) => {
  
                        console.log(response.data);
                        setConsultaInscrpcion(true); 
            
                    }).catch((error) => {
                        console.log(error.message);
                        console.log(error.response);
                        setLoading(false);
                        if(error.response.status===403){
                           /* setError({
                                error:true,
                                mensaje:error.response.data.message
                            });*/
                            alert.show(error.response.data.message);
                            return;
                        }
                      });
            }
        

    const alert = useAlert();
    const [materias,setMaterias] = useState([]);//para guardar las materias de la peticion y tener el arreglo completo en este estado
    const [inputmaterias,setinputmaterias] = useState([]);//es el estado para la lista de materias para el input select de materias
    const [inputGrupos,SetInputGrupos] = useState([]);//es el estado para la lista de grupo para el input select de grupos
    const [materiasInscrbir,setMateriasInscrbir] = useState([]);//arreglo para guardar las materias a inscribirse
    const [consultaInscrpcion,setConsultaInscrpcion] = useState(false);
    const[union,setUnion]=useState(0);
    const[existeinscripcion,setExisteinscripcion]=useState(true);
    const [existeAltasybajas,setExisteAltasybajas]=useState(true);
    const [error,setError] = useState({
        error:false,
        mensaje: ""
      });
      const [loading,setLoading] = useState(false);
      
      const[materiasInscritas,setMateriasInscritas]= useState([]);

   /*  funcion de formik 
   const funcionOnBlur = (e)=>{//function Inscripcion para manejar el select de materias
        console.log(e.currentTarget.value);//es para obtener la informacion del select cuando sufre un cambio como elegir otra opcion
            //e.currentTarget.value obtiene el select que fue selecionado
            //aqui tengo que realizar la programacion pra llenar un estado para que lo renderize en el select de grupos
            SetInputGrupos(flitrarPorGrupo(e.currentTarget.value,arregloFalsoMaterias));
      }*/
  var llamaaltasybajas  = 0;


  async function existeunComprobanteAB(){
    axios.post(process.env.REACT_APP_ALUMNO_CONSULTAALTASYBAJAS, {
        NumCuenta: NumCuenta,
        Periodo:Periodo
        },{withCredentials:true} 
        ).then(json=>
            {
                llamaaltasybajas= 1;
                setConsultaInscrpcion(true); 
            }
              
            ).catch((error)=> {
              console.log(error);
            });
}

useEffect(() => {
    (async () => {
        await existeunComprobanteAB();

    })();
    },[])





      useEffect(() => {
          if (llamaaltasybajas === 1){ return }
        axios.post(process.env.REACT_APP_ALUMNO_CONSULTAINSCRIPCION, {
            PlanEstudios: planEstudios,
          NumCuenta: NumCuenta,
          Periodo:Periodo
          },{withCredentials:true} 
          ).then((response) => {
              setLoading(false);
              setError({
                  error:false,
                  mensaje:""  }); 
             
  datos = response.data 
  console.log(response.data)
  console.log(datos[1])
  setMateriasInscritas(datos[1]); 


            }).catch((error) => {
                console.log(error.message);
                console.log(error.response);
                setLoading(false);
                if(error.response.status === 404){
setExisteinscripcion(false);
console.log("Existe inscripcion"+existeinscripcion)
setUnion(prevUnion => prevUnion + 1)
return;
                }
                if(error.response.status===500){
                    setError({
                        error:true,
                        mensaje:"Inscripcion no disponible por el momento"
                    });
                    return;
                }
                if(error.response.status===403){
                   
                    if(error.response.data.message==="Ya Existe una inscripcion en este periodo para ese numero de cuenta"){
                       /* setError({//mandar un booleado que la inscripcion ya existe y renderize la inscrpicion y boton de imprimir pdf
                            error:true,
                            mensaje:error.response.data.message
                        });*/
                        setConsultaInscrpcion(true);
                        return; 
                    }
    
                    setError({
                        error:true,
                        mensaje:error.response.data.message
                    });
                    return;
                }
              })
              setUnion(prevUnion => prevUnion + 1)

      }, []);

      useEffect(() => {
        if (llamaaltasybajas === 1){ return }

        if ( union!=3 || existeinscripcion===false) {
         console.log(existeinscripcion)
 
           return;
        }else {
        llenaTablaMateriasInscritas()}   ;
     }, [union]);
 
     useEffect(() => {
        if (llamaaltasybajas === 1){ return }

        if (union > 2){
            return
        }
      setLoading(true);
    axios.post(process.env.REACT_APP_ALUMNO_MATERIAS, {
        PlanEstudios: planEstudios,
      NumCuenta: NumCuenta,
      Periodo:Periodo
      },{withCredentials:true} 
      ).then((response) => {
          setLoading(false);
          setError({
              error:false,
              mensaje:""
          });

         console.log(response.data)
        console.log(" valor de union  : "+union)
        console.log(existeinscripcion)
        if(union === 1 ){ setMaterias(response.data) 
          setUnion(prevUnion => prevUnion + 1)
          console.log("me ejecute 1 ")
          
      }


         if(union ===2 && existeinscripcion=== true){
             console.log("iteracion : "+ union)
             console.log(materiasInscritas)
         const [...destruct]=materiasInscritas;
         console.log(...destruct)

          for (var i in destruct){
          setMaterias(prevState => [...prevState, destruct[i]]);

          }
          console.log(materias);

          setUnion(prevUnion => prevUnion + 1)
      } else if(union === 2 && existeinscripcion === false){    
          setMaterias(response.data) 
          setUnion(prevUnion => prevUnion + 1)

       }





          //aqui comienza llenar el input de materias con el arreglo global
          setinputmaterias(arregloSinDuplicado(response.data));

      }).catch((error) => {
          console.log(error.message);
          console.log(error.response);
          setLoading(false);
          if(error.response.status===500){
              setError({
                  error:true,
                  mensaje:"Inscripcion no disponible por el momento"
              });
              return;
          }
          if(error.response.status===403){
             
              if(error.response.data.message==="Ya Existe una inscripcion en este periodo para ese numero de cuenta"){
                 /* setError({//mandar un booleado que la inscripcion ya existe y renderize la inscrpicion y boton de imprimir pdf
                      error:true,
                      mensaje:error.response.data.message
                  });*/
                  setConsultaInscrpcion(true);
                  return; 
              }

              setError({
                  error:true,
                  mensaje:error.response.data.message
              });
              return;
          }
        })    

      },[union]);
      
    


     



        const arregloSinDuplicado = (arregloConRepetidos)=>{ 
        
            let sinRepetidos = arregloConRepetidos.filter((valorActual, indiceActual, arreglo) => {
                //Podríamos omitir el return y hacerlo en una línea, pero se vería menos legible
                return arreglo.findIndex(valorDelArreglo => valorDelArreglo.Nombre === valorActual.Nombre) === indiceActual;
            });
            return sinRepetidos;
        }

        const flitrarPorGrupo=(dato,arreglo)=>{
            let MateriasFiltradas =arreglo.filter(materia => materia.Nombre=== dato);   
            let grupo = MateriasFiltradas.map((materia)=> materia.Grupo);
            let unico = grupo.filter(function(item, pos, self) {
                return self.indexOf(item) == pos;
            })
            return unico;   
        }; 

        

        
        const materiaInscribir=(arreglo,materiaN,grupo)=>{
            console.log(arreglo);
                const materia = arreglo.filter(arregloMateria =>{
                  return  arregloMateria.Nombre === materiaN && arregloMateria.Grupo === grupo;
                });
                console.log(materia);
                return materia[0];
        }

        const horarioEnSegundos=(horario)=>{//convierte el horario "8:30-10:00"  las dos horas en segundos para poder comparar horas
            const arregloHoras = horario.split('-');
            const hora1Segundos =obtenerSegundo(arregloHoras[0]);
            const hora2Segundos =obtenerSegundo(arregloHoras[1]);
            return {hora1:hora1Segundos,hora2:hora2Segundos};
        }

        const obtenerSegundo =(horarios)=>{//debe mandar el formato "8:30" para que funcione
            const horas = horarios.split(':');
            const hora = Number(horas[0])*60*60;
            const minutos =Number(horas[1])*60;
            return hora+minutos;
        }
    //console log con el arreglo falso
    /*console.log(flitrarPorGrupo("MATEMATICAS I MATEMATICAS BASICAS",arregloFalsoMaterias));
        console.log(arregloFalsoMaterias);
        console.log(arregloSinDuplicado(arregloFalsoMaterias));*/
    return ( <>
                        {
                            loading&&<div className="tamañoLoading">
                                            <Loading/>
                                        </div>
                        }

           {  (!consultaInscrpcion&&!loading&&!error.error)&&<div className="contenedorInscripcion animate__animated animate__fadeInUp">
            <div className="deconstructed titulo">
                 Altas y bajas
                <div>Altas y bajas</div>
                <div>Altas y bajas</div>
                <div>Altas y bajas</div>
                <div>Altas y bajas</div>
            </div>
                <div className="card mb-4 tablaOverflowe">
                <div className="card-body">
                    <table className="table table-hover table-bordered table-sm ">
                        <thead className="mdb-color darken-3 colorEncabezado">
                            <tr className="text-tabla">
                                <th>#</th>
                                <th>Materia</th>
                                <th>grupo</th>
                                <th>creditos</th>
                                <th>boton</th>
                            </tr>
                        </thead>
                        <tbody>


                            {
                                materiasInscrbir.map(materia=>{
                                        return <tr key={materia?.IDmateria}>
                                                    <th scope="row">{materia?.IDmateria}</th>
                                                    <td>{materia?.Nombre}</td>
                                                    <td>{materia?.Grupo}</td>
                                                    <td>{materia?.Creditos}</td>
                                                    
                                                    <td>
                                                        <button
                                                        className="button btnEliminar"
                                                        onClick={()=>{
                                                            setinputmaterias([...inputmaterias,materia]);
                                                            setMateriasInscrbir(materiasInscrbir.filter(materiaInscrbir=>{
                                                                return !(materiaInscrbir.Nombre === materia.Nombre); 
                                                            }));
                                                            setstateGrupo({value:"Seleccionar grupo"});
                                                        }}
                                                        >
                                                            <span>quitar</span>
                                                            <div className='liquid'></div>
                                                        </button>    
                                                    </td>
                                    
                                                </tr>
                                })
                            }
                        </tbody>
                      
                    </table>
                    
                </div>
            </div>
 

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
            <div className="central">
                <button
                        className="button inscripcion"
                        onClick={btnInscribirse}
                        >
                            <span>Inscribirme</span>
                            <div className='liquid'></div>
                </button>    
            </div>
        </div>}

        {
            consultaInscrpcion&&<ConsultaAltasybajas Periodo={Periodo} NumCuenta={NumCuenta}/>
        }

        {
                    error.error&&<div className="tamañoMensaje">
                                 <MensajeInfo mensaje={error.mensaje}/>
                            </div>
         } 
            </> );
}

export default Inscripcion;