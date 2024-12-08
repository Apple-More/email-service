import { Router } from 'express';
import { sendEmails } from '../controllers/email-controller';

const router = Router();

router.post('/send', sendEmails);

export default router;
