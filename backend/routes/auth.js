// const express = require("express");
// const router = express.Router();
// const User = require("../models/Users"); 
// const bcrypt = require('bcryptjs')

// router.post("/createuser", async (req, res) => {
//   try {
//     const newUser = new User(req.body);
//     await newUser.save();
//     res.status(201).json(newUser);
//   } catch (error) {
//     if (error.name === "ValidationError") {
//       // Handle validation error
//       const validationErrors = [];
//       for (const field in error.errors) {
//         validationErrors.push(error.errors[field].message);
//       }
//       res.status(400).json({ errors: validationErrors });
//     } else {
//       // Handle other errors
//       res.status(500).json({ error: "An error occurred." });
//     }
//   }
// });

// module.exports = router;


const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const cors = require('cors');

const app = express();
app.use(cors());

// ROUTE 1: Authenticate a user using : POST "/api/auth/createuser". no login required
router.post('/createuser',
  [
    body('name').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }) // Add password validation as needed
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
        // creating a new user
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: secPass
      });
      await newUser.save();
      
      const data = {
        user: {
          id: newUser.id
        }
      }
      const authtoken = jwt.sign(data, 'shhhhh'); 
      success = true;
        res.status(201).json({ success, token: authtoken });

        // catching and displaying the error if occured
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error." });
    }
  }
);

// ROUTE 2: Authenticate a user using : POST "/api/auth/login". no login required
router.post('/login',
  [
    body('email', 'Enter a valid email').isEmail()
  ], async (req, res)=>{
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email, password} = req.body;
    try {
      let user = await User.findOne({email})
      if(!user){
        return res.status(400).json({error: 'Please try to login with correct credentials'})
      }
      const passwordCompare = await bcrypt.compare(password, user.password)
      if(!passwordCompare){
        success = false;
        return res.status(400).json({success, error: 'Please try to login with correct credentials'})
      }
      const data = {
        user: {
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, 'shhhhh');
      success = true;
      res.json({success, authtoken})
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error." });
    }

  })

  // ROUTE 3: Get loggedin user details using : POST "/api/auth/getuser". Login required
  router.post('/getuser', fetchuser, async (req, res)=>{
try {
  userId = req.user.id;
  const user = await User.findById(userId).select("-password")
  res.send(user);
} catch (error) {
  console.error(error);
  res.status(500).json({ error: "Internal server error." });
}
  })

  module.exports = router;
