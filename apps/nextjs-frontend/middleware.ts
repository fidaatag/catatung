import {NextResponse, type NextRequest} from 'next/server';

// Protect dashboard routes by ensuring access token cookie exists
export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token');
  if (!accessToken) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Apply middleware only to dashboard pages
export const config = {
  matcher: ['/dashboard/:path*'],
};
