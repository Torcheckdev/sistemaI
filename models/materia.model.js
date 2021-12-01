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
      PlanEstudios:{
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt:{
        type: Sequelize.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      },
    });
  
    return materia;
  };