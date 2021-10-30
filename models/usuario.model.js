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
    });

    return usuario;
  };