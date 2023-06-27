import jwt from "jsonwebtoken";
const { JWT_SECRET } = process.env;
import MeetModel from "../../models/Meet";

export default async function handler(req, res) {
  const meet_id = req.body.meet_id;
  try {
    const meeting = await MeetModel.findOne({ _id: meet_id });

    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found',status:400 });
    }
    else{
        return res.status(200).json({meeting});
    }
  } catch (error) {
    // Handle any errors that occurred during the operation
    console.error("Error retrieving recordings:", error);
    res.status(500).json({ error: "Failed to retrieve recordings" });
  }
}
