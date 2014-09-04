module.exports = {
  mail : {
    transporter : {
      host : process.env.MAIL_HOST,
      port : process.env.MAIL_PORT,
      ignoreTLS: true,
      secure : false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    },
  from : "Bcksp <bcksp@ogre.be>"
  }
}