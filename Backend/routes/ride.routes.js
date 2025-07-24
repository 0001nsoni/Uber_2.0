import { Router } from "express";
import express  from 'express';
import {body} from 'express-validator';
import { createRides } from "../controllers/ride.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";


const router=Router();

router.post('/create',authUser,
    body('pickup').isString().isLength({min:3}).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({min:3}).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn(['auto','car','moto']).withMessage("Invalid ride type"),
    createRides
)
export default router;