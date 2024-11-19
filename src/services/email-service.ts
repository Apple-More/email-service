import { emailTransporter } from './email-config';

interface EmailPayload {
    emails: string[];
    subject: string;
    body: string;
}

export const sendEmails = async ({ emails, subject, body }: EmailPayload): Promise<void> => {
    const emailPromises = emails.map((email) =>
        emailTransporter.sendMail({
            from: `<nipunmilinda@gmail.com>`, 
            to: email,
            subject: subject,
            text: body,
            html: `<p>${body}</p>`,
        })
    );

    await Promise.all(emailPromises);
};
