import dotenv from 'dotenv';
dotenv.config();


export const mailHost = process.env.MAIL_HOST as string;
export const mailPort = parseInt(process.env.MAIL_PORT || "587", 10);
export const mailUser = process.env.MAIL_AUTH_USER as string;
export const mailPass = process.env.MAIL_AUTH_PASS as string;
export const port = parseInt(process.env.PORT || "5000", 10);