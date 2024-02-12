/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
module.exports.get = async (request, response) => {
  if (request.session.auth) {
    request.flash('info', 'You are already signed in');
  } else {
    request.flash('error', 'Please sign in to continue');
  }

  response.render('home');
};
