import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import routes from './routes';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();
app.use(cors());
app.use(express.json());

//Disponibilizo uma rota para visualização dos arquivos
//staticos da aplicação no caso as imagens do avatar
app.use('/files', express.static(uploadConfig.uploadsFolder));

app.use(routes);

//tratativa global de erros da aplicação
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response
        .status(err.statusCode)
        .json({ status: 'error', message: err.message });
    }

    return response
      .status(500)
      .json({ status: 'error', message: 'Internal server Error.' });
  },
);

app.listen(3333, () => {
  console.log('🤞 Server started on port: 3333 🙌');
});
