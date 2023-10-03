import { redirect,json } from '@sveltejs/kit'
import type { Handle } from '@sveltejs/kit';
import path from 'path';

export const handle:Handle = async ({ event, resolve}) => {
    const defaultResponse = await resolve(event); 
    const cookie = event.cookies; //read all cookies
    const pathname = event.url.pathname; //path the user is trying to access
    const userCookie = cookie.get('auth'); //fetch cookies with name 'auth'
    if (!userCookie && pathname !== '/register') {
        throw redirect(301,'/register'); //redirect to register page if no cookie is found
    }
    else if(userCookie && pathname === '/register') {
        throw redirect(301,'/'); //redirect to home page if cookie is found
    }
    else{
        return resolve(event); //continue resolving the request
    }
}