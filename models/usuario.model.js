module.exports = (sequelize, Sequelize) => {
    const usuario = sequelize.define("usuario", {
   
      Usuario: {
        type: Sequelize.STRING,
        primarykey: true,
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