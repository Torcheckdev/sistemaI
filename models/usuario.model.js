module.exports = (sequelize, Sequelize) => {
    const usuario = sequelize.define("usuario", {
      Usuario: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      Email: {
        type: Sequelize.STRING
      },
      Pword: {
        type: Sequelize.STRING
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

    return usuario;
  };