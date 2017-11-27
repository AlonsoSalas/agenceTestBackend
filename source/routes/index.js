import {Router} from 'express';
import consultantsRouter from './ConsultantsRoutes';

const router = Router();

router
    .use('/consultants', consultantsRouter)

export default router;
