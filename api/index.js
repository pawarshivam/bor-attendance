const libs    = global.abs('api/libs');
const loaders = global.abs('api/loaders');

/* ================================================ */
// Initialize the express app
const app = libs.express();
loaders.express(app);

/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
module.exports = app;
