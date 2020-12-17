const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const authUser = async (req, res, next) => {

  const authHeader = req.headers.authorization;
  if (!authHeader) return res.json({
    success: false,
    message: 'Acesso não permitido, faça login novamente',
    requireSignIn: true
  });
  const token = authHeader.split(' ')[1];

  try {

    const { id } = await promisify(jwt.verify)(token, 'aaa4aaec565f47aa32525a2b8a8ee8f9');
    req.userId = id;
    return next();

  } catch (e) {
    console.log('Error in auth middleware: ', e.toString());

    return res.json({
      success: false,
      message: 'Acesso não permitido, faça login novamente',
      requireSignIn: true
    });
  }
}

module.exports = authUser;