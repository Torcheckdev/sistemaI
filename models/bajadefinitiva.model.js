module.exports = (sequelize, Sequelize) => {
    const bajadefinitiva = sequelize.define("bajadefinitiva", {
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
  //foreign key numcuenta, en cursa (numcuenta)
    return bajadefinitiva;
  };