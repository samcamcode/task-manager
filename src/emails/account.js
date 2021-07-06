const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    service: 'gmail',
    auth: {
        user: 'samuel.camacho84@gmail.com',
        pass: process.env.EMAIL_PASS
    } 
})

const sendWelcomeEmail = (email, name) => {
    transporter.sendMail({
        from: 'samuel.camacho84@gmail.com',
        to: email,
        subject: `Thanks for joining ${name}`,
        text: `welcome ${name}` 
    }, (error, info) => {
        if (error) {
            console.log(error)
        }else {
            console.log(info.response)
        }
    })
}

const sendCancelationEmail = (email, name) => {
    transporter.sendMail({
        from: 'samuel.camacho84@gmail.com',
        to: email,
        subject: `Sorry to see you go, ${name}.`,
        text: `Feedback ${name}?` 
    }, (error, info) => {
        if (error) {
            console.log(error)
        }else {
            console.log(info.response)
        }
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}



// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         console.log(error)
//     } else {
//         console.log(`email sent: ${info.response}`)
//     }

// })