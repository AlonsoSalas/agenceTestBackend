import {Router} from 'express';
import ConsultantsController from '../controllers/ConsultantsController';

const router = Router();

/* The Base Path for this router is /consultants you can see it on index.js */

router
    .get('/', ConsultantsController.getConsultants)
    .get('/report', ConsultantsController.getConsultantReport)

export default router;
