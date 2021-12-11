module.exports = (sequelize, Sequelize) => {
    const extensionCreditos = sequelize.define("extensionCreditos", {
     NumCuenta: {
        type: Sequelize.INTEGER,
        primaryKey: true 
         },
     Creditos: {
        type: Sequelize.STRING
        },
     Periodo: {
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
  
    return extensionCreditos;
  };