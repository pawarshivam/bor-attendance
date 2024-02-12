const libs    = global.abs('api/libs');
const commons = global.abs('api/commons');
const logger  = global.abs('api/loaders/logger');

/* ================================================ */
libs.mongoose.set('strictQuery', true);

/* ------------------------------------------------ */
libs.mongoose.connection.on('error', (error) => {
  logger.error(error);
});

/* ------------------------------------------------ */
libs.mongoose.connection.on('connected', () => {
  logger.info(`${commons.config.app.name} server connected to database ${commons.env.mongodb.host}`);
});

/* ------------------------------------------------ */
const connect = async () => libs.mongoose.connect(`${commons.env.mongodb.host}`, {
  useNewUrlParser: true,
});

/* ------------------------------------------------ */
const disconnect = async () => libs.mongoose.connection.close();

/* ------------------------------------------------ */
const drop = async () => libs.mongoose.connection.db.dropDatabase();

/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
module.exports = {
  connect,
  disconnect,
  drop,
};
