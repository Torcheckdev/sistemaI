module.exports = (sequelize, Sequelize) => {
    const inscAsignatura = sequelize.define("inscAsignatura",{
        folioAsig: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        IDpm: {
            type: Sequelize.INTEGER
        },
        IDhorario: {
            type: Sequelize.INTEGER
        },
        Cupo: {
            type: Sequelize.INTEGER
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
        return inscAsignatura;
};