// controllers for users
import { Request, Response } from 'express';                // express types
import mongoose from 'mongoose';                            // mongoose 
import bcrypt from 'bcrypt';                                // bcrypt
import jwt from 'jsonwebtoken';                             // JWT
import { User } from '../models/user.js';    // User model

// signin controller
export const signin = async (req: Request, res: Response) => {
    // extract email and password from request body
    const { email, password } = req.body;

    try {
        // find exisitng user by email
        const existingUser = await User.findOne({ email });
        // if user doesn't exist
        if(!existingUser) {
            res.status(404).json({ message: "User doesn't exist" });
        } else {    // if user exists
            // check if password is correct bcrypt.compare(typed password, user's password)
            const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
            // if password is not correct
            if(!isPasswordCorrect) {
                res.status(404).json({ message: "Invalid credentials" });
            } 
            // if user exists and passowrd is correct
            // create JWT token
            const token = jwt.sign(
                { email: existingUser.email, id: existingUser._id }, 
                'secretword',
                { expiresIn: '1h' }
            );
            // send user and token
            res.status(200).json({ result: existingUser, token: token });
        }
    } catch (error: unknown) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// signup controller
export const signup = async (req: Request, res: Response) => {
    // extract info from req body
    const {email, password, confirmPassword, firstName, lastName} = req.body;

    try {
        // find exisitng user by email
        const existingUser = await User.findOne({ email });

        // if user already exists
        if(existingUser) {
            res.status(400).json({ message: "User already exists" });
        } else {
            // is passwords don't match
            if(password !== confirmPassword) {
                res.status(400).json({ message: "Passwords don't match" });
            }

            // hash password with bcrypt.hash(password, salting rounds)
            const hashedPassword = await bcrypt.hash(password, 12);

            // create User
            const user = await User.create({ email, password: hashedPassword, name: `${firstName}, ${lastName}` });

            // create JWT token
            const token = jwt.sign(
                { email: user.email, id: user._id }, 
                'secretword',
                { expiresIn: '1h' }
            );

            // send user and token
            res.status(200).json({ result: user, token: token });
        }
    } catch (error: unknown) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};