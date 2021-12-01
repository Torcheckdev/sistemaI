module.exports = (sequelize, Sequelize) => {
    const inscProfeExtra = sequelize.define("inscProfeExtra", {

      IDpmEx: {
        type: Sequelize.INTEGER,
        primaryKey: true 
      },
      IDmateria: {
        type: Sequelize.INTEGER
      },
      IDprofesor: {
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
  
    return inscProfeExtra;
  };