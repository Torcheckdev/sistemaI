module.exports = (sequelize, Sequelize) => {
   const bajatemporal = sequelize.define("bajatemporal", {
    NumCuenta: {
       type: Sequelize.INTEGER,
       primaryKey: true 
        },
    PlanEstudios: {
       type: Sequelize.STRING
       },
    AnioInscripcion: {
        type: Sequelize.STRING
        },
    Modalidad: {
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
 
   return bajatemporal;
 };