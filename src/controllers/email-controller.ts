import { Request, Response } from 'express';
import { emailTransporter } from '../config/email-config';

export const sendEmails = async (req: Request, res: Response): Promise<any> => {
    try {
        const { emails, subject, message } = req.body;

        if (!emails || !Array.isArray(emails) || emails.length === 0) {
            return res.status(400).json({ error: 'Emails field is required and should be a non-empty array.' });
        }

        if (!subject || typeof subject !== 'string') {
            return res.status(400).json({ error: 'Subject field is required and should be a string.' });
        }

        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'Message field is required and should be a string.' });
        }
        
        const emailPromises = emails.map((email: string) =>
            emailTransporter.sendMail({
                from: `nipunmilinda@gmail.com`, 
                to: email,
                subject: subject,
                text: message,
            })
        );

        await Promise.all(emailPromises);

        return res.status(200).json({ message: 'Emails sent successfully.' });
    } catch (error) {
        console.log('Error sending emails:', error);
        return res.status(500).json({ error: 'Failed to send emails.' });
    }
};
