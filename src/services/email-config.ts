import nodemailer, { Transporter } from 'nodemailer';
import { config } from "../config/env-config"

export const emailTransporter: Transporter = nodemailer.createTransport({
    host: config.mailHost,
    port: config.mailPort,
    secure: false, 
    auth: {
        user: config.mailUser,
        pass: config.mailPass,
    },
});
