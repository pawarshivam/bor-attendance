// F*ck path hell
// eslint-disable-next-line import/no-dynamic-require, global-require
global.abs = (name) => require(`${__dirname}/${name}`);

/* ================================================ */
const libs    = global.abs('api/libs');
const commons = global.abs('api/commons');
const loaders = global.abs('api/loaders');
const app     = global.abs('api/index');

/* ================================================ */
const server = () => app.listen(commons.env.app.port, async () => {
  loaders.logger.info(`${commons.config.app.name} server live | port: ${commons.env.app.port} | env: ${commons.env.env} | process id: ${process.pid}`);
  await loaders.mongodb.connect();
});

// Start the server
if (commons.env.env === 'test') {
  server();
} else if (libs.os.cpus().length > 1) {
  if (libs.cluster.isMaster) {
    for (let index = 0; index < libs.os.cpus().length; index += 1) {
      libs.cluster.fork();
    }

    libs.cluster.on('exit', async () => {
      await loaders.mongoose.disconnect();
    });
  } else {
    server();
  }
} else {
  server();
}

/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
module.exports = server;
