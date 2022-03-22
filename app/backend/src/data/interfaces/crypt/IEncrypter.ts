interface IEncrypter {
  encrypt: (text: string) => Promise<string>
}

export default IEncrypter;
