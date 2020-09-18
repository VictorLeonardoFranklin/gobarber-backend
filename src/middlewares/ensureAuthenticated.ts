import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function (
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const AuthHeader = request.headers.authorization;

  if (!AuthHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = AuthHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);
    //Pega o id do usuário verificado no token enviado caso o mesmo seja válido
    const { sub } = decoded as TokenPayload;
    //adiciona o id do usuário autenticado no request da solicitação
    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
