import bcrypt from 'bcrypt';

export default class Hash {
  static encrypt(password) {
    if (!password) return;

    return bcrypt.hash(password, 8);
  }

  static compare(hash, password) {
    if (!hash || !password) return;

    return bcrypt.compare(password, hash);
  }
}
