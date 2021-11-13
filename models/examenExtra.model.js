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
        type: Sequelize.STRING,
        primaryKey: true //hace referencia a la tabla de inscAsignaturaExtra
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