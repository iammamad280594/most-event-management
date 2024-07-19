// hashPasswords.js
const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  console.log(hash);
};

hashPassword('password123'); // For 'user@example.com'
hashPassword('password456'); // For 'creator@example.com'
