const { authJwt} = require("../middleware");
const { validacionesAlumno } = require("../middleware");

const controller = require("../controllers/admin.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.HOST); 
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type");
    next();
  });


 
  app.post(
    "/api/admin/generardosificacion",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.generaDosificacion
  );

  app.get("/api/admin/listaMateriaProf",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.listaMateriaProf);

app.post("/api/admin/inscProfesor",
[authJwt.verifyToken, authJwt.isAdmin],
controller.inscProf);


app.get("/api/admin/listainscAsignatura",
[authJwt.verifyToken, authJwt.isAdmin]
,controller.listainscAsignatura);

app.post("/api/admin/inscAsignatura",
[authJwt.verifyToken, authJwt.isAdmin],
controller.inscAsignatura);

app.get("/api/admin/listamodinscAsignatura",
[authJwt.verifyToken, authJwt.isAdmin],
controller.listamodinscAsignatura);

app.post("/api/admin/modinscAsignatura",[
  authJwt.verifyToken, authJwt.isAdmin],
controller.modinscAsignatura);


app.post("/api/admin/borrarinscAsignatura",
[authJwt.verifyToken, authJwt.isAdmin],
controller.borrarinscAsignatura);


app.post("/api/admin/extensionCreditos",
[authJwt.verifyToken, authJwt.isAdmin],
controller.extensionCreditos);



app.post("/api/admin/cescolarNMPeriodo",
[authJwt.verifyToken, authJwt.isAdmin],
controller.cescolarregPeriodo);


app.post("/api/admin/seleccionarPeriodoencurso",
[authJwt.verifyToken, authJwt.isAdmin],
controller.setperiodoencurso);





  };