const multer = require('multer');
const database = require('../database/connection');
const multerConfig = require('../config/multer');

module.exports = {
  createFeed: async (req, res) => {
    const upload = multer(multerConfig).single('file');
    return upload(req, res, async err => {
      if (err) return res.json({
        success: false,
        message: 'Erro ao fazer upload de arquivo'
      });
      const feed = req.body;

      if (!req.userId) return res.json({
        success: false,
        message: 'Acesso não autorizado'
      });

      feed.user_id = req.userId;

      if (!feed.description && !req.file) return res.json({
        success: false,
        message: 'Necessário adicionar uma foto ou descrição'
      });

      if (req.file) feed['image'] = `http://localhost:8081/images/${req.file.filename}`;
      const [id] = await database('feed').insert(feed);
      if (!!id) return res.json({
        success: true,
        message: 'Postagem adicionada com sucesso',
        feed: { ...feed, id }
      });
      return res.json({
        success: false,
        message: 'Ocorreu um erro ao adicionar postagem'
      });
    });
  },

  indexFeed: async (req, res) => {

    const feed = await database('feed')
      .join('users', {
        'feed.user_id': 'users.id'
      })
      .select([
        'users.name as user_name',
        'users.image as user_image',
        'users.title as user_title',
        'feed.*'
      ])
      .orderBy('feed.id', 'desc');

    return res.json({
      success: true,
      message: 'OK',
      feed
    });
  },
}