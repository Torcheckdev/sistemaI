const db = require("../models");
var moment = require('moment');  

validaCupo= (req,res,next) => {
  
    var arrayMaterias=req.body
    var arraylength=arrayMaterias.length
     console.log(arraylength)
  for(var i=0; i<arraylength; i++){
    console.log(arrayMaterias[i]['folioAsig'])
  
    db.sequelize.query('select  folioAsig,Cupo,Inscritos from inscAsignatura where folioAsig="'+arrayMaterias[i]['folioAsig']+'"', { raw: true })
    .then(data => {
  console.log(data[0][0])
  

  if(data[0][0]['Cupo'] == data[0][0]['Inscritos']){
    console.log("NO hay cupo")
    res.status(403).send({
      message: "NO hay cupo para la materia : "+data[0][0]['folioAsig']
    })
    }
  
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algun error ocurrio validaCupo"
      })
  }
    )
  
}
next();

return;

}

validaHoraInscripcion= (req,res,next) => {
  var NumCuenta = req.body.NumCuenta;
  var body = req.body
  var isarray =Array.isArray(body);
{isarray == true ?NumCuenta=req.body[0].NumCuenta:null}




db.sequelize.query('select Fecha from dosificacion where NumCuenta="'+NumCuenta+'"', { raw: true })
.then(data => {
console.log(data[0][0])
console.log(data[0][0].Fecha)
var fechasistema = moment().format();
if(moment(data[0][0].Fecha).isAfter(fechasistema))
{
  res.status(403).send({
    message: "Todavia no es tu hora de inscripcion intentalo mas tarde"
  })

}
}).catch(err => {
  res.status(500).send({
    message:
      err.message || "Algun error ocurrio validaHoraInscripcion"
  })
}
)
next();
return;

}


const validacionesAlumno = {
    validaCupo: validaCupo,
    validaHoraInscripcion: validaHoraInscripcion
  }
  
module.exports = validacionesAlumno;
  