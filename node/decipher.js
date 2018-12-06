const crypto = require('crypto');
// 解密
function decipher(encrypted) {
  const algorithm = 'rc4';
  const key = 'hello';
  let decrypted = '';
  const decipher = crypto.createDecipher(algorithm, key);
  decrypted += decipher.update(encrypted, 'hex', 'binary');
  decrypted += decipher.final('binary');

    console.log(decrypted+'解密后的');
  return decrypted;
}

module.exports = decipher;







const crypto = require('crypto')

function encrypt(data, key){
  let cipher = crypto.createCipher('aes192', key);
  let crypted = cipher.update(data, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(encrypted, key){
  let decipher = crypto.createDecipher('aes192', key);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

let key = 'bz'


let value = '123456!@#%QWERqwer，。'
let cryptoValue = encrypt(encodeURIComponent(value),key)
console.log(cryptoValue,'  11')

//390cfe3e1ab272ed90889843cd46d5f08464b911fefd64793bfdf0820f1043248757cfc29a2a20ad42bacfb6b4b30f2d

let value = decodeURIComponent(decrypt(cryptoValue,key))
console.log(value,'  22')