export const actions = {
    logout: async ({request,cookies}:any) => {
        await cookies.delete('auth');
    }
}