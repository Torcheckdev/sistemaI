module.exports = (sequelize, Sequelize) => {
    const planestudios = sequelize.define("planestudios",{
        PlanEstudios: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        IDcarrera: {
            type: Sequelize.INTEGER
        },
        Descripcion: {
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
return planestudios;
};