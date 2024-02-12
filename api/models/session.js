const commons     = global.abs('api/commons');
const libs        = global.abs('api/libs');
const Attendance  = global.abs('api/models/attendance');

/* ================================================ */
const SessionSchema = new libs.mongoose.Schema({
  skills: [{
    type: Number,
    required: true,
    min: 1,
    max: commons.config.session.skills.length,
  }],

  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 96,
    trim: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Define a virtual property
SessionSchema.virtual('attendees').get(async () => {
  const count = await Attendance.countDocuments({ session: this._id });

  return count;
});

/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
// Compile model from the schema
module.exports = libs.mongoose.model('Session', SessionSchema);
