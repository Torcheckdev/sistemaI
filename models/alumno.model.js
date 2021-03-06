module.exports = (sequelize, Sequelize) => {
    const alumno = sequelize.define("alumno", {
      NumCuenta: {
        type: Sequelize.INTEGER,
        primaryKey: true 
      },
      Nombre: {
        type: Sequelize.STRING
      },
      Fechanac: {
        type: Sequelize.STRING
      },
      Domicilio: {
        type: Sequelize.STRING
      },
      Email: {
        type: Sequelize.STRING
      },
      Telefono: {
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
  
    return alumno;
  };