/*\
 * Team: Turboencabulator
 * Class: COMP 229
 * Group: 2
 * Section: 3
 * File: ./controllers/index.js
\*/

let express = require('express');

let crypto = require('crypto');

//Passport
let passport = require('passport');

//Email
var transporter = require('../config/transport');

//Create User Model Instance
let userModel = require('../models/user');
let User = userModel.User;


module.exports.displayHomePage = (req,res,next) => {
    //Find and list all the surveys
  res.render('/', {title: "Home", displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayLoginPage = (req, res, next) => {
  // check if user is already logged in
  if (!req.user) {
      res.render('auth/login', {
          title: "Login",
          message: req.flash('loginMessage'),
          displayName: req.user ? req.user.displayName : ''
      });
  } else {
      return res.redirect('/survey');
  }
}

module.exports.processLoginPage = (req, res, next) => {
  passport.authenticate('local',
  (err, user, info) => {
      // server err?
      if (err) {
          return next(err);
      }

      //is there a user login error?
      if (!user) {
          req.flash('loginMessage', 'Authentication Error');
          return res.redirect('/login');
      }
      req.login(user, (err) => {
        // server err?
        if (err) {
            return next(err);
        }
        return res.redirect('/survey');
      });
  })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
  if(!req.user) {
      res.render('auth/register', {
          title: 'Register',
          message: req.flash('registerMessage'),
          displayName: req.user ? req.user.displayName : ''
      });
  } else {
      return res.redirect('/survey');
  }
}

module.exports.processRegisterPage = (req, res, next) => {
  // instantiate a user object
  let newUser = new User({
      username: req.body.username,
      email: req.body.email,
      displayName: req.body.displayName
  });

  User.register(newUser, req.body.password, (err) => {
      if (err) {
          console.log("Error, Inserting New User");
          if (err.name == "UserExistsError") {
              req.flash (
                  'registerMessage',
                  'Registration Error: User Already Exists!'
              );
              console.log("Error: User Already Exists!");
          }
          return res.render('auth/register', {
              title: 'Register',
              message: req.flash('registerMessage'),
              displayName: req.user ? req.user.displayName : ''
          });
      } else {
          return passport.authenticate('local')(req, res, () => {
              res.redirect('/survey');
          })
      }
  });
}

module.exports.performLogout = (req, res, next) => {
  req.logout();
  res.redirect('/');
}

module.exports.displayForgotPassword = (req,res,next) =>{
    if(!req.user) {
        res.render('auth/forgot', {
            title: 'Forgot Password',
            message: req.flash('forgotMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    } else {
        return res.redirect('/');
    }
}


module.exports.procForgotPassword = (req,res,next) =>{
    let emailInput = req.body.email;

    User.findOne({ email: emailInput }, (err, user) => {
        if(err)
        {
            console.error(err);
            res.end(err);
        }

        if (typeof user === 'object') 
        {

            let resetCode = crypto.randomBytes(2).toString('hex');

            let updatedUser = new User({
                _id: user.id,
                username: user.username,
                email: user.email,
                displayName: user.displayName,
                created: user.created,
                update: Date.now(),
                resetToken: resetCode,
                resetExpiry: Date.now() + 3600000
            });

            User.updateOne({_id:user.id}, updatedUser, (err) => {
                if(err)
                {
                    console.error(err);
                    res.end(err);
                }
            });

            let subject = "Turboencabulator Forgot Password";

            let text = "Either you or someone else has requested a password rest!Reset Code:" + resetCode + "If you did not make this request please ignore this email!";

            var mailOptions = {
                from: "turboencabulatorsurvey@gmail.com",
                to: emailInput,
                subject: subject,
                text: text,
            };

            transporter.sendMail(mailOptions, function (err, info) {
                if (err) 
                {
                    console.log(err);
                } else 
                {
                    console.log("Email sent: " + info.response);
                }
            });
            return res.redirect('/reset');
        }
        else
        {
            req.flash('forgotMessage', 'Invalid Email');
            return res.redirect('/forgot');
        }
    });    
}

module.exports.displayPasswordReset = (req,res,next) => {
    if(!req.user) {
        res.render('auth/forgotreset', {
            title: 'Reset Password',
            message: req.flash('resetMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    } else {
        return res.redirect('/');
    }
}


module.exports.procPasswordReset = (req,res,next) => {
    let emailInput = req.body.email;
    let codeInput = req.body.code;
    let passwordInput = req.body.password;

    User.findOne({ email: emailInput, resetToken: codeInput }, (err, user) => {
        if(err)
        {
            console.error(err);
            res.end(err);
        }

        if (typeof user === 'object') 
        {
            
            let expiry = Date.parse(user.resetExpiry);
            if( expiry < Date.now())
            {
                req.flash('resetMessage', 'Reset Code Has Expired');
                return res.redirect('/reset');
            }

            user.setPassword(passwordInput, (err,user) => {
                if(err){
                    console.error(err);
                    res.end(err);
                } else {
                    user.save((err) => {
                        if (err){
                            console.error(err);
                            res.end(err);
                        }
                    });
                   console.log("the password changed for this "+user)
                }
            });



            return res.redirect('/');
        }
    });
}
