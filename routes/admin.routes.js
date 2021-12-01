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
  };