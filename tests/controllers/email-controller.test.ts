import { sendEmails } from '../../src/controllers/email-controller';
import { emailTransporter } from '../../src/config/email-config';
import { Request, Response } from 'express';

// Mocking the emailTransporter module
jest.mock('../../src/config/email-config', () => ({
    emailTransporter: {
        sendMail: jest.fn(),
    },
}));

// Helper functions for request/response mocks
const mockRequest = (body: any = {}): Partial<Request> => {
    return { body } as Partial<Request>;
};

const mockResponse = (): Partial<Response> => {
    const res = {} as Partial<Response>;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('Email Controller - sendEmails', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks between tests
    });

    it('should send emails successfully', async () => {
        // Mocking sendMail to resolve successfully
        (emailTransporter.sendMail as jest.Mock).mockResolvedValue({ messageId: '12345' });

        const req = mockRequest({
            emails: ['test1@example.com', 'test2@example.com'],
            subject: 'Test Subject',
            body: 'This is a test email.',
        }) as Request;
        const res = mockResponse() as Response;

        await sendEmails(req, res);

        // Verify that sendMail was called for both emails
        expect(emailTransporter.sendMail).toHaveBeenCalledTimes(2);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Emails sent successfully.' });
    });

    it('should handle transporter errors gracefully', async () => {
        // Mocking sendMail to reject with an error
        (emailTransporter.sendMail as jest.Mock).mockRejectedValue(new Error('Transporter error'));

        const req = mockRequest({
            emails: ['test1@example.com', 'test2@example.com'],
            subject: 'Test Subject',
            body: 'This is a test email.',
        }) as Request;
        const res = mockResponse() as Response;

        await sendEmails(req, res);

        // Verify sendMail was called and error was handled
        expect(emailTransporter.sendMail).toHaveBeenCalledTimes(2);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Failed to send emails.' });
    });

    it('should return 500 for missing required fields', async () => {
        const req = mockRequest({}); // No body data
        const res = mockResponse();

        await sendEmails(req as Request, res as Response);

        // Ensure that sendMail is not called and the error is handled
        expect(emailTransporter.sendMail).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Failed to send emails.' });
    });
});
