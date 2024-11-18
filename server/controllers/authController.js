const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    console.log(req.body)
    const { name, email, password, role } = req.body;
    try {
        const existingUser = await userModel.findOne({ email });
        if(existingUser){
            return res.status(400).json({ message: "User already exists" });
        }
        const user = await userModel.create({
            name, email, password, role
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Password is incorrect')
        }
        const token = jwt.sign({ id: user.userId },
            process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
