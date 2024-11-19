import nodemailer, { Transporter } from 'nodemailer';
import { mailHost, mailPort, mailUser, mailPass} from "./index";

export const emailTransporter: Transporter = nodemailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false, 
    auth: {
        user: mailUser,
        pass: mailPass,
    },
});
