const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,
    port: config.PORT,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    },

   
    define :{
      freezeTableName: true,
      timestamps: true,
    },
    dialectOptions: {
      multipleStatements: true
    }

  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.usuario = require("../models/usuario.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize,Sequelize);
db.plantel = require("../models/plantel.model.js")(sequelize, Sequelize);
db.carrera = require("../models/carrera.model.js")(sequelize,Sequelize);
db.planestudios = require ("../models/planestudios.model.js")(sequelize,Sequelize);
db.departamento = require ("../models/departamento.model.js")(sequelize,Sequelize);
db.profesor = require ("../models/profesor.model.js")(sequelize,Sequelize);
db.jefedepto = require ("../models/jefedepto.model.js")(sequelize,Sequelize);
db.materia = require("../models/materia.model.js")(sequelize,Sequelize);
db.horario = require ("../models/horario.model.js")(sequelize,Sequelize);
db.horarioExtra = require ("../models/horarioExtra.model.js")(sequelize,Sequelize);
db.alumno = require("../models/alumno.model.js")(sequelize,Sequelize);
db.inscProfe = require ("../models/inscProfe.model.js")(sequelize,Sequelize);
db.inscProfeExtra = require ("../models/inscProfeExtra.model.js")(sequelize,Sequelize);
db.inscAsignatura = require("../models/inscAsignatura.model.js")(sequelize,Sequelize);
db.inscAsignaturaExtra = require("../models/inscAsignaturaExtra.model.js")(sequelize,Sequelize);
db.inscMateria = require ("../models/inscMateria.model.js")(sequelize,Sequelize);
db.cursa = require ("../models/cursa.model.js")(sequelize,Sequelize);
db.examenExtra = require ("../models/examenExtra.model.js")(sequelize,Sequelize);
db.historialacademico = require ("../models/historialacademico.model.js")(sequelize,Sequelize);
db.calificaciones = require ("../models/calificaciones.model.js")(sequelize,Sequelize);
db.egresado = require ("../models/egresado.model.js")(sequelize,Sequelize);
db.bajatemporal = require ("../models/bajatemporal.model.js")(sequelize,Sequelize);
db.bajadefinitiva = require ("../models/bajadefinitiva.model.js")(sequelize,Sequelize);
db.segcarrera = require ("../models/segcarrera.model.js")(sequelize,Sequelize);


//Relación usuario(idusuario) ->roles(idrole) muchos a muchos en nueva tabla "user_roles"
db.role.belongsToMany(db.usuario, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "Email",
});
db.usuario.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "Email",
  otherKey: "roleId",
});

/*
Relacion de la primaryKey idcarrera en la tabla materias 
con la columna idcarrera en la tabla carrera (belongsTo)
*/



db.departamento.belongsTo(db.carrera,
  {through: "carrera",
  foreignKey: "IDcarrera",
});

/*db.cursa.belongsToMany(db.carrera,
  {
through:"carrera",
foreignKey:"IDcarrera", 
otherKey:"IDcarrera"
  }
);*/

/*
db.cursa.belongsTo(db.carrera,
  {through:"carrera",
  foreignKey:"IDcarrera",
  otherKey:"IDcarrera",
});*/

db.planestudios.belongsTo(db.carrera,
  {through:"carrera",
  foreignKey:"IDcarrera",
  otherKey:"IDcarrera",
});

db.cursa.belongsTo(db.planestudios,
  {through:"planestudios",
  foreignKey:"PlanEstudios",
   otherKey:"PlanEstudios"

});

db.materia.belongsTo(db.planestudios,
  {through:"planestudios",
  foreignKey:"PlanEstudios",
   otherKey:"PlanEstudios"

});





/*
//alumno
db.alumno.belongsTo(db.usuario,{
through:"usuario",
foreignKey:"NumCuenta",
});*/

//profesor
db.profesor.belongsTo(db.departamento,
  {through: "departamento",
  foreignKey: "IDdepto",
});

//planestudios


//materia
db.materia.belongsToMany(db.carrera,
  {through: "carrera",
  foreignKey: "IDcarrera",
  otherKey:"IDcarrera",
});




//para jededepartamento
db.departamento.belongsToMany(db.profesor,
  {through:"jefedepto",
  foreignKey:"IDdepto",
  otherKey:"IDprofesor",
});

db.profesor.belongsToMany(db.departamento,
  {through:"jefedepto",
  foreignKey:"IDprofesor",
  otherKey:"IDdepto",
});

//para tabla inscripcion profe
db.materia.belongsToMany(db.profesor,
  {through:"inscProfe",
  foreignKey:"IDmateria",
  otherKey:"IDprofesor",
});
/*
db.profesor.belongsToMany(db.horario,
  {through:"inscProfe",
  foreignKey:"IDprofesor",
  otherKey:"IDhorario",
});*/

// para cursa

db.alumno.belongsToMany(db.carrera,
  {through:"cursa",
  foreignKey:"NumCuenta",
  otherKey:"IDcarrera",
});

db.carrera.belongsToMany(db.alumno,
  {through:"cursa",
  foreignKey:"IDcarrera",
  otherKey:"NumCuenta",
});

//para iinscripcion materia
/*
db.cursa.belongsToMany(db.inscProfe,
  {through:"inscMateria",
  foreignKey:"NumCuenta",
  otherKey:"IDhorario",
});

db.inscProfe.belongsToMany(db.cursa,
  {through:"inscMateria",
  foreignKey:"IDhorario",
  otherKey:"NumCuenta",
});*/
/* este siiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
//calificaciones
db.calificaciones.belongsTo(db.cursa,
  {through:"cursa",
  foreignKey:"NumCuenta",
});
*/
//egresado

db.egresado.belongsToMany(db.alumno,
  {through:"egresado",
  foreignKey:"NumCuenta",
  otherKey:"NumCuenta",
});

db.egresado.belongsTo(db.planestudios,
  {through:"egresado",
  foreignKey:"PlanEstudios",
  otherKey:"PlanEstudios",
});
/*
//baja temporal
db.alumno.belongsToMany(db.carrera,
  {through:"bajatemporal",
  foreignKey:"NumCuenta",
  otherKey:"IDcarrera",
});

db.carrera.belongsToMany(db.alumno,
  {through:"bajatemporal",
  foreignKey:"IDcarrera",
  otherKey:"NumCuenta",
});*/


db.bajatemporal.belongsTo(db.planestudios,{
through:"planestudios",
foreignKey:"PlanEstudios",
otherKey:"PlanEstudios"
});

db.bajatemporal.belongsTo(db.alumno,{
through:"alumno",
foreignKey:"NumCuenta",
otherKey:"NumCuenta"

});

//segunda carrera

db.alumno.belongsToMany(db.planestudios,
  {through:"segcarrera",
  foreignKey:"NumCuenta",
  otherKey:"PlanEstudios",
});

db.planestudios.belongsToMany(db.alumno,
  {through:"segcarrera",
  foreignKey:"PlanEstudios",
  otherKey:"NumCuenta",
});

//examenextra
/*
db.cursa.belongsToMany(db.materia,
  {through:"examenExtra",
  foreignKey:"NumCuenta",
  otherKey:"IDmateria",
});

db.materia.belongsToMany(db.profesor,
  {through:"examenExtra",
  foreignKey:"IDmateria",
  otherKey:"NumCuenta",
});
*/

///PlANTEL A CARRERA

db.carrera.belongsTo(db.plantel,
  {through:"carrera",
  foreignKey:"IDplantel",
  otherKey:"IDplantel",
});



db.planestudios.belongsTo(db.carrera,
  {
    through:"carrera",
    foreignKey:"IDcarrera", 
    otherKey:"IDcarrera"
  });


  //Historial recibe de alumno NumCuenta
db.historialacademico.belongsTo(db.alumno,{
through:"alumno",
foreignKey:"NumCuenta",
otherKey:"NumCuenta"
});



db.ROLES = ["user", "admin", "moderator"];




module.exports = db;