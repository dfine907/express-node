const nodemailer = require('nodemailer')

const sendEmail = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount()

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'roscoe40@ethereal.email',
      pass: 'RPCm3kH8r1hn7AS4a8',
    },
  })

  const info = await transporter.sendMail({
    from: '"Dina Fine 👻" <dinafine907@gmail.com>', // sender address
    to: 'bar@example.com, baz@example.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    html: '<h2>Sending Emails with NodeJS! 💥 </h2>', // html body
  })

  res.json(info)
}

module.exports = sendEmail
