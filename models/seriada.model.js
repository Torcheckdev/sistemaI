module.exports = (sequelize, Sequelize) => {
    const seriada = sequelize.define("seriada", {
      IDmateria: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
        Nombre: {
        type: Sequelize.STRING
      },
      IDseriada: {
        type: Sequelize.INTEGER,
        primaryKey: true 
      },
      nombreSeriada: {
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
  
    return seriada;
  };