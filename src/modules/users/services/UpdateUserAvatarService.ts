import { getRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import path from 'path';
import fs from 'fs';
import User from '../infra/typeorm/entities/User';
import uploadConfig from '@config/upload';

interface Request {
  user_id: string;
  avatarFilename: string;
}
class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      //deletar avatar anterior
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      //verifico se o arquivo existe
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        //excluir imagem anterior
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);
    delete user.password;
    return user;
  }
}

export default UpdateUserAvatarService;
