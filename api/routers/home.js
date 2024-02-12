const libs   = global.abs('api/libs');
const logics = global.abs('api/logics');

/* ================================================ */
const home = libs.express.Router();

/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
module.exports = (router) => {
  router.use('/', home);

  home.get('/', logics.home.get);
};
