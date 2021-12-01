module.exports = (sequelize, Sequelize) => {
    const comprobantematerias = sequelize.define("comprobantematerias", {
        IDcomprobante: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
      folioAsig: {
        type: Sequelize.INTEGER,
        primaryKey: true
      
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
  
    return comprobantematerias;
  };