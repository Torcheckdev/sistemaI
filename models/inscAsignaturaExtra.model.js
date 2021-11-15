module.exports = (sequelize, Sequelize) => {
    const inscAsignaturaExtra = sequelize.define("inscAsignaturaExtra",{
        folioEx: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
	IDpmEx: {
            type: Sequelize.INTEGER
        },
//horarioExtra
        IDhorarioEx: {
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
        return inscAsignaturaExtra;
};