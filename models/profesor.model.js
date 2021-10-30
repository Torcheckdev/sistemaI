module.exports = (sequelize, Sequelize) => {
    const profesor = sequelize.define("profesor",{
        IDprofesor: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        Nombre: {
            type: Sequelize.STRING
        },

        Telefono: {
            type: Sequelize.STRING
        },

        Correo: {
            type: Sequelize.STRING

        },
        IDdepto: {
            type: Sequelize.INTEGER,
            primaryKey: true
                //poner un foreing key con IDdepto A depto(IDdepto)
        },

    });
    return profesor;
};