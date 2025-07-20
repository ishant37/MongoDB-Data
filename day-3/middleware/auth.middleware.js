import jwt from 'jsonwebtoken';

export const authenticationMiddleware= (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }
    try {
        const decoded=jwt.verify(token,process.env.JWT_Secret)

        req.user=decoded

    } catch (error) {
        res.status(200).json({message:"Error",error:error.message})
        
    }
    
}
