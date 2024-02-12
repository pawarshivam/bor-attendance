const get = async (_, response) => {
  response.send('Pong');
};

/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
module.exports = {
  get,
};
