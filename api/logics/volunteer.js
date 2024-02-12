const commons     = global.abs('api/commons');
const libs        = global.abs('api/libs');
const models      = global.abs('api/models');
const nodemailer  = global.abs('api/loaders/nodemailer');

/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
module.exports.new = async (request, response) => {
  try {
    const { email, name } = request.body;

    const filter = {
      email,
    };

    const update = {
      email,
      name,
    };

    const options = {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    };

    // Find the document based on the filter criteria and update it if found,
    // otherwise insert a new document
    const volunteer = await models.Volunteer.findOneAndUpdate(filter, update, options);

    const html = await libs.ejs.renderFile('views/email/qr.ejs', {
      org: commons.config.app.name,
      email,
      qr: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${volunteer._id}`,
    });

    nodemailer.send(email, `${commons.config.app.name} - Attendance Onboarding`, html);

    request.flash('success', `New volunteer "${volunteer.email}" created successfully`);
  } catch (error) {
    request.flash('error', error.message);
  } finally {
    response.redirect('/dashboard');
  }
};
