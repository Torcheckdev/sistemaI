module.exports = (sequelize, Sequelize) => {
    const calendarioEscolar = sequelize.define("calendarioEscolar", {
     Periodo: {
        type: Sequelize.STRING,
        primaryKey: true 
         },
     Fechainicio: {
        type: Sequelize.STRING
        },
     Fechatermino: {
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
  
    return calendarioEscolar;
  };