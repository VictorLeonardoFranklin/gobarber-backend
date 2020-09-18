import { Router } from 'express';
import appointmetsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();
//Criado para redirecionar todas as chamadas das marcações para o router
routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/appointments', appointmetsRouter);

export default routes;
