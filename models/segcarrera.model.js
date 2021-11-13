module.exports = (sequelize, Sequelize) => {
  const segcarrera = sequelize.define("segcarrera", {
    NumCuenta: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
      PlanEstudios: {
      type: Sequelize.STRING
    },
    AnioInsc: {
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

  return segcarrera;
};