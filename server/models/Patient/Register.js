import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    default: '',
  },
  preferredPronouns: {
    type: String,
    enum: ['He/Him', 'She/Her', 'They/Them', 'Other'], // Limited options for better consistency
    default: 'Other',
  },
  age: {
    type: Number,
    min: 0, // Age should not be negative
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other', 'Prefer not to say'], // Controlled options
    default: 'Prefer not to say',
  },
  contactNumber: {
    type: String,
    default: '',
  },
  location: {
    city: {
      type: String,
      default: '',
    },
    state: {
      type: String,
      default: '',
    },
    country: {
      type: String,
      default: '',
    },
  },
  occupation: {
    type: String,
    default: '',
  },
  generalDoctorName: {
    type: String,
    default: '', // This can be updated every visit
  },
  doctorSpeciality: {
    type: String,
    default: '',
  },
  insuranceInformation: {
    provider: {
      type: String,
      default: '',
    },
    policyNumber: {
      type: String,
      default: '',
    },
  },
});

const Patient = mongoose.model('Patient', patientSchema);
export default Patient;
