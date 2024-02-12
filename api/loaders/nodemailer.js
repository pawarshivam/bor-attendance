const libs        = global.abs('api/libs');
const commons     = global.abs('api/commons');

// Create a Nodemailer transporter using SMTP
const transporter = libs.nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: {
    user: commons.env.gmail.user,
    pass: commons.env.gmail.password,
  },
});

/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
module.exports.send = (to, subject, body) => {
  if (commons.env.env === 'production') {
    transporter.sendMail({
      from: {
        name: commons.config.app.name,
        address: commons.env.gmail.user,
      },
      to,
      subject,
      text: body,
      html: body,
    });
  }
};
