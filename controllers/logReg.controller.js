const LogReg = require('../models/loginReg.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class LogRegController {
    /**
     * @Method welcomeMessage
     * @Description Welcome Message
    */
    async welcomeMessage(req, res) {
        try {
            return res.status(200).send({
                message: 'Welcome From Login Registration API'
            })
        }catch(err) {
            throw err;
        }
    }

    /**
     * @Method registration
     * @Description To Register Users
    */
    async registration(req, res) {
        try {
            req.body.name = req.body.name.trim();
            req.body.email = req.body.email.trim();
            req.body.password= req.body.password.trim();
            if(!(req.body.name && req.body.email && req.body.password)) {
                return res.status(400).send({
                    message: 'Fields Should Not Be Empty!'
                })
            }else {
                let isEmailExists = await LogReg.findOne({
                    email: req.body.email
                })
                if(isEmailExists){
                    return res.status(400).send({
                        message: 'Email Is Already Exists!'
                    })
                }else {
                    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
                    let saveData = await LogReg.create(req.body);
                    if(saveData && saveData._id) {
                        //token generate
                        const token = jwt.sign({
                            _id: saveData._id,
                            email: saveData.email
                        }, 'M3S3CR3TK3Y', {
                            expiresIn: '2h'
                        });
                        saveData = saveData.toObject();
                        saveData.token = token;
                        return res.status(200).send({
                            message: 'Registration Successfull!!!!',
                            data: saveData
                        })
                    }else {
                        return res.status(400).send({
                            message: 'Registration Not Successfull!!!!',
                            data: {}
                        })
                    }
                }
            }
        }catch(err) {
            throw err;
        }
    }
    /**
     * @Method login
     * @Description Login
    */
    async login(req, res) {
        try {
            req.body.email = req.body.email.trim();
            req.body.password= req.body.password.trim();
            if(!(req.body.email && req.body.password)) {
                return res.status(400).send({
                    message: 'Fields Should Not Be Empty!'
                })
            }else {
                let isUserExists = await LogReg.findOne({
                    email: req.body.email
                });
                if(!isUserExists) {
                    return res.status(400).send({
                        message: 'User Is Not Exists!'
                    })
                }else {
                    let hashPassword = isUserExists.password;
                    if(bcrypt.compareSync(req.body.password, hashPassword)){
                        //token generate
                        const token = jwt.sign({
                            _id: isUserExists._id,
                            email: isUserExists.email
                        }, 'M3S3CR3TK3Y', {
                            expiresIn: '2h'
                        });
                        isUserExists = isUserExists.toObject();
                        isUserExists.token = token;
                        return res.status(200).send({
                            message: 'Logged In Successfully!',
                            data: isUserExists
                        })
                    }else {
                        return res.status(400).send({
                            message: 'Password Is Not Matched!',
                            data: {}
                        })
                    }
                }
            }
        }catch(err) {
            throw err;
        }
    }

    /**
     * @Method mySecurePage
     * @Description My Secure Page
    */
    async mySecurePage(req, res) {
        try {
            return res.status(200).send({
                message: 'I am from Secure Page'
            })
        }catch(err) {
            throw err;
        }
    }
}


module.exports = new LogRegController();