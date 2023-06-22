const mongoose = require('mongoose');
const { MONGODB_URI, JWT_SECRET } = process.env;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
  console.log("Connected to DB succesfully!")
});

const CommentSchema = new mongoose.Schema({
    author: { type: String },
    text: { type: String },
    timestamp: { type: Date }
  });   

const MeetSchema = new mongoose.Schema({
    id: { type: String, required: true },
    recordingLink: { type: String, required: true },
    meetHostId: { type:String, required:true },
    meetPassword: { type:String, required:true },
    duration: { type: Number },
    startTime: { type: Date },
    topic: { type:String, required:true, default:"Meeting" },
    companyId: { type:String, required:true },
    comments: { type: [CommentSchema],default:[] },
    meetId:{ type: String, required: true }
});

export default mongoose.models.meeting || mongoose.model('meeting', MeetSchema);