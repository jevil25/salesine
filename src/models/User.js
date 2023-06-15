const mongoose = require('mongoose');
const { MONGODB_URI, JWT_SECRET } = process.env;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
  console.log("Connected to DB succesfully!")
});

const UserSchema = new Schema({
  userId: { type: String, unique: true },
  email: { type: String, required: true, unique: true },
  zoomEmail: { type: String },
  username: { type: String, required: true },
  password: { type: String },
  provider: { type:String, default:"Salestine" },
  meetings: [
     {
      meetingId: { type: String, default: "" },
      recordingLink: { type: String, default: "" }
    }
  ],
  accessToken: { type: String, default: "" },
  refreshToken: { type: String, default: "" },
  tokenExpiry: { type: String, default: "" },
  verified: { type: Boolean, default: false },
  role: { type: String, default: 'user', required: true },
  createdAt: { type: Date, default: Date.now },
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