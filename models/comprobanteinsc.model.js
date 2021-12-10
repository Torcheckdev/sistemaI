module.exports = (sequelize, Sequelize) => {
    const comprobanteinsc = sequelize.define("comprobanteinsc", {
        IDcomprobante: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      NumCuenta: {
        type: Sequelize.INTEGER
      },
      Periodo: {
        type: Sequelize.STRING
      },
      Fecha: {
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
  
    return comprobanteinsc;
  };