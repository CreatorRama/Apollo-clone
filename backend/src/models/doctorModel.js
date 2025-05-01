import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  specialty: {
    type: String,
    required: true,
    trim: true
  },
  qualifications: {
    type: [String],
    required: true
  },
  experience: {
    years: {
      type: Number,
      required: true,
      min: 0
    },
    category: {
      type: String,
      enum: ['0-5', '6-10', '11-16', '17+'],
      required: true
    }
  },
  fees: {
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'INR'
    },
    category: {
      type: String,
      enum: ['100-500', '500-1000', '1000+'],
      required: true
    },
    cashback: {
      amount: Number,
      applicable: {
        type: Boolean,
        default: false
      }
    }
  },
  location: {
    city: String,
    state: String,
    clinic: String,
    fullAddress: String
  },
  ratings: {
    percentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    totalPatients: {
      type: Number,
      default: 0
    }
  },
  languages: {
    type: [String],
    default: ['English']
  },
  availability: {
    online: {
      available: {
        type: Boolean,
        default: true
      },
      waitTime: {
        type: Number,  // in minutes
        default: 5
      }
    },
    hospital: {
      available: {
        type: Boolean,
        default: false
      }
    }
  },
  facility: {
    type: String,
    enum: ['Apollo Hospital', 'Apollo 24/7 Virtual Clinic', 'Other Clinics'],
    default: 'Apollo 24/7 Virtual Clinic'
  },
  profileImage: {
    type: String,
    default: '/default-doctor.webp'
  },
  featured: {
    type: Boolean,
    default: false
  },
  doctorOfTheHour: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

doctorSchema.index({ name: 'text', specialty: 'text', qualifications: 'text' });

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;