const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const database = require('../database/connection');
const multerConfig = require('../config/multer');
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

  profileUser: async (req, res) => {

    const { userId } = req.params;

    const user = await database('users')
      .select(['*'])
      .where({ id: userId })
      .first();

    if (!!user) {
      delete user.password;

      const feed = await database('feed')
        .select(['*'])
        .where({ user_id: userId })
        .orderBy('id', 'desc');;

      return res.json({
        success: true,
        message: 'OK',
        user,
        feed
      });
    }

    return {
      success: false,
      message: 'Usuário não encontrado'
    };
  },

  getLastUsers: async () => {

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
      .select(['id', 'name', 'title', 'image', 'github_user', 'background'])
      .orderBy('id', 'desc')
      .limit(9)
      .offset(offset);

    const totalUsers = await database('users').count('id').first();

    return res.json({
      success: true,
      message: 'OK',
      users,
      totalPages: Math.ceil(totalUsers['count(`id`)'] / 9)
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
  },

  deleteProfileImage: async (req, res) => {

    const { userId } = req;

    const updated = await database('users')
      .where({ id: userId })
      .update({ image: '' });

    if (updated === 1) {

      const user = await database('users')
        .select(['*'])
        .where({ id: userId })
        .first();

      delete user.password;

      return res.json({
        success: true,
        message: 'Foto removida com sucesso',
        user
      });
    }
    return res.json({
      success: false,
      message: 'Ocorreu um erro ao remover a foto'
    });
  },

  updateProfileImage: async (req, res) => {
    const upload = multer(multerConfig).single('file');
    return upload(req, res, async err => {

      if (err) return res.json({
        success: false,
        message: 'Erro ao fazer upload de arquivo'
      });

      const updated = await database('users')
        .where({
          id: req.userId
        })
        .update({
          image: `http://localhost:8081/images/${req.file.filename}`
        });

      if (updated === 1) {

        const user = await database('users')
          .select(['*'])
          .where({ id: req.userId })
          .first();

        delete user.password;

        return res.json({
          success: true,
          message: 'Foto atualizada com sucesso',
          user
        });
      }
      return res.json({
        success: false,
        message: 'Ocorreu um erro ao atualizar a foto'
      });
    });
  },

  updateBackgroundImage: async (req, res) => {
    const upload = multer(multerConfig).single('file');
    return upload(req, res, async err => {

      if (err) return res.json({
        success: false,
        message: 'Erro ao fazer upload de arquivo'
      });

      const updated = await database('users')
        .where({
          id: req.userId
        })
        .update({
          background: `http://localhost:8081/images/${req.file.filename}`
        });

      if (updated === 1) {

        const user = await database('users')
          .select(['*'])
          .where({ id: req.userId })
          .first();

        delete user.password;

        return res.json({
          success: true,
          message: 'Foto atualizada com sucesso',
          user
        });
      }
      return res.json({
        success: false,
        message: 'Ocorreu um erro ao atualizar a foto'
      });
    });
  },

  deleteBackgroundImage: async (req, res) => {
    const { userId } = req;

    const updated = await database('users')
      .where({ id: userId })
      .update({ background: '' });

    if (updated === 1) {

      const user = await database('users')
        .select(['*'])
        .where({ id: userId })
        .first();

      delete user.password;

      return res.json({
        success: true,
        message: 'Foto removida com sucesso',
        user
      });
    }
    return res.json({
      success: false,
      message: 'Ocorreu um erro ao remover a foto'
    });
  },

  updateUser: async (req, res) => {

    const { userId } = req;
    const { name, title } = req.body;

    const updated = await database('users')
      .where({ id: userId })
      .update({ name, title });

    if (updated === 1) {

      const user = await database('users')
        .select(['*'])
        .where({ id: userId })
        .first();

      delete user.password;

      return res.json({
        success: true,
        message: 'Usuário atualizado com sucesso',
        user
      });
    }
    return res.json({
      success: false,
      message: 'Ocorreu um erro ao atualizar o usuário'
    });
  }
}