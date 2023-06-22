import jwt from 'jsonwebtoken';
const { JWT_SECRET } = process.env;
import MeetModel from '../../models/Meet'

export default async function handler(req,res){
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        // Retrieve all objects from the "recordings" collection
        const allRecordings = await MeetModel.find({});
    
        // Do something with the "allRecordings" variable
        console.log("yooo")
        console.log(allRecordings);
    
        // Return a response
        res.status(200).json({ recordings: allRecordings });
      } catch (error) {
        // Handle any errors that occurred during the operation
        console.error('Error retrieving recordings:', error);
        res.status(500).json({ error: 'Failed to retrieve recordings' });
      }
    
}