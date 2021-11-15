module.exports = (sequelize, Sequelize) => {
    const departamento = sequelize.define("departamento",{
        IDdepartamento: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        Nombre: {
            type: Sequelize.STRING
        },
        IDcarrera: {
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
//foreing key carrera, carrera(IDcarrera)

        });
        return departamento;
};