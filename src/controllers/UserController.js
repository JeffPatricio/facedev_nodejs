const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const database = require('../database/connection');
const { isEmail, isEmpty } = require('../utils');

module.exports = {
  createUser: async (user) => {

    const { password, email, name, github_user } = user;

    if (isEmpty(password, email, name, github_user)) return {
      success: false,
      message: 'Os campos e-mail, nome, senha e usuário do github são obrigatórios',
    };

    if (!isEmail(email)) return {
      success: false,
      message: 'O e-mail informado é inválido'
    };

    if (password.length < 6) return {
      success: false,
      message: 'A senha deve conter no mínimo 6 caracteres'
    };

    const userExists = await database('users')
      .where('email', email)
      .first();

    if (userExists) return {
      success: false,
      message: 'O e-mail informado já está em uso'
    };

    const passCrypt = await bcryptjs.hashSync(password, 10);

    const [id] = await database('users').insert({
      name,
      email,
      password: passCrypt,
      github_user
    });

    if (!!id) {

      const auth = jwt.sign({ id }, 'aaa4aaec565f47aa32525a2b8a8ee8f9', { expiresIn: '100d' });

      return {
        success: true,
        message: 'Usuário criado com sucesso',
        auth,
        user: {
          id,
          name,
          email,
          github_user,
          image: '',
          background: '',
          title: ''
        }
      };
    }

    return {
      success: false,
      message: 'Ocorreu um erro ao criar usuário'
    };
  },

  readUser: async (userId) => {

    const user = await database('users')
      .select(['*'])
      .where({ id: userId })
      .first();

    if (!!user) {
      delete user.password;
      return {
        success: true,
        message: 'OK',
        user
      };
    }

    return {
      success: false,
      message: 'Usuário não encontrado'
    };
  },

  getLastUsers: async (req, res) => {

    const users = await database('users')
      .select(['id', 'name', 'title', 'image'])
      .orderBy('id', 'desc')
      .limit(6);

    return {
      success: true,
      message: 'OK',
      users
    };
  },

  indexUsers: async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * 9;

    const users = await database('users')
      .select(['id', 'name', 'title', 'image'])
      .orderBy('id', 'desc')
      .limit(9)
      .offset(offset);

    const totalUsers = await database('users').count('id');

    return res.json({
      success: true,
      message: 'OK',
      users,
      totalUsers
    });
  },

  searchUsers: async (req, res) => {

    const { search } = req.query;

    const users = await database('users')
      .select(['id', 'name', 'title', 'image'])
      .orderBy('id', 'desc')
      .limit(6)
      .where('name', 'like', `%${search || ''}%`);

    return res.json({
      success: true,
      message: 'OK',
      users
    });
  }
}