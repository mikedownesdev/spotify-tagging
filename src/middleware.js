import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// Required, apparently
// https://stackoverflow.com/questions/73229148/uncaught-syntaxerror-expected-expression-got-while-using-next-js-middlewar
export const config = {
    matcher: "/",
};

export async function middleware(req) {
    // Token will exist if user is logged in
    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    const { pathname } = req.nextUrl;

    // Allow the request if the following is true...
    // 1. If the request is an attempt to authenticate
    // 2. or if a token already exists
    if (pathname.includes('/api/auth') || token) {
        return NextResponse.next(); // Carry on to the requested route
    }

    // If no token and not a request for next-auth session, redirect to login
    if (!token && pathname !== '/login') {
        const url = req.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }
    
}