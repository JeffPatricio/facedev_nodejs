const isEmpty = (...data) => {
  return data.some(value => value === '' || value === null || !value);
}

const isEmail = (email) => {
  return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(email);
}

const simpleHash = (level = 3) => {
  const hash = [];
  for (let i = 1; i <= level; i++) hash.push(Math.random().toString(36).substr(2, 9));
  return hash.join('');
}

module.exports = {
  isEmpty,
  isEmail,
  simpleHash
}