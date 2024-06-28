import CryptoJS from 'crypto-js';

// Encrypt
const secretKey = import.meta.env.VITE_SECRET_KEY;
export const encryptedSessionId = (sessionId) => {
    const encryptkey= CryptoJS.AES.encrypt(sessionId, secretKey).toString();
    sessionStorage.setItem('session_id', encryptkey);
}


// Decrypt
export const decryptedSessionId = encryptedData => CryptoJS.AES.decrypt(encryptedData, secretKey).toString(CryptoJS.enc.Utf8);
