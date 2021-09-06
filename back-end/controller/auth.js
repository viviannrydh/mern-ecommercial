
const User = require('../models/user');
const jwt=require('jsonwebtoken')

module.exports.register = (req, res) => { 
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user)
      return res.status(400).json({
        message: "User already registered",
      });
    const { firstName, lastName, username, email, password } = req.body;
    const newUser = new User({
      firstName,
      lastName,
      username: Math.random().toString(),
      email,
      password,
    });
    newUser.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "something went wrong",
        });
      }
      if (data) {
        return res.status(201).json({
          data,
          message: "User created successfully",
        });
      }
    });
  });

}

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email })
    .exec((error, user) => {
    if (error) return res.status(400).json({ error });
      if (user) {
        if (user.authenticate(req.body.password)) { 
          const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );
     // const isPassword = await user.authenticate(req.body.password);
      //if (isPassword && user.role === "user") {
        // 
        // );
        const {_id,firstName, lastName, email, role, fullName } = user;
        res.status(200).json({
          token,
          user: {_id, firstName, lastName, email, role, fullName }
        });
      } else {
        return res.status(400).json({
          message: "Invalid Password",
        });
      }
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  });
};