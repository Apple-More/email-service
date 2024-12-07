import { Router } from 'express';
import { sendEmails } from '../controllers/email-controller';
import allowRoles from '../middlewares/allow-roles';

const router = Router();

router.post('/send', allowRoles('Customer', 'Admin', 'SuperAdmin'), sendEmails);

export default router;
