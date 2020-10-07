import { container } from 'tsyringe'

import IStorageProvider from './StorageProvider/models/IStorageProvider'
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider'
import MailProvider from './mailProvider/models/IMailProvider'


container.registerSingleton<IStorageProvider>('StorageProvider', DiskStorageProvider);
