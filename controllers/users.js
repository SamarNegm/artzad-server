import express from 'express';
import User from './../models/User.js'
import { catchAsync } from '../utils/utils.js';
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import dotenv from 'dotenv';
dotenv.config();
const { JWT_SECRET } = process.env;
export const signup = catchAsync(async (req, res) => {
    const { firstName, lastName, password, email } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
        return res.status(400).json({ message: "Success", data: "Already Exist" });

    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ name: `${firstName} ${lastName}`, email: email, password: hashedPassword });
    const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(202).json({ message: "Success", data: user, token });
});
export const signin = catchAsync(async (req, res) => {
    const { password, email } = req.body;
    const existUser = await User.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(password, existUser.password);
    if (!existUser || !isPasswordCorrect) {
        console.log(existUser, isPasswordCorrect);
        return res.status(400).json({ message: "Success", data: "User Email or password are not valid" });

    }
    const token = jwt.sign({ email: existUser.email, id: existUser._id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(202).json({ message: "Success", data: existUser, token });
});