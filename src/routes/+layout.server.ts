import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async ({event,cookies}:any) => {
    const userCookie = cookies.get('auth')??"";
    return {
        userCookie
    };
};