module.exports = (sequelize, Sequelize) => {
    const role = sequelize.define("role", {
      Id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      Nombre: {
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
  
    return role;
  };