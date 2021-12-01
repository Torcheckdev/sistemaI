const db = require("../models");
const {Op} = require("sequelize");
const { cursa, alumno } = require("../models");
var moment = require('moment');  

async function generaDosificacion(req,res){
     
    var Periodo =req.body.Periodo;
    var FechaDosificacion=req.body.FechaDosificacion;
    var Horam=req.body.Horam;
    var Sumiteracion=req.body.Sumiteracion
    var dosificacion= await  
  db.sequelize.query('select c.NumCuenta,c.PlanEstudios,c.AnioInscripcion, ca.Ctotales, ca.Promedio,ca.EficienciaAcademica from cursa c INNER JOIN calificaciones ca ON c.NumCuenta=ca.NumCuenta && c.PlanEstudios=c.PlanEstudios ORDER BY AnioInscripcion,Ctotales desc, Promedio desc,EficienciaAcademica desc',
   { raw: true })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Algun error ocurrio cuando se generaba la dosificación"
    });
}
  );

var horainicio="08:00";
var horatermino="21:00";
var horainscripcion="08:00";
// cada 35 alumnos atrega 5 min
var fecha = moment(FechaDosificacion+"T"+Horam, ["HH:mm", moment.ISO_8601]);
console.log(fecha)
 fecha = moment(fecha).add(5, 'm');
console.log(fecha)
console.log(moment(fecha).format('LT'))

var auxindex=0;


var datosalumno  = [{}];
   await dosificacion[0].map(async (i,index) =>{i.orden=index+1
  

switch(index){
case index = auxindex+Sumiteracion : 
auxindex =index;
fecha = moment(fecha).add(5, 'm')

;
break;

}
i.Hora= moment(fecha).format();

})

for (var i=0; i< dosificacion[0].length; i++){
await  db.sequelize.query('select a.Nombre,p.IDcarrera,c.Nombre  as Ncarrera from alumno a, planestudios p, carrera c where a.NumCuenta="'+dosificacion[0][i].NumCuenta+'" && p.PlanEstudios="'+dosificacion[0][i].PlanEstudios+'" && c.IDcarrera=p.IDcarrera ').then(data => {
 datosalumno [i]= data[0]; 
  }
)
}

 await dosificacion[0].map(async (i,index) =>{
    const [{ Nombre,IDcarrera,Ncarrera}] = datosalumno[index];
  
    i.Nombre=Nombre,
    i.IDcarrera=IDcarrera,
    i.Ncarrera=Ncarrera,
    i.Periodo=Periodo


})
console.log(dosificacion[0])

await db.sequelize.query('delete from dosificacion');

for(var i=0; i<dosificacion[0].length ; i++){
    var NumCuenta= dosificacion[0][i].NumCuenta;
    var IDcarrera=dosificacion[0][i].IDcarrera;
    var PlanEstudios=dosificacion[0][i].PlanEstudios;
    var Periodo=dosificacion[0][i].Periodo;
    var Fecha =dosificacion[0][i].Hora;
    var NumTurno=dosificacion[0][i].orden;
    var NCarrera=dosificacion[0][i].Ncarrera;
await db.sequelize.query('INSERT INTO dosificacion(NumCuenta,IDcarrera,Ncarrera,PlanEstudios,Periodo,Fecha,NumTurno) values("'+NumCuenta+'","'+IDcarrera+'","'+NCarrera+'","'+PlanEstudios+'","'+Periodo+'","'+Fecha+'","'+NumTurno+'")').catch(err => {
    res.status(500).send({
      message:
        err.message || "Algun error ocurrio cuando se generaba la dosificación"
    });
}
  );

console.log(NumCuenta);
console.log(Periodo);
console.log(NumTurno);


}



res.send(dosificacion[0]);

}



module.exports.generaDosificacion = generaDosificacion;