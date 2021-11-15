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

var sql_string7 = fs.readFileSync('./models/sqlscripts/8insertCursa.sql'.toString(), 'utf8');
await db.cursa.sequelize.query(sql_string7).then(result=> {
console.log(result)
});

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