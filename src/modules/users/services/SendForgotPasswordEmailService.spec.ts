import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/mailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';


describe('SendForgotPasswordEmail', () => {

  it('should be able to recover the password using the email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendEmail = jest.spyOn(fakeMailProvider, 'sendMail');

    const SendForgotPasswordEmail = new SendForgotPasswordEmailService(fakeUsersRepository, fakeMailProvider);

    await fakeUsersRepository.create({ name: 'Joe Doe', email: 'johndoe@gmail.com', password: '123456' })

    await SendForgotPasswordEmail.execute({ email: 'johndoe@gmail.com' });

    expect(sendEmail).toHaveBeenCalled;
  })
})
