const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const database = require('../database/connection');
const { isEmail, isEmpty } = require('../utils');

module.exports = {
  createSession: async (credentials) => {

    const { email, password } = credentials;

    if (isEmpty(password, email)) return {
      success: false,
      message: 'E-mail ou senha inválidos',
    };

    if (!isEmail(email)) return {
      success: false,
      message: 'E-mail ou senha inválidos',
    };

    if (password.length < 6) return {
      success: false,
      message: 'E-mail ou senha inválidos',
    };

    const user = await database('users').where('email', email).first();

    if (!user) return {
      success: false,
      message: 'E-mail ou senha inválidos'
    };

    const passwordMatch = bcryptjs.compareSync(password, user.password);

    if (!passwordMatch) return {
      success: false,
      message: 'E-mail ou senha inválidos'
    };

    const auth = jwt.sign({ id: user.id }, 'aaa4aaec565f47aa32525a2b8a8ee8f9', { expiresIn: '100d' });

    delete user.password;

    return {
      success: true,
      message: 'Ok',
      auth,
      user
    };
  },

  readSession: async (userId) => {

    if (isEmpty(userId)) return {
      success: false,
      message: 'Acesso não autorizado, por favor faça login novamente',
      requireSignIn: true
    };

    const user = await database('users').where('id', userId).first();

    if (!user) return {
      success: false,
      message: 'Acesso não autorizado, por favor faça login novamente',
      requireSignIn: true
    };

    return {
      success: true,
      message: 'OK'
    };
  }
}