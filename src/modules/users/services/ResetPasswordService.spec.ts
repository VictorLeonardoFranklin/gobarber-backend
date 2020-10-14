import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUsersTokensRepository from '../repositories/fakes/FakeUsersTokensRepository';
import ResetPasswordService from './ResetPasswordService';


let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokensRepository: FakeUsersTokensRepository;
let resetPassword: ResetPasswordService;

describe('ResetPassword', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUsersTokensRepository = new FakeUsersTokensRepository();
    resetPassword = new ResetPasswordService(fakeUsersRepository, fakeUsersTokensRepository);
  });

  it('should be able to reset the password', async () => {

    const user = await fakeUsersRepository.create({ name: 'Joe Doe', email: 'johndoe@gmail.com', password: '123456' })
    const tokenUser = await fakeUsersTokensRepository.generate(user.id);

    await resetPassword.execute({ token: tokenUser.token, password: '123123' });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(updatedUser?.password).toBe('123123');
  })
})
