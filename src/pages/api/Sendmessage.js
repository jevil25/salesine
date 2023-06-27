import MeetModel from "../../models/Meet";

export default async function handler(req, res) {
  console.log(req.body);
  let meet_id = req.body.meet_id;
  const meeting = await MeetModel.findOne({ _id: meet_id });

  if (!meeting) {
    return res.status(404).json({ message: "Meeting not found" });
  } else {
    if (req.body.flag == "send") {
      let author = req.body.author;
      let text = req.body.text;
      let timestamp = Date.now();
      try {
        // const meeting = await MeetModel.findOne({ _id:meet_id });

        // if (!meeting) {
        //   return res.status(404).json({ message: 'Meeting not found' });
        // }

        // Add the new comment to the comments array
        meeting.comments.push({ author, text, timestamp });

        // Save the updated meeting document
        const updatedMeeting = await meeting.save();

        return res
          .status(200)
          .json({ message: "Message sent successfully", updatedMeeting });
      } catch (error) {
        console.error("Error sending message:", error);
        return res.status(500).json({ message: "Server error" });
      }
    } else if (req.body.flag == "delete") {
      let commentid = req.body.id;
      let email = req.body.email;

   try{
      const meet = await MeetModel.findByIdAndUpdate(
        { _id: meet_id }, // Replace 'YOUR_MEET_ID' with the actual ID of the meet document
        { $pull: { comments: { _id: commentid, email: email } } },
        { new: true }
      );
      if (!meet) {
        return res.status(400).json({ err: "Comment not found" });
      } else {
        return res.status(200).json(meet);
      }
    }catch (error) {
      console.error('Error deleting comment:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
    }
  }
}
