import User from "../models/User.js"; //importing user model
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js';


//register user
export const registerUser = async (req, res) => {
  const { name, email, phone, password, role } = req.body;

  // At least one of email or phone must be provided
  if (!name || !password || (!email && !phone)) {
    return res.status(400).json({
      message: "Please enter all required values (name, password, and email or phone) 😭🙏",
    });
  }

  try {
    // Check if user already exists with same email or phone
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "You already have an account. Try logging in!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email: email || null,
      phone: phone || null,
      password: hashedPassword,
      role: role || "buyer", // default is 'buyer'
    });

    await newUser.save();

    res.status(201).json({
      message: "Wauuu account created successfully 🥳🎈",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error occurred, please try again later",
    });
  }
};
//login user
// export const loginUser = async(req,res)=>
//   {
//   const {email,password}= req.body; //pass the values through frontend
//   if(!email || !password){
//     return res.status(400).json({message:"You are not authorized user😡🤬!!"});//case if one or both values aren't passed
//   }
//   try {
//     const user = await User.findOne({email}); //find user through email
//     if (!user)
//     {
//       res.status(400).json({message:"Email not found😒"});
//     }
//     const isPasswordCorrect = await bcrypt.compare(password, user.password); //hash the password through bcrypt and compare it to saved password
//     if(!isPasswordCorrect){
//       return res.status(400).json({message:"Wrong password please write correct password"});
//     }
//     const token= jwt.sign({userID:user._id}, process.env.JWT_SECRET, {expiresIn:'10m'});
//     res.cookie('token', token, {httpOnly: true, //token has 4 properties which accepts http requests
//                                 secure:process.env.NODE_ENV=== 'Production', //secure
//                                 sameSite:'strict',
//                               maxAge:60*60*1000});//time till token remains in cookie
//     const {password:_, ...userData}=user.toObject();
//     res.status(200).json({message:"Successfully logged in 🥳🥳", user:userData});
//     }


//   catch (error) {
//     console.error(error); 
//     res.status(500).json({ message: "Error occurred, please try again later" });
//   }
// }


export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "You are not authorized user😡🤬!!" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email not found😒" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Wrong password please write correct password" });
    }

    // ✅ Generate access & refresh tokens
    const accessToken = generateAccessToken(user._id, user.name, user.role, user.email);
    const refreshToken = generateRefreshToken(user._id);

    // ✅ Set access token in HTTP-only cookie
    res.cookie('AccessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'Production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000 // 1 hour
    });

    // ✅ Set refresh token in HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'Production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });

    // ✅ Remove password from user object
    const { password: _, ...userData } = user.toObject();

    // ✅ Send response with tokens and user data
    res.status(200).json({
      message: "Successfully logged in 🥳🥳",
      user: userData,
      accessToken,
      refreshToken
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error occurred, please try again later" });
  }
};
  

//logout user
export const logoutUser = async(req,res) => {
  try {
    res.clearCookie('token'); //clears the cookie
    res.status(200).json({message:"Successfully logged out 🥳"}); 
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: "Error occurred!! please try again later" });
  }
}