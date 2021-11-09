module.exports = (sequelize, Sequelize) => {
    const inscProfe = sequelize.define("inscProfe",{
        Grupo: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        IDmateria: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        IDprofesor: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        IDhorario: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        Periodo: {
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
//foreing key IDmateria,IDprofesor,IDhoraro, en materia, profesor, horario(IDmateria,IDprofesor,IDhorario)

        });
        return inscProfe;
};