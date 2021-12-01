module.exports = (sequelize, Sequelize) => {
    const inscMateria = sequelize.define("inscMateria",{
        NumCuenta: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        folioAsig: {//sirve como folio
            type: Sequelize.INTEGER,
            primaryKey: true

        },IDmateria:{
type:Sequelize.INTEGER
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
        return inscMateria;
    };