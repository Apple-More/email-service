import dotenv from 'dotenv';
dotenv.config();

export const config = {
  mailHost: process.env.MAIL_HOST as string,
  mailPort: parseInt(process.env.MAIL_PORT || "587", 10),
  mailUser: process.env.MAIL_AUTH_USER as string,
  mailPass: process.env.MAIL_AUTH_PASS as string,
  port: parseInt(process.env.PORT || "5000", 10),
};
