import { Request, Response } from 'express';
import { emailTransporter } from '../config/email-config';

export const sendEmails = async (req: Request, res: Response): Promise<void> => {
    try {
        const { emails, subject, body } = req.body;
        // console.log(req.body);
        
        const emailPromises = emails.map((email: string) =>
            emailTransporter.sendMail({
                from: `<nipunmilinda@gmail.com>`, 
                to: email,
                subject: subject,
                text: body,
                html: `<p>${body}</p>`, 
            })
        );

        await Promise.all(emailPromises);

        res.status(200).json({ message: 'Emails sent successfully.' });
    } catch (error) {
        console.error('Error sending emails:', error);
        res.status(500).json({ error: 'Failed to send emails.' });
    }
};
