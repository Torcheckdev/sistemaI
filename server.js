const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var cookieParser = require('cookie-parser')
require('dotenv').config({path: './.env'});

const app = express();

var corsOptions = {
  origin: process.env.HOST,
credentials: true
};

app.use(cookieParser())

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/main", (req, res) => {
  res.json({ message: "Welcome to main." });
});



// Db models and roles
const db = require("./models");
const Role = db.role;
db.sequelize.sync({force: false}).then(() => {
  
  //force: true 
  console.log('Drop and Resync Db');
  
  initial();

}
)
;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.HOST);
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next();
});


async function initial() {
  

  Role.create({
    Id: 1,
    Nombre: "user"
  });
 
  Role.create({
    Id: 2,
    Nombre: "moderator"
  });
 
  Role.create({
    Id: 3,
    Nombre: "admin"
  });
  
  const fs = require('fs');

  await db.sequelize.query('CREATE TRIGGER CREDITOS  AFTER INSERT ON historialacademico'+' '+ 
  'FOR EACH ROW'+' '+ 
  'BEGIN'+' '+  
  'DECLARE sumcreditosobl INT;'+' '+ 
  'DECLARE sumcreditosopt INT;'+' '+   
  'SET sumcreditosobl = (select  SUM(m.Creditos)  from historialacademico h, materia m  where h.IDmateria=m.IDmateria && h.calificacion >5 &&m.Tipo="OBL" && h.NumCuenta=NEW.NumCuenta);'+' '+ 
  'SET sumcreditosopt=(select  SUM(m.Creditos)  from historialacademico h, materia m  where h.IDmateria=m.IDmateria && h.calificacion >5 &&m.Tipo="OPT" && h.NumCuenta=NEW.NumCuenta);'+' '+ 
  'iF (sumcreditosobl IS NULL ) THEN set sumcreditosobl = 0; END IF;'+' '+ 
  'iF (sumcreditosopt IS NULL ) THEN set sumcreditosopt = 0; END IF;'+' '+ 
  'UPDATE calificaciones  SET Cobligatorios = sumcreditosobl, Coptativos = sumcreditosopt, Ctotales=sumcreditosobl+sumcreditosopt WHERE NumCuenta=NEW.NumCuenta;'+' '+ 
  'END;');

  var sql_string = fs.readFileSync('./models/sqlscripts/1insertPlantel.sql'.toString(), 'utf8');
await db.plantel.sequelize.query(sql_string);


  var sql_string1 = fs.readFileSync('./models/sqlscripts/2insertCarrera.sql'.toString(), 'utf8');
await db.carrera.sequelize.query(sql_string1);

var sql_string2 = fs.readFileSync('./models/sqlscripts/3insertPestudios.sql'.toString(), 'utf8');
await db.planestudios.sequelize.query(sql_string2);

var sql_string3 = fs.readFileSync('./models/sqlscripts/4insertMateria.sql'.toString(), 'utf8');
await db.materia.sequelize.query(sql_string3);

var sql_string4 = fs.readFileSync('./models/sqlscripts/5insertDepartamento.sql'.toString(), 'utf8');
await db.departamento.sequelize.query(sql_string4);

var sql_string5 = fs.readFileSync('./models/sqlscripts/6insertProfesor.sql'.toString(), 'utf8');
await db.profesor.sequelize.query(sql_string5);

var sql_string6 = fs.readFileSync('./models/sqlscripts/7insertAlumno.sql'.toString(), 'utf8');
await db.alumno.sequelize.query(sql_string6);

await db.sequelize.query('CREATE TRIGGER cursacalif  AFTER INSERT ON cursa'+' '+ 
'FOR EACH ROW'+' '+
'BEGIN'+ ' '+ 
'insert into calificaciones VALUES (NEW.NumCuenta,0,0,0,0,0,0,0,0,0,0,0,NOW(),NOW());'+' '+
'END;');

var sql_string7 = fs.readFileSync('./models/sqlscripts/8insertCursa.sql'.toString(), 'utf8');
 await db.cursa.sequelize.query(sql_string7);

 var sql_string8 = fs.readFileSync('./models/sqlscripts/9insertinscProfe.sql'.toString(), 'utf8');
 await db.inscProfe.sequelize.query(sql_string8);

 var sql_string9 = fs.readFileSync('./models/sqlscripts/10insertHorario.sql'.toString(), 'utf8');
 await db.horario.sequelize.query(sql_string9);

 var sql_string10 = fs.readFileSync('./models/sqlscripts/11insertinscAsig.sql'.toString(), 'utf8');
 await db.inscAsignatura.sequelize.query(sql_string10);

 var sql_triggerinscritos= fs.readFileSync('./models/sqlscripts/triggers/inscritos.sql'.toString(), 'utf8');
 await db.sequelize.query('CREATE TRIGGER inscritos  AFTER INSERT ON inscMateria'+' '+ 
 'FOR EACH ROW'+' '+
 'BEGIN'+ ' '+
 'UPDATE inscAsignatura  SET Inscritos = Inscritos+1 WHERE folioAsig=NEW.folioAsig;'+' '+
 'END;');
/*//updatecalificacion de inscmateria a historialcadamico
 await db.sequelize.query('CREATE TRIGGER UPcal  AFTER INSERT ON inscMateria'+' '+ 
 'FOR EACH ROW'+' '+
 'BEGIN'+ ' '+
 'UPDATE inscMateria SET Calificacion = Calificacion WHERE inscMateria.NumCuenta = historialacademico.NumCuenta AND inscMateria.folioAsig = historialacademico.folioAsing;'+' '+
 'END;');*/

 await db.sequelize.query('CREATE TRIGGER ha BEFORE INSERT ON inscMateria'+' '+ 
 'FOR EACH ROW'+' '+ 
 'INSERT INTO historialacademico(NumCuenta,folioAsig,IDmateria,Periodo,Calificacion,TipoExamen)VALUES(NEW.NumCuenta,NEW.folioAsig,NEW.IDmateria,NEW.Periodo,NEW.Calificacion,NEW.TipoExamen);');
 
 await db.sequelize.query('CREATE TRIGGER promedio  AFTER INSERT ON historialacademico FOR EACH ROW BEGIN DECLARE sumamaterias NUMERIC(10,2); DECLARE totalmaterias NUMERIC(10,2);  SET sumamaterias = (select SUM(oca) from (select h.IDmateria ,MAX(h.calificacion) as oca from historialacademico h where h.IDmateria= h.IDmateria && NumCuenta=NEW.NumCuenta GROUP BY h.IDmateria) as otro); SET totalmaterias=(select COUNT(oca) from (select h.IDmateria ,MAX(h.calificacion) as oca from historialacademico h where h.IDmateria= h.IDmateria && NumCuenta=NEW.NumCuenta && h.Calificacion BETWEEN 5 AND 10 GROUP BY h.IDmateria) as otro); UPDATE calificaciones  SET Promedio = sumamaterias/totalmaterias WHERE NumCuenta=NEW.NumCuenta; END;');


await db.sequelize.query('CREATE TRIGGER eacademica AFTER INSERT ON historialacademico'+' '+ 
'FOR EACH ROW'+' '+
'BEGIN'+' '+
'DECLARE sumaaprobadaso INT;'+' '+ 
 'DECLARE sumaaprobadosext INT;'+' '+ 

 'DECLARE totalrecurse INT;'+' '+ 
 'DECLARE totalaprobados INT;'+' '+ 
 'DECLARE totalmaterias INT;'+' '+ 
 'DECLARE totalnoaprobados INT;'+' '+

 'SET sumaaprobadaso = (select  count(h.Calificacion) as TotalAprobadas  from historialacademico h, materia m  where h.IDmateria=m.IDmateria && h.calificacion >5 && h.NumCuenta=NEW.NumCuenta && h.TipoExamen="ORD");'+' '+ 
 'SET sumaaprobadosext = (select  count(h.Calificacion) as TotalAprobadasExt  from historialacademico h, materia m  where h.IDmateria=m.IDmateria && h.calificacion >5 && h.TipoExamen="EXT"  && h.NumCuenta=New.NumCuenta);'+' '+ 
 'UPDATE calificaciones SET Aordinario=sumaaprobadaso, Aextraordinario=sumaaprobadosext where NumCuenta=NEW.NumCuenta;'+' '+ 

 'SET totalrecurse = (select  count(h.folioAsig) as TotalAprobadasRecurse  from historialacademico h, materia m ,cursa c  where h.IDmateria=m.IDmateria && h.NumCuenta=NEW.NumCuenta && m.Semestre < c.Semestre  && c.NumCuenta= NEW.NumCuenta);'+' '+ 
 'SET totalaprobados = (select  count( distinct h.IDmateria) as Aprobadas  from historialacademico h, materia m  where  h.calificacion >5 && h.NumCuenta=NEW.NumCuenta);'+' '+ 
 'SET totalmaterias = (select  count( distinct h.IDmateria) as TotalMaterias  from historialacademico h, materia m  where  h.NumCuenta = NEW.NumCuenta);'+' '+ 
 'SET totalnoaprobados = totalmaterias-totalaprobados;'+' '+ 
 'UPDATE calificaciones SET Arecurse=totalrecurse, Atotal=totalaprobados, Noaprobadas=totalnoaprobados, Mtotal=totalmaterias where NumCuenta=NEW.NumCuenta;'+' '+


 'iF (totalaprobados = 0 ) THEN UPDATE calificaciones SET EficienciaAcademica=0 where NumCuenta=NEW.NumCuenta; ELSE  UPDATE calificaciones SET EficienciaAcademica=((sumaaprobadaso - sumaaprobadosext - totalrecurse) / totalaprobados) where NumCuenta=NEW.NumCuenta; END IF;'+' '+ 
'END;');

 var sql_string11 = fs.readFileSync('./models/sqlscripts/12insertinscMateria.sql'.toString(), 'utf8');
 await db.inscMateria.sequelize.query(sql_string11);


}
//routes

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/product.routes')(app);
require('./routes/alumno.routes')(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

  // set static folder renders reactapp
  const path =require('path');
  app.use(express.static('./Client/build'));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname,'./' ,'Client', 'build','index.html'));
  });