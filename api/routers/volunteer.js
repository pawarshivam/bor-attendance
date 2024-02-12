const libs   = global.abs('api/libs');

const middlewares = global.abs('api/middlewares');
const logics      = global.abs('api/logics');

/* ================================================ */
const volunteer = libs.express.Router();

/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
module.exports = (router) => {
  router.use('/volunteer', volunteer);

  volunteer.post('/new', middlewares.auth, logics.volunteer.new);
};
