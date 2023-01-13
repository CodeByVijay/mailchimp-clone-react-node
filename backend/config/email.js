// const nodemailer = require("nodemailer");
import nodemailer from 'nodemailer';

const emailSMTP = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: "vijay.amule@techinfini.com",
        pass: "Vijay@1999"
    }
})

export default emailSMTP;