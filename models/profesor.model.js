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

        Email: {
            type: Sequelize.STRING

        },
        IDdepartamento: {
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
    return profesor;
};