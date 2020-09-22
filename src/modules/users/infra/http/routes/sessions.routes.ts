import { Router } from 'express';

const sessionsRouter = Router();
import SessionController from '../controllers/SessionController'

const sessionController = new SessionController();

sessionsRouter.post('/', sessionController.create);

export default sessionsRouter;
