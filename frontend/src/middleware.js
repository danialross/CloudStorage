import axios from 'axios';
import { NextResponse } from 'next/server';
import * as cookie from 'cookie';

export default async function middleware(req) {
  const path = req.nextUrl.pathname;
  const cookieHeader = req.headers.get('cookie');
  const cookies = cookie.parse(cookieHeader || '');
  const token = cookies.token;

  // if the user is not authenticated
  if (!token) {
    // allow to enter if entering login page
    if (path === '/') {
      return NextResponse.next();
    }
    //error page
    return NextResponse.redirect(new URL('/redirect?status=401', req.url));
  }

  try {
    const result = await axios.get(`${process.env.BACKEND_URL}/auth/verify`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Cookie: `token=${token}`,
      },
      withCredentials: true,
    });

    if (path === '/' || path === '/register') {
      //user is already logged in so redirect to home page
      if (result.status === 200) {
        return NextResponse.redirect(new URL('/redirect?status=200', req.url));
      } else {
        //allow to go if they are not logged in
        return NextResponse.next();
      }
    }

    if (path === '/home')
      if (result.status === 200) {
        // only allow if logged in
        return NextResponse.next();
      }
    //redirect to tell user that they must login first
    return NextResponse.redirect(new URL('/redirect?status=401', req.url));
  } catch (e) {
    //error page
    return NextResponse.redirect(new URL('/redirect?status=500', req.url));
  }

  //should not be reached
  return NextResponse.next();
}

export const config = {
  matcher: ['/home', '/register', '/'],
};
