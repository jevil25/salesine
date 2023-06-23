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
    // timestamp: { type: Date }
    timestamp: { type:String, required:true },
  });   

const MeetSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    recordingLink: { type: String, required: true },
    meetHostId: { type:String, required:true },
    meetPassword: { type:String, required:true },
    // duration: { type: Number },
    duration: { type:String, required:true },
    startTime: { type:String, required:true },
    topic: { type:String, required:true, default:"Meeting" },
    companyid: { type:String, required:true },
    comments: { type: [CommentSchema],default:[] },
    meetid:{ type: String, required: true }
});

export default mongoose.models.meetings || mongoose.model("meetings", MeetSchema);