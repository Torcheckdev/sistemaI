module.exports = (sequelize, Sequelize) => {
    const inscritos = sequelize.define("inscritos", {
        NumCuenta: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        folioAsing: {
            type: Sequelize.INTEGER
        },  
        PlanEstudios: {
            type: Sequelize.STRING
        },
    });
return inscritos;
  };