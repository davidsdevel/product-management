import { NextResponse } from 'next/server'

export default function middleware(req) {
  const url = req.nextUrl;

  //Check session cookie
  const isAuth = req.cookies.get('next-auth.session-token') || req.cookies.get('__Secure-next-auth.session-token');
  
  
  if (url.pathname.startsWith('/_admin')) {
    url.pathname = '/_error';
    return NextResponse.rewrite(url);
  }

  if (isAuth) {
    if (url.pathname === '/admin') {
      url.pathname = '/admin/productos';

      return NextResponse.redirect(url);
    } else if (url.pathname.startsWith('/admin/')) {
      url.pathname = url.pathname.replace('/admin/', '/_admin/dashboard/');
      
      return NextResponse.rewrite(url);
    }
  }
  else {
    if (url.pathname.startsWith('/admin/')) {
      url.pathname = '/admin';

      return NextResponse.redirect(url);
    }
    else if (url.pathname === '/admin') {
      url.pathname = '/_admin/login';

      return NextResponse.rewrite(url);
    }
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/_admin/:path*"
  ]
}