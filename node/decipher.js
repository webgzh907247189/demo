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
