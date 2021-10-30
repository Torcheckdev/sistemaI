module.exports = (sequelize, Sequelize) => {
    const departamento = sequelize.define("departamento",{
        IDdepartamento: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        Nombre: {
            type: Sequelize.STRING
        },
        Carrera: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
//foreing key carrera, carrera(IDcarrera)

        });
        return departamento;
};