module.exports = (sequelize, Sequelize) => {
    const inscProfeExtra = sequelize.define("inscProfeExtra", {

      IDpmEx: {
        type: Sequelize.STRING,
        primaryKey: true 
      },
      IDmateria: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      IDprofesor: {
        type: Sequelize.INTEGER,
	primaryKey: true
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
  
    return inscProfeExtra;
  };