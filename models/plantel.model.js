module.exports = (sequelize, Sequelize) => {
    const plantel = sequelize.define("plantel", {
      IDplantel: {
        type: Sequelize.INTEGER,
        primaryKey: true 
      },
      Nombre: {
        type: Sequelize.STRING
      },
      Direccion: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: sequelize.literal	('CURRENT_TIMESTAMP')
      },
      updatedAt:{
        type: Sequelize.DATE,
        defaultValue: sequelize.literal	('CURRENT_TIMESTAMP')
      },
      
    });
  
    return plantel;
  };