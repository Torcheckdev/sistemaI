module.exports = (sequelize, Sequelize) => {
    const comprobanteabmaterias = sequelize.define("comprobanteabmaterias", {
        IDcomprobante: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
      folioAsig: {
        type: Sequelize.INTEGER,
        primaryKey: true
      
      },
      Movimiento:{
        type: Sequelize.STRING,
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
  
    return comprobanteabmaterias;
  };