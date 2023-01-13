// const nodemailer = require("nodemailer");
import nodemailer from 'nodemailer';

const emailSMTP = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: "test@gmail.com",
        pass: "Test@123"
    }
    
})

export default emailSMTP;