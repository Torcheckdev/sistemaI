const db = require("../models");
const alumno= db.alumno;
const {Op} = require("sequelize");
const { cursa, materia } = require("../models");



async function getdatosAlumno(req,res){
  var Email = req.body.Email;
  var datosalumno= await  
  db.sequelize.query('select a1.NumCuenta,a1.Nombre as NombreA,a1.Fechanac, c1.PlanEstudios,c1.AnioInscripcion,c1.Modalidad,c1.Periodo,p2.IDcarrera,c3.Nombre as NombreC,c3.IDplantel,p4.Nombre as NombreP from alumno a1  INNER JOIN cursa c1 ON  a1.Email="'+Email+'" && a1.NumCuenta = c1.NumCuenta INNER JOIN planestudios p2  ON c1.PlanEstudios=p2.PlanEstudios INNER JOIN carrera c3 ON p2.IDcarrera = c3.IDcarrera INNER JOIN plantel p4 ON c3.IDplantel=p4.IDplantel GROUP BY a1.NumCuenta',
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

  res.send(datosalumno[0]);

}
module.exports.getdatosAlumno = getdatosAlumno;






async function consultaInscripcion(req,res) {
  var NumCuenta=req.body.NumCuenta
  var Periodo=await periodoencurso();
  var datosalumno = await db.sequelize.query('select a1.NumCuenta,a1.Nombre as NombreA,c1.PlanEstudios,c1.AnioInscripcion,c1.Modalidad,c1.Periodo,p2.IDcarrera,c3.Nombre as NombreC,c3.IDplantel,p4.Nombre as NombreP from alumno a1  INNER JOIN cursa c1 ON  a1.NumCuenta="'+NumCuenta+'" &&  c1.NumCuenta=a1.NumCuenta INNER JOIN planestudios p2  ON c1.PlanEstudios=p2.PlanEstudios INNER JOIN carrera c3 ON p2.IDcarrera = c3.IDcarrera INNER JOIN plantel p4 ON c3.IDplantel=p4.IDplantel GROUP BY a1.NumCuenta;',{ raw: true })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Algun error ocurrio cuando traiamos los datos del alumno"
    });
}
  )

  var materiasi= await db.sequelize.query('select c.IDcomprobante,c.Fecha,c.Periodo,m.IDmateria,m.nombre,m.Creditos,m.Semestre,a.Grupo,h.Dia,h.Horario from comprobanteinsc c inner join comprobantematerias cm ON c.NumCuenta="'+NumCuenta+'" && cm.IDcomprobante=c.IDcomprobante && c.Periodo="'+Periodo+'" inner join inscAsignatura a on cm.folioAsig=a.folioAsig inner join inscProfe ip on a.IDpm=ip.IDpm inner join materia m ON m.IDmateria=ip.Idmateria inner join horario h on h.IDhorario=a.IDhorario ;',
   { raw: true })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Algun error ocurrio cuando traiamos los datos del alumno"
    });
}
  )
var consultainscripcion = [{}]
consultainscripcion[0]=datosalumno[0];
consultainscripcion[1]=materiasi[0];
{materiasi[0] == 0? res.status(404).send("No hay registro de inscripcion"):null}
res.send(consultainscripcion);

}
module.exports.consultaInscripcion = consultaInscripcion;




async function consultadosificacion(req,res) {
  var NumCuenta=req.body.NumCuenta
  var Periodo=await periodoencurso();
  var datosalumno = await db.sequelize.query('select a1.NumCuenta,a1.Nombre as NombreA,c1.PlanEstudios,c1.AnioInscripcion,c1.Modalidad,c1.Periodo,p2.IDcarrera,c3.Nombre as NombreC,c3.IDplantel,p4.Nombre as NombreP from alumno a1  INNER JOIN cursa c1 ON  a1.NumCuenta="'+NumCuenta+'" &&  c1.NumCuenta=a1.NumCuenta INNER JOIN planestudios p2  ON c1.PlanEstudios=p2.PlanEstudios INNER JOIN carrera c3 ON p2.IDcarrera = c3.IDcarrera INNER JOIN plantel p4 ON c3.IDplantel=p4.IDplantel GROUP BY a1.NumCuenta;',{ raw: true })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Algun error ocurrio cuando traiamos los datos del alumno"
    });
}
  )

var dosificacion =await db.sequelize.query('select * from dosificacion where NumCuenta="'+NumCuenta+'" && Periodo="'+Periodo+'"',
{ raw: true })
.catch(err => {
 res.status(500).send({
   message:
     err.message || "Algun error ocurrio cuando traiamos los datos del alumno"
 });
});  

var resdosificacion = [{}]
resdosificacion[0]=datosalumno[0];
resdosificacion[1]=dosificacion[0];
{dosificacion[0] == 0? res.status(404).send("No hay registro de inscripcion"):null}

res.send(resdosificacion)
}
module.exports.consultadosificacion = consultadosificacion;



async function listaMaterias(req,res) {
  var PlanEstudios=req.body.PlanEstudios
  var NumCuenta=req.body.NumCuenta
 var Periodo=await periodoencurso();
  var datos= await db.sequelize.query('select distinct a1.folioAsig,a1.IDpm,a1.IDhorario,a1.Cupo,a1.Inscritos,a1.Grupo,m2.IDmateria,m2.Nombre,m2.Semestre,m2.Creditos,m2.Tipo,m2.PlanEstudios,h4.Dia,h4.Horario,h4.Turno,c5.Semestre as SemestreA from inscAsignatura  a1,materia m2, inscProfe p3, horario h4, cursa c5  where exists (select * from inscProfe  p3  where  p3.Periodo = a1.Periodo && a1.Periodo ="'+Periodo+'" && IDmateria=m2.IDmateria && m2.PlanEstudios ="'+PlanEstudios+'" && IDpm=a1.IDpm && a1.Cupo >a1.Inscritos && h4.IDhorario=a1.IDhorario &&c5.NumCuenta="'+NumCuenta+'" && m2.Semestre <= c5.Semestre && h4.Turno = c5.Turno) ORDER BY folioAsig;', { raw: true })
     .catch(err => {
       res.status(500).send({
         message:
           err.message || "Algun error ocurrio cuando traiamos los datos del alumno"
       });
   }
     );
if (datos[0][0].SemestreA == 1){
  datos[0].sort( function(a,b){ 
    var x = a.IDmateria < b.IDmateria? -1:1; 
    return x; 
  });
res.send(datos[0])

}
var materiaseriada=await db.sequelize.query('select distinct a1.folioAsig,a1.IDpm,a1.IDhorario,a1.Cupo,a1.Inscritos,a1.Grupo,m2.IDmateria,m2.Nombre,m2.Semestre,m2.Creditos,m2.Tipo,m2.PlanEstudios,h4.Dia,h4.Horario,h4.Turno,c5.Semestre as SemestreA , s6.IDmateria as IDseriada from inscAsignatura  a1,materia m2, inscProfe p3, horario h4, cursa c5 , seriada s6 where exists (select * from inscProfe  p3  where p3.IDmateria=m2.IDmateria   && m2.PlanEstudios ="'+PlanEstudios+'" && IDpm=a1.IDpm && a1.Cupo >a1.Inscritos && h4.IDhorario=a1.IDhorario &&c5.NumCuenta="'+NumCuenta+'" && m2.Semestre <= c5.Semestre && m2.IDmateria = s6.IDseriada &&p3.IDmateria = s6.IDseriada )  order by folioAsig;', { raw: true })
.catch(err => {
  res.status(500).send({
    message:
      err.message || "Algun error ocurrio cuando traiamos los datos del alumno"
  });
}
);
var seriaciones =[[{}]];
 for(var i=0; i< materiaseriada[0].length ; i++){
  console.log("MATERIASERIADA : " + materiaseriada[0][i]['IDmateria'] )

seriaciones[0][i]= await {
  "IDseriada":materiaseriada[0][i]['IDseriada'],
  "IDmateria":materiaseriada[0][i]['IDmateria']
} ;
console.log("SERIACIONES : "+seriaciones[0][i]['IDseriada'])
console.log("SERIACIONES  IDMATERIA : "+seriaciones[0][i]['IDmateria'])

var msa = [0]
 }
 console.log(seriaciones[0].length)
for (var i=0 ; i<seriaciones[0].length; i++){
    msa[i]=await db.sequelize.query('select count(*) as aprobada  from historialacademico where NumCuenta="'+NumCuenta+'" && IDmateria="'+seriaciones[0][i]['IDseriada']+'" && Calificacion >5;', { raw: true })
.catch(err => {
  res.status(500).send({
    message:
      err.message || "Algun error ocurrio cuando traiamos los datos del alumno"
  });
}
);

}


//seriaciones , msa tienen su resultado en la misma posición 
/*for (var i=0 ; i<seriaciones[0].length; i++){
  console.log(seriaciones[0][i])
}
*/

for (var i=0; i<msa.length; i++){
  console.log(seriaciones[0][i]['IDseriada']) 
console.log("TAMAÑO DE DATOS : "+datos[0].length)
 if( msa[i][0][0].aprobada == 0) 
{
  for (var j=0 ; j<datos[0].length; j++){
    if(   seriaciones[0][i]['IDmateria'] ==  datos[0][j].IDmateria){
     await  datos[0].splice(j, 1); 

     }
   }

  }
}

var materiasaprobadas=await db.sequelize.query('select distinct IDmateria   from historialacademico where NumCuenta="'+NumCuenta+'" AND Calificacion >5;', { raw: true })
.catch(err => {
  res.status(500).send({
    message:
      err.message || "Algun error ocurrio cuando traiamos los datos del alumno"
  });
}
);


for(var j=0; j<materiasaprobadas[0].length; j++ ){
for(var i=0; i<datos[0].length; i++){
if(datos[0][i].IDmateria == materiasaprobadas[0][j]["IDmateria"]){
  await  datos[0].splice(i, 1); 
  i--;
}
}
}

var nocursables = await db.sequelize.query('select h.IDmateria ,count(h.IDmateria) as vecescursada from historialacademico h  where NumCuenta="'+NumCuenta+'" && TipoExamen="ORD"   Group by IDmateria HAVING vecescursada >1;', { raw: true })
.catch(err => {
  res.status(500).send({
    message:
      err.message || "Algun error ocurrio cuando traiamos los datos del alumno"
  });
}
);


for(var j=0; j<nocursables[0].length; j++ ){
  for(var i=0; i<datos[0].length; i++){
  if(datos[0][i].IDmateria == nocursables[0][j]["IDmateria"]){
    await  datos[0].splice(i, 1); 
    i--;
  }
  }
  }

//res.send(nocursables[0])



 datos[0].sort( function(a,b){ 
  var x = a.IDmateria < b.IDmateria? -1:1; 
  return x; 
});
res.send(datos[0])


//seriaciones[0][i]['IDmateria']





    // console.log(materiaseriada[0][0]['IDseriada'])

     //console.log(datos[0].length)
   /*  for (var i=0 ; i<datos[0].length; i++){
      if(datos[0][i]["IDmateria"] == materiaseriada[0][0]['IDseriada']){
       delete datos [0][i]
       }
     }
*/

 
 }

 module.exports.listaMaterias = listaMaterias;

 async function consultaSaturacion(req,res){
 var Periodo=await periodoencurso(); 
  var PlanEstudios=req.body.PlanEstudios;
   db.sequelize.query('select distinct a1.folioAsig,a1.IDpm,a1.IDhorario,a1.Cupo,a1.Inscritos,a1.Grupo,m2.IDmateria,m2.Nombre,m2.Semestre,m2.Creditos,m2.Tipo,m2.PlanEstudios,h4.Dia,h4.Horario,h4.Turno,h4.Semestre from inscAsignatura  a1,materia m2, inscProfe p3, horario h4  where exists (select * from inscProfe  p3  where a1.Periodo="'+Periodo+'" && p3.Periodo=a1.Periodo && IDmateria=m2.IDmateria && PlanEstudios ="'+PlanEstudios+'"&& IDpm=a1.IDpm  && h4.IDhorario=a1.IDhorario) ORDER BY  m2.Semestre, m2.IDmateria desc;', { raw: true }).then(data => {
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
 module.exports.consultaSaturacion = consultaSaturacion;

 async function inscribirMateria(req,res){
  var arrayMaterias=req.body
  var arraylength=arrayMaterias.length;
  var NumCuenta=arrayMaterias[0]['NumCuenta'];
var sumCreditosM = 0;
var Periodo=await periodoencurso();
  for (var i = 0; i<arraylength; i++){
    
    var creditos = await db.materia.sequelize.query('select Creditos from materia where IDmateria= "'+arrayMaterias[i]['IDmateria']+'";',
    { raw: true })
   .catch(err => {
     res.status(500).send({
       message:
         err.message || "Algun error ocurrio durante la inserción de materias"
     });
 });
    
    sumCreditosM+=parseInt(creditos[0][0]['Creditos'])

  }
  //res.send(creditos[0])
var bandera = false ; 

var query= await db.sequelize.query('SELECT COUNT(*) as registro FROM  extensionCreditos WHERE  NumCuenta="'+NumCuenta+'"  && Periodo ="'+Periodo+'"  ').catch(err => {
  res.status(403).send({
    message:
      err.message || "Hubo algun error al borrar Asignatura"
  });
}
);
const{registro}= query[0][0]

var creditosmax = 58;
if(registro > 0){
 creditosmax = await db.materia.sequelize.query('select Creditos from extensionCreditos where NumCuenta="'+NumCuenta+'"  && Periodo ="'+Periodo+'"',
    { raw: true })
   .catch(err => {
     res.status(500).send({
       message:
         err.message || "Algun error ocurrio durante la inserción de materias"
     });
 });

const {Creditos}= creditosmax[0][0];
creditosmax=Creditos;
}
else {    {arraylength >8 ? (res.status(403).send({ message:
  "No puedes inscribir más de 8 materias"}) &&( bandera =true) )   :null }    }

   {sumCreditosM>creditosmax ? (res.status(403).send({ message:
  "La suma de creditos tiene que ser menor o igual a 58"}) &&  (bandera = true) ) :null }

  if (bandera ==true ){

    return
  }

  for(var i=0; i<arraylength; i++){
console.log("me ejecute");
   var materiaInscrita = await db.materia.sequelize.query('insert into inscMateria (NumCuenta,folioAsig,IDmateria,Periodo,Calificacion,TipoExamen) values ("'+arrayMaterias[i]['NumCuenta']+'","'+arrayMaterias[i]['folioAsig']+'","'+arrayMaterias[i]['IDmateria']+'","'+Periodo+'","'+arrayMaterias[i]['Calificacion']+'","'+arrayMaterias[i]['TipoExamen']+'")',
    { raw: true })
   .catch(err => {
     res.status(500).send({
       message:
         err.message || "Algun error ocurrio durante la inserción de materias"
     });
 });
}
console.log("Se insertaron todas las materias");


var datosalumno = await db.sequelize.query('select a1.NumCuenta,a1.Nombre as NombreA,c1.PlanEstudios,c1.AnioInscripcion,c1.Modalidad,c1.Periodo,p2.IDcarrera,c3.Nombre as NombreC,c3.IDplantel,p4.Nombre as NombreP from alumno a1  INNER JOIN cursa c1 ON  a1.NumCuenta="'+NumCuenta+'" &&  c1.NumCuenta=a1.NumCuenta INNER JOIN planestudios p2  ON c1.PlanEstudios=p2.PlanEstudios INNER JOIN carrera c3 ON p2.IDcarrera = c3.IDcarrera INNER JOIN plantel p4 ON c3.IDplantel=p4.IDplantel GROUP BY a1.NumCuenta;');

var materiasinscritas = [{}];

for(var i=0; i<arraylength; i++){
await db.sequelize.query('select a.IDmateria,a.Nombre,a.Creditos,a.Semestre,i.Grupo,h.Horario from materia a inner join inscAsignatura i  ON a.IDmateria="'+arrayMaterias[i]['IDmateria']+'" && i.folioAsig="'+arrayMaterias[i]['folioAsig']+'" inner join horario h ON i.IDhorario=h.IDhorario').then(data => {
  materiasinscritas [i]= data[0]; 

});
}


await db.sequelize.query('insert into comprobanteinsc (NumCuenta,Periodo,Fecha) values("'+NumCuenta+'","'+Periodo+'",NOW());',{ raw: true })
.catch(err => {
  res.status(500).send({
    message:
      err.message || "Algun error ocurrio durante la inserción de materias"
  });
});


var IDcomprobante =await db.sequelize.query('SELECT IDcomprobante,Fecha FROM comprobanteinsc where NumCuenta="'+NumCuenta+'" && Periodo="'+Periodo+'";',{ raw: true })
.catch(err => {
  res.status(500).send({
    message:
      err.message || "Algun error ocurrio durante la inserción de materias"
  });
});
console.log(IDcomprobante[0][0]['IDcomprobante']);
for(var i=0; i<arraylength; i++){
await db.sequelize.query('insert into comprobantematerias (IDcomprobante,folioAsig) values("'+IDcomprobante[0][0]['IDcomprobante']+'","'+arrayMaterias[i]['folioAsig']+'")',{ raw: true })
.catch(err => {
  res.status(500).send({
    message:
      err.message || "Algun error ocurrio durante la inserción de materias"
  });
});
}


var rescomprobante=[{}];
rescomprobante[0]=datosalumno[0];
rescomprobante[1]=IDcomprobante[0];
for(var i=0; i<materiasinscritas.length; i++){
rescomprobante[i+2]=materiasinscritas[i];
}
console.log(datosalumno[0]);
console.log(materiasinscritas[1]);
console.log(rescomprobante);


res.send(rescomprobante);

 }

 module.exports.inscribirMateria = inscribirMateria;

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
