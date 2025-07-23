import express from 'express';
import { query, validationResult } from 'express-validator';
import { authUser } from '../middlewares/auth.middleware.js';
import { getCoordinates,getDistTime } from '../controllers/map.controller.js';
import { getAutoCompleteSuggestion } from '../services/maps.service.js';

const router = express.Router();

// Validation middleware to check for errors
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.get(
  '/get-coordinates',
  query('address')
    .isString()
    .isLength({ min: 3 })
    .withMessage('Address must be at least 3 characters long'),
  validateRequest,
  authUser,
  getCoordinates
);
router.get('/get-distance-time',query('origin').isString().isLength({min:3}),
query('destination').isString().isLength({min:3}),
authUser,
getDistTime);
router.get('/get-suggestions',query('input').isString().isLength({min:3}),
authUser,getAutoCompleteSuggestion);

export default router;
