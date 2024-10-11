// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "@/utils/connectDB";
import type { NextApiRequest, NextApiResponse } from "next";
import validator from 'validator'
import bcrypt from 'bcryptjs'
import User from "@/models/User";

type Data = {
  message: string;
};
//Controller of SignUp
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    //ConnectDB
    connectDB();
    const { first_name, last_name, email, password } = req.body
    //1.ตรวจสอบว่ามีข้อมูลส่งมาไหม
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ message: "Please fill data." })
    }
    //2.ตรวจสอบว่า Email ถูกต้องตาม form 
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please add a valid email." })
    }
    //3.ตรวจสอบว่าในdatabase มี email นี้ซ้ำไหม
    const user = await User.findOne({ email: email })
    if (user) {
      return res.status(400).json({ message: 'Email already exits.' })
    }
    //3.ตรวจสอบว password น้อยกว่า 6 ไหม
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be more than 6 character.' })
    }

    //Hash Password Process
    //1.gen salt -> random secret key
    const salt = await bcrypt.genSalt(10) // random 10 ตัว
    //2.hash password
    const cryptPassword = await bcrypt.hash(password, salt)
    //3.create new object
    const newUser = new User({
      first_name,
      last_name,
      email,
      password: cryptPassword
    })
    //5.send to database
    await newUser.save()
    console.log(newUser)
    res.json({ message: 'Register Success!!' })
  } catch (error) {
    console.log(error)
  }
}
