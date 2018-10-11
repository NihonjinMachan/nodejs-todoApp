const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'prinqyvvk67vwtxy@ethereal.email', 
        pass: 'Jq7bQ3Tfj7D7aGpbGz' 
    },
    tls : {
        rejectUnauthorized: false
    }
});

var mailOptions = function(receiverName, receieverEmail, mailContent){
    let mailDeets = {
        from:'"Naqeeb Naseer" <prinqyvvk67vwtxy@ethereal.email>', 
        to: receieverEmail, //separate with comas for multiple users (array)
        subject: 'REMINDER: Todo App', // Subject line
        html: '<style> p{font-family: Raleway; color: teal;} </style> <p>' + receiverName + ', please complete the task (' + mailContent + ') you set at this time. </p>', // plain text body
    };

    return mailDeets;
}

module.exports = {
    transporter,
    mailOptions
}
