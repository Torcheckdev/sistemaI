module.exports = (sequelize, Sequelize) => {
    const materia = sequelize.define("materia", {
      IDmateria: {
        type: Sequelize.INTEGER,
        primaryKey: true 
      },
      Nombre: {
        type: Sequelize.STRING
      },
      Semestre: {
        type: Sequelize.INTEGER
      },
      Creditos:{
          type:Sequelize.INTEGER
      },
      Tipo: {
        type: Sequelize.STRING
      },
      IDcarrera:{
          type:Sequelize.INTEGER,
          primaryKey: true
      },
      PlanEstudios:{
        type: Sequelize.STRING,
        primaryKey: true
      },
      //foreing key IDcarrera references carrera(IDcarrera)
    });
  
    return materia;
  };