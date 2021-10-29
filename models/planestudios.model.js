module.exports = (sequelize, Sequelize) => {
    const planestudios = sequelize.define("planestudios",{
        IDcarrera: {
            type: Sequelize.INTEGER,
            primarikey: true
        },
        Pestudios: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        Descripcion: {
            type: Sequelize.STRING
        },
        //foreign key IDcarrera reference carrera(IDcarrera)


    });
return planestudios;
};