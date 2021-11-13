module.exports = (sequelize, Sequelize) => {
    const calificaciones = sequelize.define("calificaciones", {
      NumCuenta: {
        type: Sequelize.INTEGER,
        primaryKey: true 
      },
      CalificacionTotal: {
        type: Sequelize.INTEGER
      },
      CreditosTotales: {
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

  };