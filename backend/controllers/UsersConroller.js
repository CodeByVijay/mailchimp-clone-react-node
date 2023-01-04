import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/Database.js";
import { Op } from "sequelize";
import { LocalStorage } from "node-localstorage";
const localStorage = new LocalStorage('./scratch');

export const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['id', 'email', 'username', 'emailCheckBox']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}
export const CheckEmail = async (req, res) => {
    const user = await Users.findAll({
        attributes: ['email'],
        where: { email: req.body.email },
    });
    if (user != '') {
        return res.status(200).json({ msg: "success" })
    } else {
        return res.status(200).json({ msg: "faild" })
    }
}

export const Register = async (req, res) => {
    const { email, username, password, emailCheckBox } = req.body;
    if (username === '' || email === '' || password === '') return res.status(422).json({ msg: "All Fields Are Required." });
    const user = await Users.findAll({
        attributes: ['email','username'],
        where: {
            [Op.or]: [
                { email: req.body.email },
                { username: req.body.email }
            ]
        }
    });

    if (user != '') {
        return res.status(422).json({ msg: "Email OR Username Already Exiest." })
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            username: username,
            email: email,
            password: hashPassword,
            emailCheckBox: emailCheckBox
        });
        res.json({ msg: "Registration Successful" });
    } catch (error) {
        console.log(error);
    }
}

export const Login = async (req, res) => {
    try {
        const user = await Users.findAll({
            where: {
                [Op.or]: [
                    { email: req.body.email },
                    { username: req.body.email }
                ]
            }

        });

        const match = await bcrypt.compare(req.body.password, user[0].password);
        if (!match) return res.status(400).json({ msg: "Wrong Password" });
        const userId = user[0].id;
        const username = user[0].username;
        const email = user[0].email;
        const accessToken = jwt.sign({ userId, username, email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '15s'
        });
        const refreshToken = jwt.sign({ userId, username, email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        await Users.update({ refresh_token: refreshToken }, {
            where: {
                id: userId
            }
        });
        
        res.json({ accessToken ,refreshToken});
    } catch (error) {
        res.status(404).json({ msg: "Email or Username not found" });
    }
}

export const Logout = async (req, res) => {
    // console.log(req.body.refToken);
    const refreshToken = req.body.refToken;
    if (!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where: {
            refresh_token: refreshToken
        }
    });
    
    if (!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update({ refresh_token: null }, {
        where: {
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    res.json({ msg: "logout success" });
}
