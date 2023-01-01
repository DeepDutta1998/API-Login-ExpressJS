const router = require('express').Router();
const logRegController = require('../controllers/logReg.controller');
const authJwt = require('../middlewares/authJwt')

router.get('/', logRegController.welcomeMessage);
router.post('/registration', logRegController.registration);
router.post('/login', logRegController.login);
router.get('/my-secure-page', authJwt.authJwt, logRegController.mySecurePage)

module.exports = router;