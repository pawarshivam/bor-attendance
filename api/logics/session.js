const libs        = global.abs('api/libs');
const commons     = global.abs('api/commons');
const models      = global.abs('api/models');
const nodemailer  = global.abs('api/loaders/nodemailer');

/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
module.exports.all = async (request, response) => {
  let sessions = await models.Session.find().sort({ createdAt: -1 }).limit(10);

  if (sessions.length === 0) {
    request.flash('info', 'You have not created any sessions yet');
  } else {
    const promises = sessions.map((session) => session.attendees);

    const attendees = await Promise.all(promises);

    sessions = sessions.map((session, index) => ({
      attendees: attendees[index],
      ...session.toObject(),
    }));
  }

  response.render('session/all', {
    sessions,
  });
};

/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
module.exports.new = async (request, response) => {
  if (request.method === 'POST') {
    try {
      const { name, date } = request.body;
      let { skills } = request.body;

      if (skills === undefined) {
        skills = [];
      }

      skills = skills.map((skill) => parseInt(skill, 10));

      const session = new models.Session({ name, date, skills });
      await session.save();
      request.flash('success', `New session "${session.name}" created successfully`);
      response.redirect('/session/all');
    } catch (error) {
      request.flash('error', error.message);
      response.render('session/new', {
        skills: commons.config.session.skills,
      });
    }
  } else {
    response.render('session/new', {
      skills: commons.config.session.skills,
    });
  }
};

/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
module.exports.del = async (request, response) => {
  try {
    const { id } = request.params;
    await models.Session.findByIdAndRemove(id);
    request.flash('success', `Session "${id}" deleted successfully`);
  } catch (error) {
    request.flash('error', error.message);
  } finally {
    response.redirect('/session/all');
  }
};

/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
module.exports.attendance = async (request, response) => {
  const { id } = request.params;
  try {
    const session = await models.Session.findById(id);

    if (session === null || session === undefined) {
      request.flash('error', `Session "${id}" not found`);
      response.redirect('/session/all');
    } else {
      if (request.method === 'POST') {
        const { payload } = request.body;

        let volunteer = null;

        if (volunteer === null) {
          try {
            libs.joi.assert(payload, libs.joi.string().email().required());
            volunteer = await models.Volunteer.findOne({
              email: payload,
            });
          } catch (error) {
            // Do nothing
          }
        }

        if (volunteer === null) {
          try {
            volunteer = await models.Volunteer.findById(payload);
          } catch (error) {
            // Do nothing
          }
        }

        if (volunteer === null || volunteer === undefined) {
          request.flash('error', `Volunteer "${payload}" not found`);
        } else {
          try {
            const attendance = new models.Attendance({
              session: session._id,
              volunteer: volunteer._id,
            });
            await attendance.save();

            const html = await libs.ejs.renderFile('views/email/ack.ejs', {
              org: commons.config.app.name,
              volunteer,
              attendance,
              xsession: session,
            });

            nodemailer.send(volunteer.email, `${commons.config.app.name} - Attendance Marked`, html);

            request.flash('success', `Attendance for ${volunteer.email} added successfully`);
          } catch (error) {
            request.flash('error', error.message);
          }
        }
      }

      response.render('session/attendance', {
        xsession: session,
      });
    }
  } catch (error) {
    request.flash('error', error.message);
    response.redirect('/session/all');
  }
};
