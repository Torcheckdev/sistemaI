module.exports = (sequelize, Sequelize) => {
    const inscMateria = sequelize.define("inscMateria",{
        NumCuenta: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        IDhorario: {
            type: Sequelize.INTEGER,
            primaryKey: true
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
//foreing key Numcuenta,grpo en inscprofe, cursa(numcuenta,grupo)
        });
        return inscMateria;
    };