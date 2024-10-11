import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  const { pathname, origin } = req.nextUrl;
  const session = await getToken({
    req
  })
  //ตรวจสอบว่ามี session ไหมเมื่อเข้ามาหน้าแรก
  if (pathname == "/") {
    if (!session) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/auth`)
    }
    if (pathname == "/auth") {
      if (session) {
        return NextResponse.redirect(`${origin}`)
      }
    }
  }
}