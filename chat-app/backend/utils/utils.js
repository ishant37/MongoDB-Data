import jwt from 'jsonwebtoken';

 export const generateToken = (user) => {
   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
     expiresIn: '30d',
   });
   res.send("jwt",token,{
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    httpOnly: true,
    sameSite: 'Strict',
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
   })
     res.cookie('token', token, { httpOnly: true }); // ❌ ERROR: res is not defined
   
   return token;
 }

