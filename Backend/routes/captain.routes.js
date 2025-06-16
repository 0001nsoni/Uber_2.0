import express from 'express';
import { Router } from 'express';
import {body} from 'express-validator';
import { registerCaptain } from '../controllers/captain.controller.js';
const router = express.Router();
router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 char long'),
    body('password').isLength({min:3}).withMessage('password must contain 3 char'),
    body('vehicle.color').isLength({min:3}).withMessage('Color should be 3 char long'),
    body('vehicle.plate').isLength({min:3}).withMessage('Plate must be at least 3 char long'),
    body('vehicle.capacity').isInt({min:1}).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage('Invalid vehicle type')

],
registerCaptain
)


export default router;