import { prisma } from "$lib/server/prisma";
import {redirect, json } from "@sveltejs/kit";

export const actions = {
    login: async ({request,cookies}:any) => {
        const formData = await request.formData();
        const email = formData.get('email');
        const password = formData.get('password');
        const user = await prisma.User.findUnique({
            where: {
                email
            }
        });
        if(!user || (user && user.password !== password)) {
            return {
                status: 401,
                body: "Invalid email or password",
                email:email,
            };
        }
        else {
            const userData = {
                name: user.name,
                email: user.email
            };
            cookies.set('auth', JSON.stringify(userData),{
                path: '/',
                maxage: 60 * 60 * 24 * 7, // 1 week
            });
            throw redirect (303, '/');
        } 
    },
    register: async ({request,cookies}:any) => {
        const formData = await request.formData();
        const data:any = {};
        formData.forEach((value:string, key:string) => data[key] = value);
        const existingUser = await prisma.User.findUnique({
            where: {
                email: data.email
            }
        });
        if (existingUser) {
            return {
                status: 409, // Conflict status code
                body: "Email already exists",
                email:data.email,
            };
        }
        const user = await prisma.User.create({ data });
        const userData = {
            name: user.name,
            email: user.email
        };  
        cookies.set('auth', JSON.stringify(userData),{
            path: '/',
            maxage: 60 * 60 * 24 * 7, // 1 week
        });
        throw redirect (303, '/');
    }
}