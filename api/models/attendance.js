const libs = global.abs('api/libs');

/* ================================================ */
const AttendanceSchema = new libs.mongoose.Schema({
  session: {
    type: libs.mongoose.Schema.Types.ObjectId,
    ref: 'Session',
  },
  volunteer: {
    type: libs.mongoose.Schema.Types.ObjectId,
    ref: 'Volunteer',
  },
}, {
  timestamps: true,
});

// Create a compound index on session and session with unique constraint
AttendanceSchema.index({ session: 1, volunteer: 1 }, { unique: true });

/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
// Compile model from the schema
module.exports = libs.mongoose.model('Attendance', AttendanceSchema);
