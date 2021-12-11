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
    controller.generaDosificacion
  );

  app.get("/api/admin/listaMateriaProf",
  controller.listaMateriaProf);

app.post("/api/admin/inscProfesor",
controller.inscProf);


app.get("/api/admin/listainscAsignatura"
,controller.listainscAsignatura);

app.post("/api/admin/inscAsignatura",
controller.inscAsignatura);

app.get("/api/admin/listamodinscAsignatura",
controller.listamodinscAsignatura);

app.post("/api/admin/modinscAsignatura",
controller.modinscAsignatura);


app.post("/api/admin/borrarinscAsignatura",
controller.borrarinscAsignatura);




  };