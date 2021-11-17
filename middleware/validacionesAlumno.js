const db = require("../models");

validaCupo= (req,res,next) => {
  
    var arrayMaterias=req.body
    var arraylength=arrayMaterias.length
     console.log(arraylength)
  for(var i=0; i<arraylength; i++){
    console.log(arrayMaterias[i]['folioAsig'])
  
    db.sequelize.query('select  folioAsig,Cupo,Inscritos from inscAsignatura where folioAsig="'+arrayMaterias[i]['folioAsig']+'"', { raw: true })
    .then(data => {
  console.log(data[0][0])
  

  if(data[0][0]['Cupo'] == data[0][0]['Inscritos']){
    console.log("NO hay cupo")
    res.status(403).send({
      message: "NO hay cupo para la materia : "+data[0][0]['folioAsig']
    })
    }
  
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algun error ocurrio validaCupo"
      })
  }
    )
  
}
next();

return;

}




const validacionesAlumno = {
    validaCupo: validaCupo
  }
  
module.exports = validacionesAlumno;
  