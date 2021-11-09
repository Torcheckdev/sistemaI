module.exports = (sequelize, Sequelize) => {
    const examenextra = sequelize.define("examenextra", {
      NumCuenta: {
        type: Sequelize.INTEGER,
        primaryKey: true 
      },
      IDmateria: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      Fecha: {
        type: Sequelize.DATE
      },
      IDprofesor: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      TipoExamen: {
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
//foreign key numcuenta,IDmateria,IDprofesor, en cursam , materia,profesor(IDprofesor,numcuenta,IDmateria)
    });
  
    return examenextra;
  };