module.exports = (sequelize, Sequelize) => {
    const usuario = sequelize.define("usuario", {
      Email: {
        type: Sequelize.STRING,
        primaryKey: true
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