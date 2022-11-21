require("dotenv").config();
require("./config/database").connect();
// importing user context
const User = require('./model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');  
const express = require("express");
const user = require("./model/user");
const auth = require("./middleware/auth");
const app = express();

// to use json data in express app. through use of postman and get in this app, we needs to get permission from express app.
app.use(express.json());

//Register 
app.post("/register", async (req, res) => {
          //our register logic start here
          try {
                    //get user input
                    const { first_name, last_name, email, password } = (req.body);
                    console.log(req.body);

                    //validate user input
                    if (!(first_name && last_name && email && password)) {
                              res.status(400).send("All input is required.");
                    };
                    // check if user already exist
                    // Validate if user exist in our database
                    const oldUser = await User.findOne({ email });

                    if (oldUser) {
                              return res.status(409).send("User is already exist, Please login again with different user");
                    };
                    //encypt the password.
                    encryptedPassword = await bcrypt.hash(password, 10);

                    /*
                    // Create token
                    const token = jwt.sign(
                              { id: first_name },
                              process.env.TOKEN_KEY,
                              { expiresIn: "5 minutes" }
                    );*/
                    //Create user in database
                    const user = await User.create({

                              first_name,
                              last_name,
                              email: email,
                              password: encryptedPassword,
                    });
                    /*
                    //save user token
                    user.token = token;
                    */

                    // save and return new user
                    const registered = await user.save();
                    res.status(201).json(registered);
          }
          catch (err) {
                    console.log(err);
          }
          //our register logic ends here
});

// Login
app.post("/login", async (req, res) => {
          //our login logic start here
          try {
                    //get user input
                    const { email, password } = req.body;


                    //validate user input
                    if (!(email && password)) {
                              res.status(400).send("All input is required.");
                    };
                    // Validate if user exist in our database
                    const user = await User.findOne({ email: email });
                    
                    if (user && (await bcrypt.compare(password, user.password))) {

                              // Create token
                              const token = jwt.sign(
                                        { user_id: user._id, email },
                                        process.env.TOKEN_KEY,
                                        { expiresIn: "5 minutes" }
                              );
                              // save user token
                              user.token = token;

                              //User
                              res.status(200).json(user);
                              // res.status(200).send("User Signin successfully");
                    }
                    else {
                              res.status(400).send("Invalid credentials pass");
                    };
          } catch (err) {
                    console.log(err);
          }
          // our login logic ends here
});

app.post("/welcome", auth, (req, res) => {
                              res.status(200).send("Welcome 🙌 ");
                    });
// This should be the last route else any after it won't work
app.use("*", (req, res) => {
          res.status(404).json({
            success: "false",
            message: "Page not found",
            error: {
              statusCode: 404,
              message: "You reached a route that is not defined on this server",
            },

            
          });
});

module.exports = app;