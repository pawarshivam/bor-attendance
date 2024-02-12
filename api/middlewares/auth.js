// Auth required
module.exports = async (request, response, next) => {
  if (request.session.auth === true) {
    next();
  } else {
    request.flash('error', 'Session expired');
    response.redirect('/auth/login');
  }
};
