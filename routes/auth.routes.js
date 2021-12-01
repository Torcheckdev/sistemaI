const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
 
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.HOST);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type");
    next();
  });
  
  app.post(
    "/api/auth/signup",
  [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

};