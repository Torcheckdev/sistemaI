const db = require("../models");
const alumno= db.alumno;
const {Op} = require("sequelize");


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


exports.listaMaterias=(req,res) => {
  
  
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