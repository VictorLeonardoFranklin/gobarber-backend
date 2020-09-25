import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService'
import CreateUserService from './CreateUserService'

describe('AuthenticateUser', () => {

  it('should be able to Authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    const user = await createUser.execute({ name: 'John Doe', email: 'johndoe@gmail.com', password: '123456' });

    const response = await authenticateUser.execute({ email: 'johndoe@gmail.com', password: '123456' });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  })


  it('should not be able to Authenticate with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

    expect(authenticateUser.execute({ email: 'johndoe@gmail.com', password: '123456' })).rejects.toBeInstanceOf(AppError);

  })

  it('should not be able to Authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    await createUser.execute({ name: 'John Doe', email: 'johndoe@gmail.com', password: '123456' });

    expect(authenticateUser.execute({ email: 'johndoe@gmail.com', password: '4567798' })).rejects.toBeInstanceOf(AppError);

  })
})
