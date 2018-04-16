const nodemailer = require('nodemailer');

module.exports = function sendMail(message) {
    nodemailer.createTestAccount((err, account) => {
        let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: '',
                pass: ''
            }
        });

        // send mail with defined transport object
        transporter.sendMail(message, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    });
};