import express from 'express';
const router = express.Router();

import User from '../models/user';

/* GET All Users */
router.get('/', (req, res, next) => {
    try{
        User.find({}).exec((err, result) => {
            if(err) {
                res.status(404).send("No Users Found" + err);
            }
            const response = {
                'result': result
            }
            res.status(200).send(response);
        })
    }catch(err){
        throw(err);
    }
});

/* Get a Single User */
router.get('/', (req, res, next) => {
    try{
        const user = {
            _id: req.query.user_id
        }
        User.findById({_id: user._id}, (err, result) => {
            if(err){
                res.status(404).send("User Not Found" + err);
            }
            const response = {
                'result': result
            }
            res.status(200).send(response);
        })
    }catch(err){
        throw (err);
    }
});


/* Add a New User */
router.post('/', (req, res, next) => {
    try {

          // create a song object
      const user = new User({
        name: req.body.name,
        gender: req.body.gender,
        email: req.body.email
       });

        user.save((err, result) => {
            if(err){
                res.status(404).send(err)
            }
            
            const response = {
               'success': true,
               'message': 'User Added Successfully',
               'result': result
            }
            res.status(201).send(response)
        });
    }
    catch (err) {
        throw (err);
    }
  });


  
/* Edit a User */
router.put('/', (req, res, next) => {
    try{
        let user = {
            _id: req.query.user_id,
            name: req.body.name,
            gender: req.body.gender,
            email: req.body.email
        }
        User.findOneAndUpdate({"_id": user._id}, user, (err, result) => {
            if(err){
                res.status(404).send("User Could Not Be Updated" + err);
            }
            const response = {
                'success': true,
                'message': 'User Updated Successfully'
            }
            res.status(200).send(response);
        })
    }catch(err){
        throw (err);
    }
});

/* Delete a User */
router.delete('/', (req, res, next) => {
    try{
        const user = {
            _id : req.query.user_id
        }
        User.findOneAndDelete({"_id": user._id}, (err, result) => {
            if(err){
                res.status(404).send("User Could Not Be Deleted" + err);
            }
            const response = {
                'Success': true,
                'Message': 'User Deleted Successfully'
            }
            res.status(200).send(response);
        })
    }catch(err){
        throw (err);
    }
});

export default router;