const jwt = require('jsonwebtoken');

class AuthJwt {
    async authJwt(req, res, next) {
        try {
            const token = req.body.token || req.query.token || req.headers['x-access-token'];
            if(!token) {
                return res.status(400).send({
                    message: 'Token Is Required!'
                })
            }else {
                jwt.verify(token, 'M3S3CR3TK3Y', (err, data) => {
                    if(!err) {
                        req.user = data;
                        return next();
                    }else {
                        console.log(err);
                        return res.status(400).send({
                            message: 'Token Is Invalid Or Expired!'
                        })
                    }
                })
            }
        }catch(err) {
            throw err;
        }
    }
}


module.exports = new AuthJwt();