module.exports = (sequelize, Sequelize) => {
    const calificaciones = sequelize.define("calificaciones", {
      NumCuenta: {
        type: Sequelize.INTEGER,
        primaryKey: true 
      },
      Cobligatorios: {
        type: Sequelize.NUMERIC
      }, 
      Coptativos:{
        type: Sequelize.NUMERIC
      },
      Ctotales:{
        type: Sequelize.NUMERIC
      },
      Aordinario:
        {
        type:Sequelize.NUMERIC
        },
        Arecurse:
        {
        type:Sequelize.NUMERIC
        },
        Aextraordinario:{
          type:Sequelize.NUMERIC
          },
          Noaprobadas:{
            type:Sequelize.NUMERIC
            },
            Atotal:{
              type:Sequelize.NUMERIC
              },
              Promedio:{
                type:Sequelize.NUMERIC(10,2)
                },
                EficienciaAcademica:{
                  type:Sequelize.NUMERIC(10,2)
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
return calificaciones;
  };


