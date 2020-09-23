import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService'
import CreateUserService from './CreateUserService'

describe('AuthenticateUser', () => {

  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository);

    const createUser = new CreateUserService(fakeUsersRepository);
    const user = await createUser.execute({ name: 'John Doe', email: 'johndoe@gmail.com', password: '123456' });

    const response = await authenticateUser.execute({ email: 'johndoe@gmail.com', password: '123456' });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  })

})
