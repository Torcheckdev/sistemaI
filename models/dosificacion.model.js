module.exports = (sequelize, Sequelize) => {
    const dosificacion = sequelize.define("dosificacion", {
      NumCuenta: {
        type: Sequelize.INTEGER,
        primaryKey: true 
      },
      IDcarrera: {
        type: Sequelize.INTEGER
      },   Ncarrera: {
        type: Sequelize.STRING
      },
      PlanEstudios: {
        type: Sequelize.STRING
      },
      Periodo: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      Fecha: {
          type: Sequelize.STRING
      },
      NumTurno: {
          type: Sequelize.INTEGER
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
return dosificacion;
  };

  