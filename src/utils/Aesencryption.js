import CryptoJS from 'crypto-js'


export const key = 'v8y/B?E(H+MbQeTh'
export const IV = 's3j/K?T$C+GQrEoH'
export const secretKey = CryptoJS.enc.Utf8.parse(key)
export const intiVector = CryptoJS.enc.Utf8.parse(IV)


export const encryptAes = (data) => {
    const preEncrypteds = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey, {
        iv: intiVector,
        mode: CryptoJS.mode.CBC,
        // keySize: 128
    })
    const result = preEncrypteds.toString(CryptoJS.format.Hex)
    return result
}

export const encryptQue = (data) => {
    const preEncrypteds = CryptoJS.AES.encrypt(data, secretKey, {
        iv: intiVector,
        mode: CryptoJS.mode.CBC,
        // keySize: 128
    })
    const result = preEncrypteds.toString(CryptoJS.format.Hex)
    return result
}

export const deCryptedData = (data) => {
    const dataHex = CryptoJS.enc.Hex.parse(data)
    const preDecrypted = CryptoJS.AES.decrypt(
        { ciphertext: dataHex },
        secretKey,
        { iv: intiVector, mode: CryptoJS.mode.CBC, keySize: 128 / 8, padding: CryptoJS.pad.Pkcs7 }
    )
    const encDecrypted = preDecrypted.toString(CryptoJS.enc.Utf8)
    const decrypted = JSON.parse(encDecrypted)
    return decrypted
}