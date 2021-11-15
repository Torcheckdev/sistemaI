module.exports = (sequelize, Sequelize) => {
    const cursa = sequelize.define("cursa", {
      NumCuenta: {//referencia alumno
        type: Sequelize.INTEGER,
        primaryKey: true 
      },
      PlanEstudios: {
        type: Sequelize.STRING
      },
      AnioInscripcion: {
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
  //foreign key numcuenta, idcarrera en alumno, carrera(numcuenta,IDcarrera)
    return cursa;
  };