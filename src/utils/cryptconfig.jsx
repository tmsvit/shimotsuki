import CryptoJS from 'crypto-js';

// Encrypt
const secretKey = import.meta.env.VITE_SECRET_KEY;
export const encryptedSessionId = (sessionId,group) => {
    const encryptkey= CryptoJS.AES.encrypt(sessionId, secretKey).toString();
    const encryptgroup= CryptoJS.AES.encrypt(group, secretKey).toString();
    sessionStorage.setItem('session_id', encryptkey);
    sessionStorage.setItem('group', encryptgroup);
}


// Decrypt
export const decryptedSessionId = (encryptedData) => CryptoJS.AES.decrypt(encryptedData, secretKey).toString(CryptoJS.enc.Utf8);
