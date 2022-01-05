import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import Select from 'react-select';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import Loading from "../Loading";
import MensajeInfo from "../MensajeInfo";
import EfectoLetrasTitulo from '../EfectoLetrasTitulo';
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Selectm from '@mui/material/Select';


/*const options1 = [
  { value: 'chocolate1', label: 'Chocolate1' },
  { value: 'strawberry1', label: 'Strawberry1' },
  { value: 'vanilla1', label: 'Vanilla1' },
];
const options2 = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];*/

const optionsMateriaProfesor =(materiasProf)=>{
    const arreglo = materiasProf.map(profMat=>{
        return {value : profMat.IDpm, label : "profesor:"+profMat.nombreProfesor+" Materia: "+profMat.nombre}
    })
    return arreglo;
};

const horariolista  =(horarios)=>{
    const arreglo = horarios.map(horario=>{
        return {value : horario.IDhorario, label :" Dia:"+horario.Dia+" Horario: "+horario.Horario+" Turno:"+horario.Turno}
    })
    return arreglo;
};


function CrearGrupo() {
    const alert = useAlert();

    const [selectedOption1, setSelectedOption1] = useState(null);
    const [selectedOption2, setSelectedOption2] = useState(null);
    const [options,setOptions] = useState({option1:[],option2:[]})
    const [MateriasProfesores,setMateriasProfesores] = useState([]);
    const [horariosG,setHorariosG] = useState([]);
    const [error,setError] = useState({
      error:false,
      mensaje: ""
    });
    const [loading,setLoading] = useState(false);
    

    const [open, setOpen] = useState(false);
    const[selectturno,setSelectturno]= useState("");
    const handleChangeturno = (event) => {
      setSelectturno(event.target.value);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleOpen = () => {
      setOpen(true);
    };

const [checked, setChecked] =useState({
      Lunes:false,
      Martes:false,
      Miercoles:false,
      Jueves:false, 
      Viernes:false,
    });
  
    const[horario,setHorario] = useState({
      Lunes: "", 
      Martes:"",
      Miercoles:"",
      Jueves:"", 
      Viernes:""
    });
    const [hli, setHli] =useState(new Date());       const [hmii, setHmii] =useState(new Date());
    const [hlt, setHlt] =useState(new Date());       const [hmit, setHmit] =useState(new Date());
    const [hmi, setHmi] =useState(new Date());       const [hji, setHji] =useState(new Date());
    const [hmt, setHmt] =useState(new Date());       const [hjt, setHjt] =useState(new Date());
    const [hvi, setHvi] =useState(new Date());       
    const [hvt, setHvt] =useState(new Date());       
    var l = "",m="",mi="",j="",v="";
    
    var diassubmit="";
    var horariossubmit="";

    const handleChange = (e) => {
      setChecked({
        ...checked,
        [e.target.id] :  e.target.checked
    });
    
    };
  
    function setdiasHorarios ()   {
      l = hli.getHours().toString() + ":" + hli.getMinutes().toString()+"-"+hlt.getHours().toString()+":"+hlt.getMinutes().toString();
      m = hmi.getHours().toString() + ":" + hmi.getMinutes().toString()+"-"+hmt.getHours().toString()+":"+hmt.getMinutes().toString();
      mi=hmii.getHours().toString() + ":" + hmii.getMinutes().toString()+"-"+hmit.getHours().toString()+":"+hmit.getMinutes().toString();
      j=hji.getHours().toString() + ":" + hji.getMinutes().toString()+"-"+hjt.getHours().toString()+":"+hjt.getMinutes().toString();
      v= hvi.getHours().toString() + ":" + hvi.getMinutes().toString()+"-"+hvt.getHours().toString()+":"+hvt.getMinutes().toString();

      setHorario({...horario,Lunes:l,Martes:m,Miercoles:mi,Jueves:j,Viernes:v })

}

useEffect(() => {
  setdiasHorarios(); 
}, [hli,hlt,hmi,hmt,hmii,hmit,hji,hjt,hvi,hvt,checked]);



function submitdiasHorarios(){
    let dias = [];
    let horario1=[]
for(var val2 in checked) {
 if(checked[val2] == true){
  dias.push(val2);  
 }

}
for(var val1 in horario) {
for(var dia in dias ){
if (val1 == dias[dia]){
  horario1.push(horario[val1]);
}
}
}
diassubmit=dias.toString();
horariossubmit=horario1.toString();

}

   

  

    const formSchema = Yup.object().shape({
        Grupo: Yup.number().required("introduzca el grupo"),
        Cupo: Yup.number().required("introduzca el cupo"),
      });

      useEffect(() => {
        setLoading(true);
        axios.get(process.env.REACT_APP_ADM_LISTAINSCASIGNATURA)
            .then(response => {

              setLoading(false);
              setError({
                  error:false,
                  mensaje:""
              });

                const listaGrupos = response.data;
                console.log(listaGrupos);

                const [materiasProf,horario] = listaGrupos;
                console.log(materiasProf,horario);
                setOptions({option1:optionsMateriaProfesor(materiasProf),option2:horariolista(horario)});
                setMateriasProfesores(materiasProf);
                setHorariosG(horario);
            })
            .catch(e => {
                // Podemos mostrar los errores en la consola
                console.log(e);
                setError({
                  error:true,
                  mensaje:"no disponible para crear un grupo"
              });

            })
    },[]);
    
    return ( <>

          {
                 loading&&<div className="tamañoLoading">
                                <Loading/>
                            </div>
            }

{
            (!loading&&!error.error)&&

                <Formik
              initialValues={{
                Grupo: "",
                Cupo:"",
              }}
              validationSchema={formSchema}

              onSubmit={(values,{  resetForm  }) => {
                {submitdiasHorarios()}
                console.log(values);

                console.log(selectedOption1/*,selectedOption2*/);

                if(selectedOption1 ===null ||  checked.Lunes == false && checked.Martes == false && checked.Miercoles == false && checked.Jueves == false && checked.Viernes == false ){
                    alert.show("Falta elegir un horario o Profesor/materia");
                    return;
                }

              /*  const horario = horariosG.find(horario => { 
                    return horario?.IDhorario === selectedOption2.value});

*/                const maestroMateria =MateriasProfesores.find(maProf => { 
                    return maProf?.IDpm === selectedOption1.value});


                    console.log(horario,maestroMateria);



                axios.post(process.env.REACT_APP_ADM_INSASIGNATURA, {
                    IDpm: maestroMateria.IDpm,
                    Grupo:values.Grupo,
                    Cupo:values.Cupo,
                    Dia:diassubmit,
                    Horario:horariossubmit,
                    Turno:selectturno
                    },{withCredentials:true} 
                    ).then((response) => {
                          console.log(response.data);
                          alert.show("Grupo creado completado");
                          resetForm();
                          setChecked({Lunes:false,Martes:false,Miercoles:false,Jueves:false,Viernes:false}); 
                          setSelectturno(""); 

                        }).catch((error) => {
                          console.log(error.message);
                          console.log(error.response);
                          alert.show("Nose pudo crear el grupo");
                        });

              }
                }
                
                
                >
         
              <Form className="formularioN">
              <EfectoLetrasTitulo titulo={"Crear Grupo:"}/>

              <div className="form-group">
                  <label htmlFor='Profesor/materia' className="">Profesor/materia: </label>
                  <Select
                      defaultValue={selectedOption1}
                      onChange={setSelectedOption1}
                      options={options.option1}
                      name='Profesor/materia'
                      />

                </div>

             {/*   <div className="form-group">
                      <label htmlFor='horarios' className="">Horarios: </label>
                
                      <Select
                      defaultValue={selectedOption2}
                      onChange={setSelectedOption2}
                      options={options.option2}
                      name='horarios'
                          />

              </div>*/}
                
                <div className="form-group">
                      <label htmlFor='horarios' className="">Horarios: </label>

                <List >
                <LocalizationProvider dateAdapter={AdapterDateFns}>

        <ListItem style= {{justifyContent:`space-evenly`}} alignItems="center" >
         <div style={{width:`5rem`}}>  
        <Typography id="" variant="subtitle1" style={{ marginRight: "3px" }}>
            Lunes
          </Typography>
          <Checkbox
            checked={checked.Lunes}
            onChange={handleChange}
            inputProps={{ "aria-label": "primary checkbox" }}
            id="Lunes"
            color="primary"
          />
          </div> 
         {checked?.Lunes
        ? <TimePicker
        ampm={true}
        openTo="hours"
        views={['hours','minutes']}
        inputFormat="HH:mm"
        mask="__:__"
        label="Inicio"
        value={hli}
        id="Lunes"
        onChange={(newValue) => {
          setHli(newValue);
        }}
        renderInput={(params) => <TextField  required  {...params} />}
      />
        : null }



{checked?.Lunes
        ?<TimePicker

          ampm={true}
          openTo="hours"
          views={['hours', 'minutes']}
          inputFormat="HH:mm"
          mask="__:__"
          label="Termino"
          value={hlt}
          id="Lunes"

          onChange={(newValue) => {
            setHlt(newValue);
          }}
          renderInput={(params) => <TextField required {...params} />}
        />:null}
        </ListItem>

        <ListItem style= {{justifyContent:`space-evenly`}} alignItems="center">
        <div style={{width:`5rem`}}>  

         <Typography variant="subtitle1" style={{ marginRight: "3px" }}>
             Martes
           </Typography>
           <Checkbox
             checked={checked.Martes}
             onChange={handleChange}
             inputProps={{ "aria-label": "primary checkbox" }}
             id="Martes"
             color="primary"

           />
                 </div>  

{checked?.Martes
        ? <TimePicker
        ampm={true}
        openTo="hours"
        views={['hours','minutes']}
        inputFormat="HH:mm"
        mask="__:__"
        label="Inicio"
        value={hmi}
        id="Martes"
        onChange={(newValue) => {
          setHmi(newValue);
        }}
        renderInput={(params) => <TextField  required  {...params} />}
      />
        : null }



{checked?.Martes
        ?<TimePicker

          ampm={true}
          openTo="hours"
          views={['hours', 'minutes']}
          inputFormat="HH:mm"
          mask="__:__"
          label="Termino"
          value={hmt}
          id="Martes"

          onChange={(newValue) => {
            setHmt(newValue);
          }}
          renderInput={(params) => <TextField required {...params} />}
        />:null}
         </ListItem>

         <ListItem style= {{justifyContent:`space-evenly`}} alignItems="center">
         <div style={{width:`5rem`}}>  

         <Typography variant="subtitle1" style={{ marginRight: "3px" }}>
             Miercoles
           </Typography>
           <Checkbox
             checked={checked.Miercoles}
             onChange={handleChange}
             inputProps={{ "aria-label": "primary checkbox" }}
             id="Miercoles"
             color="primary"

           />
                 </div>  

{checked?.Miercoles
        ? <TimePicker
        ampm={true}
        openTo="hours"
        views={['hours','minutes']}
        inputFormat="HH:mm"
        mask="__:__"
        label="Inicio"
        value={hmii}
        id="Miercoles"
        onChange={(newValue) => {
          setHmii(newValue);
        }}
        renderInput={(params) => <TextField  required  {...params} />}
      />
        : null }



{checked?.Miercoles
        ?<TimePicker

          ampm={true}
          openTo="hours"
          views={['hours', 'minutes']}
          inputFormat="HH:mm"
          mask="__:__"
          label="Termino"
          value={hmit}
          id="Miercoles"

          onChange={(newValue) => {
            setHmit(newValue);
          }}
          renderInput={(params) => <TextField required {...params} />}
        />:null}
         </ListItem>

         <ListItem style= {{justifyContent:`space-evenly`}} alignItems="center" >
         <div style={{width:`5rem`}}>  

         <Typography id="" variant="subtitle1" style={{ marginRight: "3px" }}>
             Jueves
           </Typography>
           <Checkbox
             checked={checked.Jueves}
             onChange={handleChange}
             inputProps={{ "aria-label": "primary checkbox" }}
             id="Jueves"
             color="primary"

           />
                    </div>  

          {checked?.Jueves
         ? <TimePicker
         ampm={true}
         openTo="hours"
         views={['hours','minutes']}
         inputFormat="HH:mm"
         mask="__:__"
         label="Inicio"
         value={hji}
         id="Jueves"
         onChange={(newValue) => {
           setHji(newValue);
         }}
         renderInput={(params) => <TextField  required  {...params} />}
       />
         : null }
 
 
 
 {checked?.Jueves
         ?<TimePicker
 
           ampm={true}
           openTo="hours"
           views={['hours', 'minutes']}
           inputFormat="HH:mm"
           mask="__:__"
           label="Termino"
           value={hjt}
           id="Jueves"
 
           onChange={(newValue) => {
             setHjt(newValue);
           }}
           renderInput={(params) => <TextField required {...params} />}
         />:null}
         </ListItem>
         <ListItem style= {{justifyContent:`space-evenly`}} alignItems="center" >
         <div style={{width:`5rem`}}>  

         <Typography id="" variant="subtitle1" style={{ marginRight: "3px" }}>
             Viernes
           </Typography>
           <Checkbox
             checked={checked.Viernes}
             onChange={handleChange}
             inputProps={{ "aria-label": "primary checkbox" }}
             id="Viernes"
             color="primary"

           />
                    </div>  

          {checked?.Viernes
         ? <TimePicker
         ampm={true}
         openTo="hours"
         views={['hours','minutes']}
         inputFormat="HH:mm"
         mask="__:__"
         label="Inicio"
         value={hvi}
         id="Viernes"
         onChange={(newValue) => {
           setHvi(newValue);
         }}
         renderInput={(params) => <TextField  required  {...params} />}
       />
         : null }
 
 
 
 {checked?.Viernes
         ?<TimePicker
 
           ampm={true}
           openTo="hours"
           views={['hours', 'minutes']}
           inputFormat="HH:mm"
           mask="__:__"
           label="Termino"
           value={hvt}
           id="Viernes"
 
           onChange={(newValue) => {
             setHvt(newValue);
           }}
           renderInput={(params) => <TextField required {...params} />}
         />:null}
         </ListItem>
 
        
         </LocalizationProvider>
      </List>
      </div>

      <div className="form-group" style={{display:`grid`}}>

<label htmlFor='Cupo' className="">Turno: </label>


   <FormControl  sx={{ minWidth: '100%' }}>
     <InputLabel id="Turno">Selecciona un turno</InputLabel>
     <Selectm
       labelId="Turno"
       id="Turno"
       open={open}
       onClose={handleClose}
       onOpen={handleOpen}
       value={selectturno}
       label="Turno"
       onChange={handleChangeturno}
       sx={{ height:40 }} 
       required
     >

       <MenuItem
value="" sx={{ height:40,display:'block !important' }}  >
         <em>Selecciona un turno</em>
       </MenuItem>
       <MenuItem  value={"Matutino"} sx={{ height:40,display:'block !important' }}   >Matutino</MenuItem>
       <MenuItem  value={"Vespertino"}  sx={{ height:40,display:'block !important' }} >Vespertino</MenuItem>
     </Selectm>
   </FormControl>
   </div>



                <div className="form-group">
                  <label htmlFor='Grupo' className="">Grupo: </label>
                  <Field
                    className='form-control'
                    name='Grupo'
                    placeholder='Grupo'
                    type='text'
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name='Grupo'
                    component='div'
                    className='field-error text-danger'
                  />
                </div>


              
                <div className="form-group">
                  <label htmlFor='Cupo' className="">Cupo: </label>
                  <Field
                    className='form-control'
                    name='Cupo'
                    placeholder='Cupo'
                    type='text'
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name='Cupo'
                    component='div'
                    className='field-error text-danger'
                  />
                </div>

                <div className="centrar">
                    <button
                      color='primary'
                      type='submit'
                      className="button"
                    >
                      <span>Enviar</span>
                      <div className='liquid'></div>
                    </button>
                </div>


              </Form>
        
          </Formik>
          }
          {
                    error.error&&<div className="tamañoMensaje">
                                 <MensajeInfo mensaje={error.mensaje}/>
                            </div>
                }  
            
            </> );
}

export default CrearGrupo;