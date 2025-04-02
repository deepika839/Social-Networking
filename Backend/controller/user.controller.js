const UserModel=require("../models/user.model");
const jwt = require('jsonwebtoken');
var dotenv=require('dotenv');
const bcrypt = require('bcrypt');
dotenv.config();

exports.register = async (req, res) => {
    try {
        const { name,email,password } = req.body;
        console.log('body data',req.body)
        
        let user = await UserModel.findOne({ email });
        if (user) return res.status(400).json({ message: 'user already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new UserModel({name,email,password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User registered successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Registration failed' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email,password ,rememberMe} = req.body;
        const user = await UserModel.findOne({ email});

        if (!user) {
            return res.status(401).json({success:false,error: 'Authentication failed' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ success:false.valueOf,error: 'Authentication failed' });
        }
        console.log('process.env.PORT',process.env.PORT)
        const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET);
        res.status(200).json({ message:"Login successful",token });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message:"Server Error", error: error });
    };
};

exports.getAll = (req, res) => {
    UserModel.find()
        .then(response => res.send(response))
        .catch(err => alert(err))
}

exports.getById = (req, res) => {
    var id = req.params.id;
    UserModel.find({ _id: id })
        .then(response => res.send(response))
        .catch(err => res.send(err));
}