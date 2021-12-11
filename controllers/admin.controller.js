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



async function listaMateriaProf(req,res){

  const Materias = await db.sequelize.query('select * from materia');
  const Profesores = await db.sequelize.query('select * from profesor');

var respuesta = []
respuesta[0]=Materias[0];
respuesta[1]=Profesores[0];

console.log(respuesta[0]);
console.log(respuesta[1]);
  res.send(respuesta);


}

module.exports.listaMateriaProf = listaMateriaProf;




async function inscProf(req,res){

var IDmateria=req.body.IDmateria; 
var IDprofesor =req.body.IDprofesor;

await db.sequelize.query('INSERT INTO  inscProfe  (IDmateria,IDprofesor)  VALUES("'+IDmateria+'","'+IDprofesor+'");').catch(err => {
  res.status(500).send({
    message:
      err.message || "Algun error ocurrio en la inscripción del profesor"
  });
}
);

res.status(200).send({
  message: "Se inscribio  con exito al profesor en la materia"
});



}

module.exports.inscProf = inscProf;






async function listainscAsignatura(req,res){
 var pm = await db.sequelize.query('select  ip.IDpm,ip.IDmateria,ip.IDprofesor,m.nombre,p.Nombre as nombreProfesor from inscProfe ip INNER JOIN materia m ON ip.IDmateria=m.IDmateria INNER JOIN profesor p ON p.IDprofesor=ip.IDprofesor;')
var horario= await db.sequelize.query('select IDhorario,Dia,Horario,Turno from horario;');


var respuesta=[];
respuesta[0]=pm[0];
respuesta[1]=horario[0];
res.send(respuesta);
  }
  
  module.exports.listainscAsignatura = listainscAsignatura;



async function inscAsignatura(req,res){
var IDpm = req.body.IDpm;
var IDhorario=req.body.IDhorario; 
var Grupo =req.body.Grupo;
var Cupo = req.body.Cupo;
var existe1=await db.sequelize.query('select count(*) as existe from inscAsignatura where IDpm="'+IDpm+'" && IDhorario="'+IDhorario+'"');
console.log(existe1[0][0])
const{existe}= existe1[0][0]

console.log(existe)

if(parseInt(existe) > 0){
  res.status(403).send({
    message:
       "Ya existe un grupo para ese maestro  en esa  materia y  horario "
  })
return
}



var ultimoFolio = await db.sequelize.query('SELECT * FROM inscAsignatura ORDER BY folioAsig DESC LIMIT 1');
var {folioAsig}= ultimoFolio[0][0];
folioAsig++;


await db.sequelize.query('INSERT INTO inscAsignatura (folioAsig,IDpm,IDhorario,Grupo,Cupo) VALUES ("'+folioAsig+'","'+IDpm+'","'+IDhorario+'","'+Grupo+'","'+Cupo+'");').catch(err => {
  res.status(403).send({
    message:
      err.message || "Hubo algun error al inscribir Asignatura"
  });
}
);

res.status(200).send({
  message: "Se genero con exito un nuevo grupo"
});


}

module.exports.inscAsignatura = inscAsignatura;



async function listamodinscAsignatura (req,res ){

  var lista = await db.sequelize.query('select ia.folioAsig,ia.Grupo,ia.Cupo,ia.Inscritos,p.Nombre as NombreProf, m.IDmateria, m.Nombre as Nombremateria from inscAsignatura ia INNER JOIN  inscProfe ip ON ia.IDpm=ip.IDpm INNER JOIN profesor p ON p.IDprofesor=ip.IDprofesor INNER JOIN materia m ON m.IDmateria=ip.IDmateria ;')
res.send(lista[0])

}
module.exports.listamodinscAsignatura = listamodinscAsignatura;



async function modinscAsignatura(req,res){

  var Grupo=req.body.Grupo;
  var Cupo = req.body.Cupo;
  var folioAsig=req.body.folioAsig;
  await db.sequelize.query('UPDATE inscAsignatura SET Grupo="'+Grupo+'", Cupo="'+Cupo+'" where folioAsig="'+folioAsig+'"').catch(err => {
    res.status(403).send({
      message:
        err.message || "Hubo algun error al inscribir Asignatura"
    });
  }
  );
  res.send("Se modifico con exito la asignatura")
  
}module.exports.modinscAsignatura = modinscAsignatura;



async function borrarinscAsignatura(req,res){

var folioAsig= req.body.folioAsig;

  var countfolioM= await db.sequelize.query('SELECT   COUNT(*) as cfm from inscMateria where folioAsig='+folioAsig+'').catch(err => {
    res.status(403).send({
      message:
        err.message || "Hubo algun error al borrar Asignatura"
    });
  }
  );

  var countfolioH= await db.sequelize.query('SELECT  COUNT(*)   as cfh from historialacademico where folioAsig='+folioAsig+'').catch(err => {
    res.status(403).send({
      message:
        err.message || "Hubo algun error al borrar Asignatura"
    });
  }
  );
  const{cfm}= countfolioM[0][0]
  const{cfh}= countfolioH[0][0]

console.log(cfm)
console.log(cfh)


if(cfm > 0  || cfh > 0){
  res.status(403).send({
    message:
      "No se puede borrar existen alumnos registrados en este grupo o algun historialacademico referenciado al mismo"
  });
return
}


var countfolioM= await db.sequelize.query('DELETE  FROM inscAsignatura where folioAsig='+folioAsig+'').catch(err => {
  res.status(403).send({
    message:
      err.message || "Hubo algun error al borrar Asignatura"
  });
}
);

res.send("Se borro la Asignatura");




}module.exports.borrarinscAsignatura = borrarinscAsignatura;




