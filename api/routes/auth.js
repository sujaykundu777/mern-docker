import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
const router = express.Router();
const secret = require('../config/main').secret;

/**
 * @api {post} /register User Registration
 * @apiParam {string} name Name of the user 
 * @apiParam {string} gender Gender of the user 
 * @apiParam {string} email Email of the user 
 * @apiParam {string} password Password of the user
 * @apiParam {string} role Role of the user [User, Admin]
 * @apiSuccess {Object} 
 * @apiError {String} Error 
 */
router.post('/register', (req, res, next) => {
    try {

      const newUser = new User({
        name: req.body.name,
        gender: req.body.gender,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
       });
       
       newUser.save((err, result) => {
            if(err){
                const response = {
                    'success': false,
                    'message': 'Failed to Register ! Error: + ' + err,
                }
                res.status(201).send(response);
            }
            const response = {
               'success': true,
               'message': 'Registration Successfull',
            }
            res.status(201).send(response)
        });
    }
    catch (err) {
        throw (err);
    }
  });


  /** 
   * @api {post} /authenticate User Signin - Authentication
   * @apiParam {string} email Email 
   * @apiParam {string} password Password 
   * 
   */
  router.post('/authenticate', (req, res) => {
    try{
        User.findOne({"email": req.body.email}, (err, user) => {
            if(err){
                throw err;
            }
            if(!user){
                const response = {
                   'success': false,
                   'message': 'Authentication Failed !'
                }
                res.status(201).send(response);
            }else{
                
                // check if password matches 
                user.comparePassword(req.body.password, (err, isMatch) => {
                    if(isMatch && !err){
                        // create token if the password matched and no error was thrown
                        let payload = {
                            user_id: user._id,
                            email : user.email,
                            name: user.name,
                            role: user.role
                        };
           
                        let token = jwt.sign(payload, secret, {
                            expiresIn: 10080 // in seconds
                        });

                        //check user roles
                        let isAdmin;
                        // if user is guest or user set isAdmin false
                        if(user.role == '1' || user.role == '2'){
                            isAdmin = false;
                        }
                        // if user is admin set to true
                        else if(user.role == '4'){
                        isAdmin = true
                        }
                        else{
                            isAdmin = false
                        }

                        let response = {
                            'success': true,
                            'message': 'Authentication Successful',
                            'token': 'JWT ' + token,
                            'isAdmin': isAdmin
                        } 
                        res.status(201).send(response)
                    }
                    else{
                        let response = {
                            'success': false,
                            'message': 'Authentication Failed'
                        }
                        res.status(201).send(response)
                    }
                })
            }
        });
    }catch(error){
        throw error;
    }
  });

  export default router;