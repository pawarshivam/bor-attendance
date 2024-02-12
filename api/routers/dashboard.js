const libs   = global.abs('api/libs');

const middlewares = global.abs('api/middlewares');
const logics      = global.abs('api/logics');

/* ================================================ */
const dashboard = libs.express.Router();

/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
module.exports = (router) => {
  router.use('/dashboard', dashboard);

  dashboard.get('/', middlewares.auth, logics.dashboard.get);
};
