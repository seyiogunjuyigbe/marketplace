const nodemailer = require('nodemailer');

     var message = {
        from: 'sender@server.com',
        to: 'foobar@example.com, "Ноде Майлер" <bar@example.com>, "Name, User" <baz@example.com>',
        cc: [
            'foobar@example.com',
            '"Ноде Майлер" <bar@example.com>',
            '"Name, User" <baz@example.com>'
        ],
        bcc: [
            'foobar@example.com',
            {
                name: 'Майлер, Ноде',
                address: 'foobar@example.com'
            }
        ],
        subject: 'Message title',
        text: 'Plaintext version of the message',
        html: '<p>HTML version of the message</p>'
    };
  
    nodemailer.createTransport({
        host: "smtp.example.com",
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: "username",
          pass: "password"
        }
      });

 
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'amanda15@ethereal.email',
        pass: '138nBY8nkvpz3kGHqu'
    }
});

   // verify connection configuration
   transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });