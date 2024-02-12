const libs   = global.abs('api/libs');
const logics = global.abs('api/logics');

/* ================================================ */
const auth = libs.express.Router();

/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
module.exports = (router) => {
  router.use('/auth', auth);

  auth.get('/login', logics.auth.login);
  auth.post('/login', logics.auth.authenticate);
  auth.post('/logout', logics.auth.logout);
};
