import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
// Define a type for the user object
type User = {
    name: string | null;
    email: string | null;
};
// Initial values
const initialUser: User = {
    name: null,
    email: null
};
// Create the writable store with the correct type
const userStore: Writable<User> = writable(initialUser);
// Function to update the name and email
function setUser(newName: string, newEmail: string): void {
    userStore.set({
        name: newName,
        email: newEmail
    });
}
export { userStore, setUser };
