export const transporter = (req, res, next)=> {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'test-email@gmail.com',
        pass: 'test123'
      }
    })
  }