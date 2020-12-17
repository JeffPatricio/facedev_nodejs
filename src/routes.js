const express = require('express');
const path = require('path');
const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');
const authUserMiddleware = require('./middlewares/authUser');
const authApiMiddleware = require('./middlewares/authApi');

const routes = express.Router();

const uploadsPath = path.resolve(__dirname, '..', 'uploads');

routes.get('/', (req, res) => {
  return res.json({
    success: true,
    message: 'OK'
  })
});

routes.use('/images', express.static(uploadsPath));

routes.use(authApiMiddleware);

routes.post('/users', async (req, res) => {
  const createUserResponse = await UserController.createUser(req.body);
  return res.json(createUserResponse);
});

routes.post('/sessions', async (req, res) => {
  const createSessionResponse = await SessionController.createSession(req.body);
  return res.json(createSessionResponse);
});

routes.use(authUserMiddleware);

routes.get('/sessions', async (req, res) => {
  const readSessionResponse = await SessionController.readSession(req.userId);
  return res.json(readSessionResponse);
});

routes.get('/users', async (req, res) => {
  const readUserResponse = await UserController.readUser(req.userId);
  return res.json(readUserResponse);
});

routes.get('/users/:userId', async (req, res) => {
  const readUserResponse = await UserController.readUser(req.params.userId);
  return res.json(readUserResponse);
});

routes.get('/lastUsers', async (req, res) => {
  const getLastUsersResponse = await UserController.getLastUsers();
  return res.json(getLastUsersResponse);
});

routes.get('/searchUser', UserController.searchUsers);

routes.get('/indexUsers', UserController.indexUsers);

routes.use((error, req, res, next) => {
  console.log(error);
  return res.json({
    success: false,
    message: 'Erro interno no servidor'
  });
});

module.exports = routes;