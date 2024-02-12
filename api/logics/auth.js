const commons = global.abs('api/commons');

/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
module.exports.login = async (request, response) => {
  if (request.session.auth) {
    request.flash('info', 'You are already signed in');
    request.session.clear();
    response.redirect('/dashboard');
  } else {
    response.render('auth/login');
  }
};

/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
module.exports.authenticate = async (request, response) => {
  const { username, password } = request.body;

  if (username === 'admin' && password === commons.env.app.secret) {
    request.session.auth = true;
    response.redirect('/dashboard');
  } else {
    request.flash('error', 'Invalid username or password');

    response.render('auth/login');
  }
};

/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
module.exports.logout = async (request, response) => {
  request.session.auth = false;
  response.redirect('/auth/login');
};
