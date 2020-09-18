import { Router } from 'express';
import appointmetsRouter from './appointments.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();
//Criado para redirecionar todas as chamadas das marcações para o router
routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/appointments', appointmetsRouter);

export default routes;
