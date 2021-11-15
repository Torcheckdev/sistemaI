module.exports = (sequelize, Sequelize) => {
    const examenExtra = sequelize.define("examenExtra", {
      NumCuenta: {
        type: Sequelize.INTEGER,
        primaryKey: true 
      },
      tipoExamen: {
        type: Sequelize.STRING
      },
      folioEx: {
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
  
    return examenExtra;
  };