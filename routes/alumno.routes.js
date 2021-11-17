const { authJwt} = require("../middleware");
const { validacionesAlumno } = require("../middleware");

const controller = require("../controllers/alumno.controller");
const controller1 = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.HOST); 
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type");
    next();
  });

  app.post(
    "/api/alumno",
    [authJwt.verifyToken],
    controller.getdatosAlumno
  );

  app.post(
    "/api/alumno/materias",
    [authJwt.verifyToken],
    controller.listaMaterias
  );



  app.post(
    "/api/alumno/saturacion",
    [authJwt.verifyToken],
    controller.consultaSaturacion
  );



  app.post(
    "/api/alumno/dosificacion",
    [authJwt.verifyToken],
    controller.getdatosAlumno
  );

  app.post(
    "/api/alumno/inscribirMateria",
    [validacionesAlumno.validaCupo],
controller.inscribirMateria    
    );


  
  
};