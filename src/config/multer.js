const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
  dest: path.resolve(__dirname, '..', '..', 'uploads'),
  storage: multer.diskStorage({
    destination: (req, file, callback) => callback(null, path.resolve(__dirname, '..', '..', 'uploads')),
    filename: (req, file, callback) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) return callback(err);
        callback(null, `${hash.toString('hex') + hash.toString('hex')}.jpg`);
      })
    },
  }),
  fileFilter: (req, file, callback) => {
    const allowedMimes = ['image/jpeg', 'image/png'];
    (allowedMimes.includes(file.mimetype)) ? callback(null, true) : callback(new Error('Tipo de arquivo inválido.'));
  }
}