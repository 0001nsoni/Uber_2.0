import { Router } from "express";
import express  from 'express';
import {body, query} from 'express-validator';
import { createRides, getFaree } from "../controllers/ride.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
import { getFare } from "../services/ride.service.js";


const router=Router();

router.post('/create',authUser,
    body('pickup').isString().isLength({min:3}).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({min:3}).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn(['auto','car','moto']).withMessage("Invalid ride type"),
    createRides
);
router.get('/get-fare',
    query('pickup').isString().isLength({min:3}).withMessage('Invalid pickup location'),
    query('destination').isString().isLength({min:3}).withMessage('Invalid destination')
    ,authUser,
    getFaree)
export default router;