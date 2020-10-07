import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/mailProvider/fakes/FakeMailProvider';
import FakeUsersTokensRepository from '../repositories/fakes/FakeUsersTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';


let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUsersTokensRepository: FakeUsersTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUsersTokensRepository = new FakeUsersTokensRepository();
    sendForgotPasswordEmail = new SendForgotPasswordEmailService(fakeUsersRepository, fakeMailProvider, fakeUsersTokensRepository);
  });

  it('should be able to recover the password using the email', async () => {

    const sendEmail = jest.spyOn(fakeMailProvider, 'sendMail');
    await fakeUsersRepository.create({ name: 'Joe Doe', email: 'johndoe@gmail.com', password: '123456' })

    await sendForgotPasswordEmail.execute({ email: 'johndoe@gmail.com' });

    expect(sendEmail).toHaveBeenCalled();
  })

  it('should not be able to recover a non-existing user password', async () => {
    await expect(sendForgotPasswordEmail.execute({ email: 'johndoe@gmail.com' })).rejects.toBeInstanceOf(AppError);
  });

  it('shoul generate a forgot password token', async () => {

    const generateToken = jest.spyOn(fakeUsersTokensRepository, 'generate');
    const user = await fakeUsersRepository.create({ name: 'Joe Doe', email: 'johndoe@gmail.com', password: '123456' })

    await sendForgotPasswordEmail.execute({ email: 'johndoe@gmail.com' });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });

})
