import User from '../../models/User';

export default async function handler(req, res) {
    const { email } = req.body;
    const user = await User.findOne({ email: email }, { meetings: { $elemMatch: { recording_drive_link: { $exists: true } } } })
    if (user) {
        const meetingsWithRecording = user.meetings.filter((meeting) => meeting.recording_drive_link);
        console.log(meetingsWithRecording);
        res.status(200).json(meetingsWithRecording);
    } else {
        console.log("User not found.");
        res.status(404).json({ message: "User not found." });
    }
}