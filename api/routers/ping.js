const libs   = global.abs('api/libs');
const logics = global.abs('api/logics');

/* ================================================ */
const ping = libs.express.Router();

/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
module.exports = (router) => {
  router.use('/ping', ping);

  ping.get('/', logics.ping.get);
};
