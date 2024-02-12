const libs = global.abs('api/libs');

/* ================================================ */
const VolunteerSchema = new libs.mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 300,
    trim: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  },

  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    trim: true,
    match: /^[a-zA-Z\s]+$/,
  },
}, {
  timestamps: true,
});

/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
// Compile model from the schema
module.exports = libs.mongoose.model('Volunteer', VolunteerSchema);
