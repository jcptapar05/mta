import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

const admin = ["/my-account/address", '/my-account/change-password', '/my-account/dashboard', '/my-account/users', '/my-account/orders', '/my-account/products', "/my-account/profile", "/my-account/favorites"]

const customer = ["/my-account/change-password", "/my-account/address", '/my-account/orders', "/my-account/profile", "/my-account/favorites"]

const artist = ["/my-account/change-password", "/my-account/address", '/my-account/orders', '/my-account/address', '/my-account/change-password', "/my-account/profile", "/my-account/favorites", '/my-account/products']

export default withAuth(
  async function roleBasedAuth(req) {
    const { token } = req.nextauth;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized!' });
    }

    if (
      (token.role === 'admin' && !admin.some(path => req.nextUrl.pathname.startsWith(path))) ||

      (token.role === 'customer' && !customer.some(path => req.nextUrl.pathname.startsWith(path))) ||

      (token.role === 'artist' && !artist.some(path => req.nextUrl.pathname.startsWith(path)))
    ) {
      return NextResponse.json({ error: 'Unauthorized!' });
    }

    return NextResponse.next();
  }
);

export const config = { matcher: ['/my-account/:path*'] };
