// controllers/auth.controller.js

import userModel from '../models/user.model.js';
import { createUser } from '../services/user.service.js';
import { validationResult } from 'express-validator';

const registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, fullname } = req.body;
  const { firstname, lastname } = fullname || {};

    try {
        const hashedPassword = await userModel.hashPassword(password);

        const user = await createUser({
            firstname,
            lastname,
            email,
            password: hashedPassword
        });

        const token = user.generateAuthToken();

        res.status(201).json({ token, user });
    } catch (err) {
        console.error("Registration error:", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export { registerUser };
