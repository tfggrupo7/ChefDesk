const nodemailer = require("nodemailer");

// Ahora la función espera un array de tareas, no de empleados
async function sendTareasEmail(to, subject, text, attachmentPath) {
  // Configura tu transporte SMTP
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
    
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: '"ChefDesk" <tuemail@gmail.com>',
    to,
    subject,
    text,

    attachments: [
      {
        filename: "tareas.pdf",
        path: attachmentPath,
      },
    ],
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendTareasEmail };
