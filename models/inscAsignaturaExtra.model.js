module.exports = (sequelize, Sequelize) => {
    const inscAsignaturaExtra = sequelize.define("inscAsignaturaExtra",{
        folioEx: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
	IDpmEX: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
//horarioExtra
        IDhorarioEx: {
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
        return inscAsignaturaExtra;
};