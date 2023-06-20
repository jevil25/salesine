const mongoose = require('mongoose');
const { MONGODB_URI, JWT_SECRET } = process.env;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
  console.log("Connected to DB succesfully!")
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  meetings: {
    type: Array,
    default: [
      {
        id: {
          type: String
        },
        password: {
          type: String
        },
        topic: {
          type: String
        },
        date: {
          type: Date
        },
        start_time: {
          type: String
        },
        duration: {
          type: Number
        },
        recording_drive_link: {
          type: String
        }
      }
    ]
  },  
  token: { type: String },
  verified: { type: Boolean, default: false },
  role: { type: String, default: 'user', required: true},
  createdAt: { type: Date, default: Date.now },
  google: {
    type: Object,
    default: {
      accessToken: {
        type: String
      },
      refreshToken: {
        type: String
      },
    }
  },
  organization: {
    type: Array,
    default: []
  },
  sales: {
    type: Object,
    default: {
      total: 0,
      active: 0,
      closed: 0,
    },
  }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);