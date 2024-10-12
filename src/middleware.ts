import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  const { pathname, origin } = req.nextUrl;
  //pathname -> params หน้านั้น
  //origin -> หน้า /
  //get token
  const session = await getToken({
    req
  })
  console.log('dsdsd', pathname)
  //ตรวจสอบว่ามี session ไหมเมื่อเข้ามาหน้าแรก
  if (pathname == "/") {
    if (!session) { //ถ้าไม่มี token มาหน้า /auth
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/auth`)
    }
    if (pathname == "/auth") { //ถ้ามี token มาหน้า /
      if (session) {
        return NextResponse.redirect(`${origin}`)
      }
    }

    //สมมุติว่ามี role admin ใช้ในการแยกสิทธิ
    if (pathname.startsWith == "/admin") { //ถ้ามี token มาหน้า /
      if (session.role === 'admin') { //ถ้ามี role admin อนุญาติ ให้ไปหน้า นี้ได้
        return NextResponse.redirect(`${origin}`)
      }
    }
  }
}