module.exports = (sequelize, Sequelize) => {
    const inscProfe = sequelize.define("inscProfe",{
        IDpm: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true

        },
        IDmateria: {
            type: Sequelize.INTEGER
        },
        IDprofesor: {
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
        return inscProfe;
};