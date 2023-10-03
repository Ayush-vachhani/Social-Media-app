<script lang="ts">
    import { enhance } from "$app/forms";
    export let form;
    let errorMSG = '';
    $: if(form?.status===401) {
        errorMSG = form.body;
        // alert(form.body);
    }
    $: if(form?.status===409) {
        errorMSG = form.body;
    }
    //state for logging in or registering
    let isLoggingIn = true;
</script>
<form method="POST" action={isLoggingIn ? '?/login' : '?/register'} use:enhance on:submit|preventDefault class="bg-white p-6 rounded shadow-md max-w-lg mx-auto">
    {#if !isLoggingIn}
    <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700">Name:</label>
        <input type="text" required name="name" class="mt-1 p-2 w-full border rounded-md" />
    </div>
    {/if}

    <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
        <input type="email" required name="email" class="mt-1 p-2 w-full border rounded-md" value={form?.email??''}/>
    </div>

    <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-700">Password:</label>
        <input type="password" required name="password" class="mt-1 p-2 w-full border rounded-md" />
    </div>

    <button type="submit" class="btn btn-primary">{isLoggingIn ? 'Login' : 'Register'}</button>
</form>

<div class="flex justify-center items-center mx-1 my-5">
    <button class="btn btn-secondary mb-4" on:click={()=>isLoggingIn=!isLoggingIn}>
        {isLoggingIn ? 'Switch to Register' : 'Switch to Login'}
    </button>
</div>
{#if errorMSG}
<div class="alert alert-error">
  <div class="flex-1">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 mx-2 stroke-current">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
    <label>{errorMSG}</label>
  </div>
</div>
{/if}