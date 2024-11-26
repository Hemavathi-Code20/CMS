import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'doctor', 'patient'] },
  patientId: {
    type: String,
    validate: {
      validator: function (value) {
        // If role is 'patient', ensure patientId is provided
        if (this.role === 'patient') {
          return value && value.length > 0; // Patient ID must be provided
        }
        return true; // If role is not 'patient', patientId is not required
      },
      message: 'Patient ID is required for patients',
    },
  },
});

export default mongoose.model('User', userSchema);
