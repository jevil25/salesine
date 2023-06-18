import jwt from 'jsonwebtoken';
const { JWT_SECRET } = process.env;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    const { token, email } = req.body;
    try {
        const result = jwt.verify(token, JWT_SECRET);
        if (result.email !== email) {
            return res.status(401).json({ message: 'Invalid token',status:401 });
        }
        if(result.exp < Date.now() / 1000){
            return res.status(401).json({ message: 'Token expired',status:401 });
        }
        res.status(200).json({ message: 'Token verified',status:200 });
    }
    catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Invalid token',status:401 });
    }
}
