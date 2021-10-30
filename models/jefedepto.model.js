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

    //agregar foreignkey a estos dos ID con profesor y carrera
});
return jefedepto;
};