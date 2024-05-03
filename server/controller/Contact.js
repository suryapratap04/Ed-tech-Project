const mailer = require('../config/mailer');

// contact us  controller and send mail
exports.contact = (req, res) => {
    try{
        const {name, email, message} = req.body;
        if(!name || !email || !message){
            return res.status(400).json({
                success: false,
                msg: "All Fields are required",
            });
        }
        const mailOptions = {
            from: email,
            to: process.env.EMAIL,
            subject: "Contact Us",
            text: message,
        };
        mailer.sendMail(mailOptions, (error, info) => {
            if(error){
                console.log(`Error in contact ${error}`);
                return res.status(500).json({
                    success: false,
                    msg: "Internal Server Error",
                });
            }
            return res.status(200).json({
                success: true,
                msg: "Email Sent Successfully",
            });
        });
    }catch(error){
        console.log(`Error in contact ${error}`);
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error",
        });
    }
}