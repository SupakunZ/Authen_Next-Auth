import bcrypt from 'bcryptjs';
import User from '@/models/User';
import connectDB from '@/utils/connectDB';
import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "password", type: "password" }
      },
      // **fuction ตรวจสอบการ login **
      async authorize(credentials, req) {
        await connectDB()
        //1.เช็คว่ามี email ในระบบไหม
        const user = await User.findOne({ email: credentials!.email })
        console.log(user._id)
        if (!user) {
          throw new Error("Email is not register.");
        }
        //2.decrybt password ว่าตรงกับที่กรอกไหม
        const isPasswordCorrect = await bcrypt.compare(
          credentials!.password,
          user.password
        );
        if (!isPasswordCorrect) {
          throw new Error("Password is incorrect!!!");
        }
        return user;
      }
    })
  ],
  //สิ่งที่จะส่งหลังจาก login สำเร็จ
  session: {
    strategy: "jwt"
  },
  //เมื่อ login จะมาหน้านี้
  pages: {
    signIn: "/auth"
  },
  callbacks: {
    async jwt({ token, user, account }) {
      //** กำหนดข้อมูลที่จะแนบมากับ token **
      if (user) {
        token.provider = account?.provider;
        token.first_name = user.first_name
        token.last_name = user.last_name
      }
      return token
    },
    async session({ session, token }) {
      //** กำหนดข้อมูลที่จะส่งออกไป**
      if (session.user) {
        session.user.provider = token.provider
        session.user.first_name = token.first_name
        session.user.last_name = token.last_name
      }
      return session
    }
  }
})