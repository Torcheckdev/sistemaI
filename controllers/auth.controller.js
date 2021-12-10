const db = require("../models");
const config = require("../config/auth.config");
const User = db.usuario;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    Email: req.body.Email,
    Pword: bcrypt.hashSync(req.body.Pword, 8)
  })
  .then(user => {
    if (req.body.roles) {
      Role.findAll({
        where: {
          Nombre: {
            [Op.or]: req.body.roles
          }
        }
      }).then(roles => {
        user.setRoles(roles).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      });
    }  else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      Email: req.body.Email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.Pword,
        user.Pword
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ Email: user.Email }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].Nombre.toUpperCase());
        }  
        
        res.cookie('x-access-token' , token ,{ withCredentials:true,httpOnly: true });

        res.status(200).send({
          Email: user.Email,
          roles: authorities,
          accessToken: token
        });

        

      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};