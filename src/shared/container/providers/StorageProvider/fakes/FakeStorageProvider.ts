import IStorageProvider from '../models/IStorageProvider';

class FakeStorageProvider implements IStorageProvider {
  private Storage: string[] = [];
  public async saveFile(file: string): Promise<string> {
    this.Storage.push(file);
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const findIndex = this.Storage.findIndex(storageFile => storageFile === file)

    this.Storage.splice(findIndex, 1);
  }

}

export default FakeStorageProvider;
