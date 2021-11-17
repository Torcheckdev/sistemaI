module.exports = (sequelize, Sequelize) => {
    const inscAsignatura = sequelize.define("inscAsignatura",{
        folioAsig: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        IDpm: {
            type: Sequelize.INTEGER
        },
        IDhorario: {
            type: Sequelize.INTEGER
        },
        Grupo:{
            type: Sequelize.STRING
  
          },
        Cupo: {
            type: Sequelize.INTEGER
        },
        Inscritos:{
            type: Sequelize.INTEGER,
            defaultValue: 0
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
        return inscAsignatura;
};