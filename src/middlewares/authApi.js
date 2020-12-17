const authApi = async (req, res, next) => {

  const authHeader = req.headers.auth_api;

  if (authHeader !== '5993d7a73d9f9a694e411ba0788cfe2d') return res.json({
    success: false,
    message: 'Acesso não permitido'
  });

  return next();
}

module.exports = authApi;