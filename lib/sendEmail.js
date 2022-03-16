const AWS = require('aws-sdk');
require('dotenv').config();

const config = new AWS.Config({
    region: 'eu-north-1',
    secretAccessKey: process.env.SECRET,
    accessKeyId: process.env.KEY_ID
});

const ses = new AWS.SES(config);

const sendResetLink = (email, id) => {
    const params = {
        Destination: {
            ToAddresses: [
                email
            ]
        },
        Message: {
            Body: {
                Text: {
                    Charset: "UTF-8",
                    Data: `To reset your password, please click on this link: http://localhost:3000/reset/${id}`
                }
            },
            Subject: {
                Charset: "UTF-8",
                Data: "Reset Password Instructions"
            }
        },
        Source: "ithtroan@stud.ntnu.no"
    };

    ses.sendEmail(params, (err) => {
        if (err) {
            console.log(err);
        }
    });
}

module.exports = sendResetLink;