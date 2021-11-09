module.exports = (sequelize, Sequelize) => {
    const egresado = sequelize.define("egresado", {
      NumCuenta: {
        type: Sequelize.INTEGER,
        primaryKey: true 
      },
      IDcarrera: {
        type: Sequelize.INTEGER,
        primaryKey: true
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
    //foreign key a numcuenta, Idcarrera, en Alumno,carrera(numcuenta,idcarrera)
    });
  
    return egresado;
  };