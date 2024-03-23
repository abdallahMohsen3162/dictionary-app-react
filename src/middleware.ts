
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {

    
    let quz = request.url.search("quiz");
    
    const userIsAuthenticated = request.cookies.get("authToken");
    if (!userIsAuthenticated && quz >= 0) 
        return NextResponse.redirect(new URL("/usersUI", request.url));
    
    let lgn = request.url.search("login");
    if (userIsAuthenticated && lgn >= 0) 
        return NextResponse.redirect(new URL("/", request.url));

    let prof = request.url.search("profile");

    if(!userIsAuthenticated && prof >= 0)
        return NextResponse.redirect(new URL("/usersUI", request.url));


    let rgst = request.url.search("register");
    if(userIsAuthenticated && rgst >= 0){
        return NextResponse.redirect(new URL("/", request.url));
    }

    let userui = request.url.search("usersUI");

    if(userIsAuthenticated && userui >= 0){
        return NextResponse.redirect(new URL("/profile", request.url));
    }


    return NextResponse.next();
}

export const config = {
    matcher: ["/quiz","/login","/profile","/register", "/usersUI"]
}
