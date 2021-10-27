module.exports = {
  HOST: process.env.HOSTDB,
  USER: process.env.USERDB,
  PASSWORD: process.env.PWORDDB,
    DB: "sistemainscripciones",
    dialect: "mysql",
    PORT: "3306" ,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };