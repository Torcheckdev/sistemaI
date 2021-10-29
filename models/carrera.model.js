module.exports = (sequelize, Sequelize) => {
    const carrera = sequelize.define("carrera", {
      IDcarrera: {
        type: Sequelize.INTEGER,
        primaryKey: true 
      },
      Nombre: {
        type: Sequelize.STRING
      },
      Area: {
        type: Sequelize.INTEGER
      },
 
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt:{
        type: Sequelize.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')

      }
    });
  
    return carrera;
  };