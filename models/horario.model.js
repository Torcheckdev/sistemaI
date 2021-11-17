module.exports = (sequelize, Sequelize) => {
    const horario = sequelize.define("horario" ,{
   IDhorario: {
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
    Semestre: {
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
     return horario;
};