const libs    = global.abs('api/libs');

const ping    = global.abs('api/routers/ping');
const home      = global.abs('api/routers/home');
const auth      = global.abs('api/routers/auth');
const session   = global.abs('api/routers/session');
const volunteer = global.abs('api/routers/volunteer');
const dashboard = global.abs('api/routers/dashboard');

/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
module.exports = () => {
  const router = libs.express.Router();

  ping(router);
  home(router);
  auth(router);
  session(router);
  volunteer(router);
  dashboard(router);

  return router;
};
