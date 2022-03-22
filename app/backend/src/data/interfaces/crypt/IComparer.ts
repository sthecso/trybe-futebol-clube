interface IHashComparer {
  compare: (text: string, hash: string) => Promise<boolean>
}

export default IHashComparer;
