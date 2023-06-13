import jwt from 'jsonwebtoken';
import UserModel from '../../models/User';
// const { JWT_SECRET } = process.env;

export default async function handler(req, res) {
  console.log(req.body)
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const { name, email, password } = req.body;
 
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '100d' });
    const user = new UserModel({
      username: name,
      email: email,
      password: password,
      token: token
    });
    await user.save();
    res.status(201).json({ message: 'User registered successfully'});
}
