module.exports = (sequelize, Sequelize) => {
const jefedepto = sequelize.define("jefedepto",{
    IDdepto: {
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

    //agregar foreignkey a estos dos ID con profesor y carrera
});
return jefedepto;
};