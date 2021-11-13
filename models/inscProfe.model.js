module.exports = (sequelize, Sequelize) => {
    const inscProfe = sequelize.define("inscProfe",{
        IDpm: {
            type: Sequelize.INTEGER,
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
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
          },
          updatedAt:{
            type: Sequelize.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
          },

        });
        return inscProfe;
};