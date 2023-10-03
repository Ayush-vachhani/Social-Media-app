<script>
    import {goto} from "$app/navigation";
    import {enhance} from "$app/forms";
    import {userStore} from "$lib/stores/User";

    let name = $userStore.name;
    let email = $userStore.email;
</script>

<nav class="bg-blue-600 text-white p-4">
    <div class="container mx-auto">
        <div class="flex justify-between items-center">
            <div class="text-2xl font-semi-bold">Cyber Crime India</div>
            <form action="?/logout" method="POST" use:enhance on:submit|preventDefault>
                <button class="btn btn-outline btn-accent">LOGOUT</button>
            </form>
            <p>Name: {name} and Email: {email}</p>
        </div>
    </div>
</nav>

<header class="bg-gray-100 h-screen flex flex-col justify-center items-center">
    <h1 class="text-5xl font-bold mb-4">Fighting Cyber Crime in India</h1>
    <p class="text-xl mb-8">
        Join our initiative to make the digital world a safer place.
    </p>
    <!-- Placeholder for an image or icon -->
    <div class="bg-gray-300 h-64 w-64 mb-4">
        <!-- You can replace the div above with an actual image -->
    </div>
    <button on:click={()=>goto("/register")} class="btn btn-primary"
        >Get Started</button
    >
</header>

<section class="container mx-auto my-16">
    <h2 class="text-3xl font-bold text-center mb-8">Why Join Us?</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-16">
        <div class="card bordered">
            <figure>
                <div class="bg-gray-300 h-48 w-full" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">Stay Informed</h2>
                <p>
                    Keep up to date with the latest threats and trends in cyber
                    crime.
                </p>
            </div>
        </div>
        <div class="card bordered">
            <figure>
                <div class="bg-gray-300 h-48 w-full" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">Collaborate</h2>
                <p>
                    Work with experts and enthusiasts in the field of cyber
                    security.
                </p>
            </div>
        </div>
        <div class="card bordered">
            <figure>
                <div class="bg-gray-300 h-48 w-full" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">Take Action</h2>
                <p>
                    Help in the active fight against cyber criminals and
                    hackers.
                </p>
            </div>
        </div>
    </div>
</section>
<button on:click={()=>goto('/city')}>CITY PAGE</button>
<footer class="bg-blue-600 text-white p-8">
    <div class="container mx-auto text-center">
        &copy; 2023 Cyber Crime India. All rights reserved.
    </div>
</footer>