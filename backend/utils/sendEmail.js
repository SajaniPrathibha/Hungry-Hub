import nodemailer from "nodemailer";
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "SET" : "MISSING");


const transporter = nodemailer.createTransport({
    
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // app password
    },
    
});

export const sendEmail = async ({ to, subject, html }) => {
    await transporter.sendMail({
        from: `"Hungry Hub" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
    });
};
