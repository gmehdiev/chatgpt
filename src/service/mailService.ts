
import { createTransport, TransportOptions } from 'nodemailer';

let poolConfig = `smtps://${process.env.SMTP_USER}:${process.env.SMTP_PASSWORD}@${process.env.SMTP_HOST}/?pool=true`;

const transporter = createTransport(poolConfig);


export const sendActivatonMail = async (to: string, link: string) =>{
    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject: 'Активация аккаунта на ' + process.env.API_URL,
        text: '',
        html: 
        `
        <div>
            <h1>Для активации перейдите по ссылке</h1>
            <a href="${link}">${link}</a>
        </div>
        `
    })
}

