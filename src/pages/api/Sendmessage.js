import MeetModel from "../../models/Meet";

export default async function handler(req,res){
    let meet_id = req.body.meet_id;
    let author = req.body.author;
    let text = req.body.text;
    let timestamp = Date.now();
    try{
    const meeting = await MeetModel.findOne({ _id:meet_id });

    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    // Add the new comment to the comments array
    meeting.comments.push({ author, text, timestamp });

    // Save the updated meeting document
    const updatedMeeting = await meeting.save();

    return res.status(200).json({ message: 'Message sent successfully', updatedMeeting });
  } catch (error) {
    console.error('Error sending message:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}