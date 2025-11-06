import express from 'express';
const router = express.Router();
import { userLogin, userRegister, userLogout, getUser,getStats } from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/auth.js';

//Destructuring body and validationResult
import { body } from 'express-validator';

router.post('/register', [
    //Validation using express-validator
    body('name', "Enter valid name (3-30 characters)").isLength({ min: 3, max: 30 }),
    body('mobile', "Enter valid 10-digit mobile number").isLength({ min: 10, max: 10 }).isNumeric(),
    body('email', "Enter valid email address").isEmail(),
    body('password', "Password must be at least 8 characters").isLength({ min: 8, max: 32 })
], userRegister);

router.post('/login', [
    //Validation using express-validator
    body('email', "Enter valid email address").isEmail(),
    body('password', "Password is required").notEmpty().isLength({ min: 8 })
], userLogin)

router.get('/getuser/:id', isAuthenticated , getUser);
router.get('/getStats/:id',getStats);
router.get('/logout', isAuthenticated, userLogout);

// It is necessary to export module
export default router;
