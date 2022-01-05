module.exports = {
  HOST: process.env.HOSTDB,
  USER: process.env.USERDB,
  PASSWORD:process.env.PWORDDB,
  socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
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