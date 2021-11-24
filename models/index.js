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

module.exports = Sequelize;
module.exports=sequelize;

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
db.inscritos = require ("../models/inscritos.model.js")(sequelize,Sequelize);
db.cursa = require ("../models/cursa.model.js")(sequelize,Sequelize);
db.examenExtra = require ("../models/examenExtra.model.js")(sequelize,Sequelize);
db.historialacademico = require ("../models/historialacademico.model.js")(sequelize,Sequelize);
db.calificaciones = require ("../models/calificaciones.model.js")(sequelize,Sequelize);
db.dosificacion = require ("../models/dosificacion.model.js")(sequelize,Sequelize);
db.egresado = require ("../models/egresado.model.js")(sequelize,Sequelize);
db.bajatemporal = require ("../models/bajatemporal.model.js")(sequelize,Sequelize);
db.bajadefinitiva = require ("../models/bajadefinitiva.model.js")(sequelize,Sequelize);
db.segcarrera = require ("../models/segcarrera.model.js")(sequelize,Sequelize);
db.comprobanteinsc = require ("../models/comprobanteinsc.model.js")(sequelize,Sequelize);
db.comprobantematerias = require ("../models/comprobantematerias.model.js")(sequelize,Sequelize);


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
  foreignKey: "IDdepartamento",
  otherKey:"IDdepartamento"
});


//planestudios


/*en materia se hereda el IDcarrera de PlanEstudios
db.materia.belongsToMany(db.carrera,
  {through: "carrera",
  foreignKey: "IDcarrera",
  otherKey:"IDcarrera",
});*/




//para jededepartamento
db.departamento.belongsToMany(db.profesor,
  {through:"jefedepto",
  foreignKey:"IDdepartamento",
  otherKey:"IDprofesor",
});

db.profesor.belongsToMany(db.departamento,
  {through:"jefedepto",
  foreignKey:"IDprofesor",
  otherKey:"IDdepartamento",
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

db.cursa.belongsToMany(db.alumno,
  {through:"cursa",
  foreignKey:"NumCuenta",
  otherKey:"NumCuenta",
});
/*
db.carrera.belongsToMany(db.alumno,
  {through:"cursa",
  foreignKey:"IDcarrera",
  otherKey:"NumCuenta",
});*/

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

//Relacion inscasignatura IDpm con InscProfe

db.inscAsignatura.belongsTo(db.inscProfe,{
through:"inscProfe",
foreignKey:"IDpm",
otherKey:"IDpm"
})
//Relacion inscAsignaturaExtra IDpmEx con inscProfeExtra


db.inscAsignaturaExtra.belongsTo(db.inscProfeExtra,{
  through:"inscProfeExtra",
  foreignKey:"IDpmEx",
  otherKey:"IDpmEx"
})
//Relacion horario IDhorario con insASignatura

db.inscAsignatura.belongsTo(db.horario,{
  through:"horario",
  foreignKey:"IDhorario",
  otherKey:"IDhorario"
})


//Relacion insMateria con inscAsignatura 
db.inscMateria.belongsTo(db.inscAsignatura,{
through:"inscAsignatura",
foreignKey:"folioAsig",
otherKey:"folioAsig"

})


//Relacion horarioExtra IDhorarioEx con inscAsignaturaExtra

db.inscAsignaturaExtra.belongsTo(db.horarioExtra,{
  through:"horarioExtra",
  foreignKey:"IDhorarioEx",
  otherKey:"IDhorarioEx"

})

//Relacion inscProfeExtra  IDmateria con materia 
db.inscProfeExtra.belongsTo(db.materia,{
  through:"materia",
  foreignKey:"IDmateria",
  otherKey:"IDmateria"
})

//Relacion inscProfeExtra  IDprofesor con profesor 
db.inscProfeExtra.belongsTo(db.profesor,{
  through:"profesor",
  foreignKey:"IDprofesor",
  otherKey:"IDprofesor"
})

//Relacion calificaciones NumCuenta con Alumno
db.calificaciones.belongsTo(db.alumno,{
through:"alumno",
foreignKey:"NumCuenta",
otherKey:"NumCuenta"
})

//Relacion 
db.examenExtra.belongsTo(db.inscAsignaturaExtra,{
  through:"insAsignaturaExtra",
  foreignKey:"folioEx",
  otherKey:"folioEx"

})

db.examenExtra.belongsTo(db.alumno,{
through:"alumno",
foreignKey:"NumCuenta",
otherKey:"NumCuenta"
})

db.historialacademico.belongsTo(db.materia,{
  through:"materia",
  foreignKey:"IDmateria",
  otherKey:"IDmateria" 
})

db.inscMateria.belongsTo(db.materia,{
  through:"materia",
  foreignKey:"IDmateria",
  otherKey:"IDmateria" 
})
db.dosificacion.belongsTo(db.alumno,{
through:"alumno",
foreignKey:"NumCuenta",
otherKey:"NumCuenta"
})
db.dosificacion.belongsTo(db.carrera,{
  through:"carrera",
  foreignKey:"IDcarrera",
  otherKey:"IDcarrera"
  })

  db.dosificacion.belongsTo(db.planestudios,{
    through:"planestudios",
    foreignKey:"PlanEstudios",
    otherKey:"PlanEstudios"
    })


    db.comprobantematerias.belongsTo(db.comprobanteinsc,{
      through:"comprobanteinsc",
      foreignKey:"IDcomprobante",
      otherKey:"IDcomprobante"
      })
  


db.ROLES = ["user", "admin", "moderator"];




module.exports = db;