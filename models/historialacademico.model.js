module.exports = (sequelize, Sequelize) => {
    const historialacademico = sequelize.define("historialacademico",{
        NumCuenta: {  //esto hace referencia a cursa para tener los datos del alumno y carrera
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        folioAsig: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        Periodo: {
            type: Sequelize.STRING
        },
        Calificacion: {
            type: Sequelize.INTEGER
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

        });
        return historialacademico;
    };