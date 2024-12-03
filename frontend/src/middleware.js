import { NextResponse } from 'next/server';

export default function middleware(request) {
  console.log('in middleware');
  console.log(request.url);
  const url = new URL(request.url);

  if (url.pathname === '/home') {
    const token = request.cookies.get('token');
    if (!token) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (url.pathname === '/' || url.pathname === '/register') {
    const token = request.cookies.get('token');
    if (token) {
      return NextResponse.redirect(new URL('/home', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  //ignore static files
  matcher: ['/((?!_next).*)'],
};
