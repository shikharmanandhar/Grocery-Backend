const nodemailer = require("nodemailer");
const sendEmail = (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth: {
                user:"sendermail670@gmail.com",
                pass: "123@123Shikhar",
            },
        });
        const mailOptions = {
            from: "sendermail670@gmail.com",
            to: email,
            subject: subject,
            text: text,
        };
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error)
            }
            else {
                console.log("Email sent successfully: "+ info.response)
            }
        });
    } 
    catch (error) {
        console.log(error, "email not sent");
    }
};
module.exports = sendEmail;