module.exports = (sequelize, Sequelize) => {
    const planestudios = sequelize.define("planestudios",{
        IDcarrera: {
            type: Sequelize.INTEGER,
            primarykey: true
        },
        PlanEstudios: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        Descripcion: {
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
        //foreign key IDcarrera reference carrera(IDcarrera)
    });
return planestudios;
};