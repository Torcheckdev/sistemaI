const db = require("../models");
const alumno= db.alumno;
const {Op} = require("sequelize");
const { cursa } = require("../models");



async function getdatosAlumno(req,res){
  var Email = req.body.Email;
  var datosalumno= await  
  db.sequelize.query('select a1.NumCuenta,a1.Nombre as NombreA,a1.Fechanac, c1.PlanEstudios,c1.AnioInscripcion,c1.Modalidad,p2.IDcarrera,c3.Nombre as NombreC,c3.IDplantel,p4.Nombre as NombreP from alumno a1  INNER JOIN cursa c1 ON  a1.Email="'+Email+'" && a1.NumCuenta = c1.NumCuenta INNER JOIN planestudios p2  ON c1.PlanEstudios=p2.PlanEstudios INNER JOIN carrera c3 ON p2.IDcarrera = c3.IDcarrera INNER JOIN plantel p4 ON c3.IDplantel=p4.IDplantel GROUP BY a1.NumCuenta',
   { raw: true })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Algun error ocurrio cuando traiamos los datos del alumno"
    });
}
  )

/*
  let {NumCuenta,Nombre} = datosalumno[0];
  console.log(NumCuenta,Nombre);

  datosalumno={NumCuenta:NumCuenta,Nombre:Nombre}
  /*console.log(JSON.stringify(datosalumno[0]['NumCuenta']));*/

  console.log(datosalumno);

  res.send(datosalumno);

}
module.exports.getdatosAlumno = getdatosAlumno;






exports.generaDosificacion=(req,res) => {
  alumno.findAll({ 
      where:{
          NumCuenta:req.body.NumCuenta
  }
  }).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algun error ocurrio cuando traiamos los datos del alumno"
      });
  }
    );


}

exports.listaMaterias=(req,res) => {
  var PlanEstudios=req.body.PlanEstudios
   db.sequelize.query('select distinct a1.folioAsig,a1.IDpm,a1.IDhorario,a1.Cupo,a1.Inscritos,a1.Grupo,m2.IDmateria,m2.Nombre,m2.Semestre,m2.Creditos,m2.Tipo,m2.PlanEstudios,h4.Dia,h4.Horario,h4.Turno,h4.Semestre from inscAsignatura  a1,materia m2, inscProfe p3, horario h4  where exists (select * from inscProfe  p3  where IDmateria=m2.IDmateria && PlanEstudios ="'+PlanEstudios+'" && IDpm=a1.IDpm && a1.Cupo >a1.Inscritos && h4.IDhorario=a1.IDhorario) ORDER BY folioAsig', { raw: true }).then(data => {
       res.send(data[0]);
     })
     .catch(err => {
       res.status(500).send({
         message:
           err.message || "Algun error ocurrio cuando traiamos los datos del alumno"
       });
   }
     );
 
 
 }


 exports.consultaSaturacion=(req,res) => {
  
  var PlanEstudios=req.body.PlanEstudios;
   db.sequelize.query('select distinct a1.folioAsig,a1.IDpm,a1.IDhorario,a1.Cupo,a1.Inscritos,a1.Grupo,m2.IDmateria,m2.Nombre,m2.Semestre,m2.Creditos,m2.Tipo,m2.PlanEstudios,h4.Dia,h4.Horario,h4.Turno,h4.Semestre from inscAsignatura  a1,materia m2, inscProfe p3, horario h4  where exists (select * from inscProfe  p3  where IDmateria=m2.IDmateria && PlanEstudios ="'+PlanEstudios+'"&& IDpm=a1.IDpm  && h4.IDhorario=a1.IDhorario) ORDER BY folioAsig;', { raw: true }).then(data => {
       res.send(data[0]);
     })
     .catch(err => {
       res.status(500).send({
         message:
           err.message || "Algun error ocurrio cuando traiamos los datos del alumno"
       });
   }
     );
 
 
 }
 /*
 exports.validaCupo= (req,res) => {
  
  var arrayMaterias=req.body;
  var arraylength=arrayMaterias.length;
   console.log(arraylength);
for(var i=0; i<arraylength; i++){
  console.log(arrayMaterias[i]['folioAsig']);

  db.sequelize.query('select  folioAsig,Cupo,Inscritos from inscAsignatura where folioAsig="'+arrayMaterias[i]['folioAsig']+'"', { raw: true })
  .then(data => {
console.log(data[0][0]);


if(data[0][0]['Cupo'] == data[0][0]['Inscritos']){
  console.log("NO hay cupo");
  res.status(403).send({
    message: "NO hay cupo para la materia : "+data[0][0]['folioAsig']
  });
  }

  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Algun error ocurrio validaCupo"
    });
}
  );

}
   //res.send(arrayMaterias)
 }
*/
 async function inscribirMateria(req,res){
  var arrayMaterias=req.body
  var arraylength=arrayMaterias.length
  ;
  for(var i=0; i<arraylength; i++){
console.log("me ejecute");
   var materiaInscrita = await db.sequelize.query('insert into inscMateria (NumCuenta,folioAsig,Periodo,Calificacion,TipoExamen) values ("'+arrayMaterias[i]['NumCuenta']+'","'+arrayMaterias[i]['folioAsig']+'","'+arrayMaterias[i]['Periodo']+'","'+arrayMaterias[i]['Calificacion']+'","'+arrayMaterias[i]['TipoExamen']+'")',
    { raw: true })
   .catch(err => {
     res.status(500).send({
       message:
         err.message || "Algun error ocurrio cuando traiamos los datos del alumno"
     });
 });
console.log("Se inserto con exito"+ arrayMaterias[i][0]);
}
console.log("Se insertaron todas las materias"+arrayMaterias[0]);
res.status(200).send ({
  message:"Se insertaron todas las materias con exitación"
});
 }

 module.exports.inscribirMateria = inscribirMateria;
