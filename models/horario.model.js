module.exports = (sequelize, Sequelize) => {
    const horario = sequelize.define("horario" ,{
        IDhorario: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        Horario: {
            type: Sequelize.STRING
        },
        Turno: {
            type: Sequelize.STRING
        },

        });
        return horario;
};