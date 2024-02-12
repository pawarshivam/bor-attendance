const libs   = global.abs('api/libs');

const middlewares = global.abs('api/middlewares');
const logics      = global.abs('api/logics');

/* ================================================ */
const session = libs.express.Router();

/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
module.exports = (router) => {
  router.use('/session', session);

  session.get('/all', middlewares.auth, logics.session.all);
  session.get('/new', middlewares.auth, logics.session.new);
  session.post('/new', middlewares.auth, logics.session.new);
  session.get('/:id/delete', middlewares.auth, logics.session.del);

  session.get('/:id/attendance', middlewares.auth, logics.session.attendance);
  session.post('/:id/attendance', middlewares.auth, logics.session.attendance);
};
