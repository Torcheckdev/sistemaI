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
    Usuario: req.body.usuario,
    Email: req.body.email,
    Pword: bcrypt.hashSync(req.body.pword, 8)
  })
  .then(user => {
    if (req.body.roles) {
      Role.findAll({
        where: {
          name: {
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
      Usuario: req.body.usuario
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.pword,
        user.Pword
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].Nombre.toUpperCase());
        }  
        
        res.cookie('x-access-token' , token ,{ withCredentials:true,httpOnly: true });

        res.status(200).send({
          Id: user.Id,
          Usuario: user.Usuario,
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