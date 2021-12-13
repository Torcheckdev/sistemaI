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

async function validaHoraInscripcion (req,res,next)  {
  var NumCuenta = req.body.NumCuenta;
  var body = req.body
  var isarray =Array.isArray(body);
{isarray == true ?NumCuenta=req.body[0].NumCuenta:null}
var Periodo=  await periodoencurso();




db.sequelize.query('select Fecha from dosificacion where NumCuenta="'+NumCuenta+'" && Periodo="'+Periodo+'"', { raw: true })
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
async function validaComprobanteInscripcion(req,res,next)  {
  var NumCuenta = req.body.NumCuenta;
  var Periodo = await periodoencurso();

db.sequelize.query('select count(*) as existe from comprobanteinsc where NumCuenta="'+NumCuenta+'"&& Periodo="'+Periodo+'";', { raw: true })
.then(data => {
console.log(data[0][0])
console.log(data[0][0].existe)
if(data[0][0].existe == "1")
{
  res.status(403).send({
    message: "Ya Existe una inscripcion en este periodo para ese numero de cuenta"
  })

}
}).catch(err => {
  res.status(500).send({
    message:
      err.message || "Algun error ocurrio validaComprobanteInscripcion"
  })
}
)
next();
return;

}
async function periodoencurso(req,res) {
  var query= await db.sequelize.query('SELECT Periodo  FROM  calendarioEscolar WHERE  Encurso="true" ').catch(err => {
    res.status(403).send({
      message:
        err.message || "Hubo algun error al borrar Asignatura"
    });
  }
  );
  const{Periodo}= query[0][0]
  return Periodo ;
}

const validacionesAlumno = {
    validaCupo: validaCupo,
    validaHoraInscripcion: validaHoraInscripcion,
    validaComprobanteInscripcion: validaComprobanteInscripcion
  }
  
module.exports = validacionesAlumno;
  