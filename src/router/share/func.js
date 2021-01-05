import CryptoJS from 'crypto-js';

const decrypt = value => {
  const bytes = CryptoJS.AES.decrypt(value, 'SecretPassphrase');
  return bytes.toString(CryptoJS.enc.Utf8);
};
const encrypt = value => {
  return CryptoJS.AES.encrypt(value, 'SecretPassphrase').toString();
};
export { decrypt, encrypt };
