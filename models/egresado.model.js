module.exports = (sequelize, Sequelize) => {
  const egresado = sequelize.define("egresado", {
    NumCuenta: {
      type: Sequelize.INTEGER,
      primaryKey: true 
    },
    PlanEstudios: {
      type: Sequelize.STRING
    },
    AnioInscripcion: {
      type: Sequelize.STRING
    },
    AnioTermino: {
      type: Sequelize.STRING
    },
    Modalidad: {
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

  return egresado;
};