const db = require("../models");
const alumno= db.alumno;
const {Op} = require("sequelize");
const { cursa } = require("../models");

exports.getdatosAlumno=(req,res) => {
    alumno.findAll({ 
        where:{
            Email:req.body.Email
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
  
  var NumCuenta = req.body.NumCuenta;
   alumno.sequelize.query('SELECT c1.PlanEstudios,m2.* FROM cursa c1 INNER JOIN materia m2 ON c1.NumCuenta="'+NumCuenta+'" && m2.PlanEstudios = c1.PlanEstudios', { raw: true }).then(data => {
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


 exports.consultaSaturacion=(req,res) => {
  
  var NumCuenta = req.body.NumCuenta;
   alumno.sequelize.query('SELECT c1.PlanEstudios,m2.* FROM cursa c1 INNER JOIN materia m2 ON c1.NumCuenta="'+NumCuenta+'" && m2.PlanEstudios = c1.PlanEstudios', { raw: true }).then(data => {
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