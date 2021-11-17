module.exports = (sequelize, Sequelize) => {
    const dosificacion = sequelize.define("dosificacion", {
      NumCuenta: {
        type: Sequelize.INTEGER,
        primaryKey: true 
      },
      Calificacion: {
        type: Sequelize.INTEGER
      },
      Creditos: {
        type: Sequelize.INTEGER
      },
      Turno: {
          type: Sequelize.INTEGER
      },
      Hora: {
          type: Sequelize.STRING
      },
      semestre: {
          type: Sequelize.STRING
      },
      Dia: {
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
return dosificacion;
  };