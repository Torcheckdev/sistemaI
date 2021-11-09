module.exports = (sequelize, Sequelize) => {
    const segcarrera = sequelize.define("segcarrera", {
      NumCuenta: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
        IDcarrera: {
        type: Sequelize.INTEGER,
        primaryKey: true 
      },
      AnioInsc: {
        type: Sequelize.STRING
      },
      Modalidad: {
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
  // foreign key numcuenta, IDcarrera, en cursa, carrera (numcuenta,Idcarrera)
    return segcarrera;
  };