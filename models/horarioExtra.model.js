module.exports = (sequelize, Sequelize) => {
    const horarioExtra = sequelize.define("horarioExtra" ,{
   IDhorarioEx: {
            type: Sequelize.INTEGER,   
            primaryKey: true
        },
    Dia: {
            type: Sequelize.STRING
 	},
    Horario: {
            type: Sequelize.STRING
        },
    Turno: {
            type: Sequelize.STRING
        },
    periodo: {
            type: Sequelize.STRING
        },
    salon: {
            type: Sequelize.STRING
        },
    createdAt: {
            type: Sequelize.DATE,
            defaultValue: sequelize.literal            ('CURRENT_TIMESTAMP')
          },
    updatedAt:{
            type: Sequelize.DATE,
            defaultValue: sequelize.literal            ('CURRENT_TIMESTAMP')
          },
        });
     return horarioExtra;
};