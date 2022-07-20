
import nodemailer from "nodemailer";


export const sendEmail_ResetPassword = (to, url, txt) => {
    const smtp = nodemailer.createTransport({
        host: "contentgizmo.com",
        port: 465,
        secure: true, // upgrade later with STARTTLS
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASSWORD
        },
    });
    smtp.sendMail({
        to: to,
        from: "contentgizmo@contentgizmo.com",
        subject: "Contentgizmo - Reset Password",
        html: `
      <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
      <h2 style="text-align: center; text-transform: uppercase;color: black;">Reset password.</h2>
      <p>Please click the below button to reset your password, the link will be valid for 1 day</p>
      
      <a href=${url} style="background: #3333cc; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block; border-radius: 20px;">${txt}</a>
    
      <p>If the button doesn't work for any reason, you can also click on the link below:</p>
    
      <div><a href="${url}">${url}</a></div>
      </div>
    `,
    });
};