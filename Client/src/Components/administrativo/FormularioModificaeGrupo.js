import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAlert } from "react-alert";
import Select from 'react-select';
import axios from "axios";
import "./FormularioModificarGrupo.css";
import { useEffect, useState } from "react";
import { array } from "yup/lib/locale";
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


 


 function FormularioModificarGrupo({grupo,reset,listaHorario,listaMaestroMateria}) {
    const alert = useAlert();
  console.log(grupo,reset,listaHorario,listaMaestroMateria);
    const [selectedOption1, setSelectedOption1] = useState(null);
    const [selectedOption2, setSelectedOption2] = useState(null);
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
    //setOptions({option1:optionsMateriaProfesor(listaMaestroMateria),option2:horariolista(listaHorario)});// no modificar estados afuera del useEffect porque en cada renderizado se va ejecutar esta linea de codigo
    useEffect(() => {
        const horarioActual = listaHorario.filter(horario=>{
          return horario.IDhorario === grupo.IDHorario
      }).map(horario =>{
        setSelectturno(horario.Turno);
        return  {value : horario.IDhorario, label :" Dia:"+horario.Dia+" Horario: "+horario.Horario+" Turno:"+horario.Turno}
      })[0];

      setSelectedOption2(horarioActual);
      setChecked({Lunes:false,Martes:false,Miercoles:false,Jueves:false,Viernes:false}); 
      console.log(horarioActual);
      const maestroMateriaActual =listaMaestroMateria.filter(maProf => { 
        return maProf?.IDpm === grupo?.IDpm
    }).map(profMat =>{
      return  {value : profMat.IDpm, label : "profesor:"+profMat.nombreProfesor+" Materia: "+profMat.nombre}
    })[0];
    setSelectedOption1(maestroMateriaActual);
    },[grupo]);//el useEffect se va activar cada vez que la props grupo cambie porque si no los select van a tener siempre los datos del grupo anterior
    
    const formSchema = Yup.object().shape({
        folioAsig: Yup.string().required(""),
        Grupo: Yup.number().required("introduzca el grupo"),
        Cupo: Yup.number().required("introduzca el cupo"),
        Inscritos: Yup.string().required(""),
      });

      const eliminarOpcion =()=>{
        axios.post(process.env.REACT_APP_ADM_BORRARINSCASIGNATURA, {
          folioAsig: grupo?.folioAsig,
          },{withCredentials:true} 
          ).then((response) => {
                console.log(response.data);
                alert.show("se borro exitosamente");
                reset(grupo);
              }).catch((error) => {
                console.log(error.message);
                console.log(error.response);
                alert.show("Nose puede eliminar el grupo porque tiene alumnos inscriptos");
              });

      };
    

      
     
        



    return ( <>
                <Formik
              initialValues={{
                folioAsig: grupo?.folioAsig,
                Grupo: grupo?.Grupo,
                Cupo:grupo?.Cupo,
                horarios: " Dia:"+grupo?.Dia+" Horario: "+grupo?.Horario+" Turno:"+grupo.Turno,
                Inscritos:grupo?.Inscritos,
                checked: [],
                Turno:"Selecciona un turno"
              }}
              validationSchema={formSchema}

              onSubmit={(values) => {
                {submitdiasHorarios()}

                               alert.show(JSON.stringify(diassubmit, null, 2));
                               alert.show(JSON.stringify(horariossubmit, null, 2));
                               alert.show(JSON.stringify(diassubmit.length, null, 2));
                               alert.show(JSON.stringify(horariossubmit.length, null, 2));
               // alert.show(JSON.stringify(values, null, 2));
                console.log(values);
                console.log(selectedOption1,selectedOption2);
               axios.post(process.env.REACT_APP_ADM_MODINSCASIGNATURA, {
                    folioAsig: values.folioAsig,
                    IDpm: selectedOption1.value,
                    IDhorario:grupo?.IDHorario,
                    Grupo:values.Grupo,
                    Cupo:values.Cupo,
                    Dia:diassubmit,
                    Horario:horariossubmit,           
                    Turno:selectturno
                    },{withCredentials:true} 
                    ).then((response) => {
                          console.log(response.data);
                          alert.show("Modificacion completado");
                        }).catch((error) => {
                          console.log(error.message);
                          console.log(error.response);
                          alert.show("Nose pudo modificar el grupo");
                        });

              }
                }
                
                enableReinitialize={true}
                
                >
                {/* 
                    enableReinitialize={true} esta opcion por defecto tiene false porque cada que se renderize el componente formulario los value van a
                    tener su valor y no van a cambiar pero si lo podemos el true,cada vez que se renderize los componentes su valor va cambiar por el defecto que
                    tiene en el  initialValues, pero como el initialValues iniciamos los valores de cada field por medio de las props y en cada renderizado del padre cambia las props
                    y si tenemos el false la opcion enableReinitialize, va a permancecer el primer valor de las props pero si podemos true, cada que se renderize va cambiar los values porque los props cambia en cada renderizado               
                
                */}
           {/* validationShema nos sirve para mandar las validadcion de cda input ojo debe ser los nombre igual a los de initialvalues*/}
            {/*el onsubmit nos sirve para el evento de submit, para mandar los datos al back-end */}
            

            <Form className="formularioM">

            <div className="form-group">
                <label htmlFor='folioAsig' className="">Folio del grupo: </label>
                <Field
                  className='form-control'
                  name='folioAsig'
                  placeholder='Folio'
                  type='text'
                  disabled
                />{/*la etiqueta field  sirve como input y es componente de la libreria 
                        la opcion "disabled" es para que no pueda el usuario modificar el input
                    */}
                <ErrorMessage
                  name='folioAsig'
                  component='div'
                  className='field-error text-danger'
                />{/*Error es un componente para que imprima el mensaje de error que mandamos en yup, tiene para poder el name que es input que le sale el error,el tipo de componente como div,span etc, y apra poderle la clase y darle estilos*/}
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
                  <label htmlFor='Profesor/materia' className="">Profesor/materia: </label>
                  <Select
                      defaultValue={selectedOption1}
                      onChange={setSelectedOption1}
                      options={optionsMateriaProfesor(listaMaestroMateria)}
                      name='Profesor/materia'
                      placeholder={selectedOption1?.label}
                      />

                </div>

                <div className="form-group">
                      <label htmlFor='horarios' className="">Horarios: </label>
                
                      <Field
                  className='form-control'
                  name='horarios'
                  placeholder='horarios'
                  type='text'
                  autoComplete="off"
                  disabled
                  component="textarea"
                  rows="3"
                />
                <ErrorMessage
                  name='horario'
                  component='div'
                  className='field-error text-danger'
                />

                </div>
                <div> 
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

              <div className="form-group">
                <label htmlFor='Inscritos' className="">Inscritos: </label>
                <Field
                  className='form-control'
                  name='Inscritos'
                  placeholder='Inscritos'
                  type='text'
                  autoComplete="off"
                  disabled
                />
                <ErrorMessage
                  name='Inscritos'
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
                    <span>Modificar</span>
                    <div className='liquid'></div>
                  </button>
              </div>
            </Form>

          </Formik>
              <button
                 className="button btnEliminar centrar"
                  onClick={()=>{
                    eliminarOpcion();
                  }}
                  >
                      <span>Borrar grupo</span>
                      <div className='liquid'></div>
                  </button>                 
 

            
            </> );
}

export default FormularioModificarGrupo;