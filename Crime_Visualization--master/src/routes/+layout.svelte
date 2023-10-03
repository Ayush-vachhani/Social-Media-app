<script>
	import "../app.postcss";
	import { setUser } from "$lib/stores/User";

	export let data;
	if (data.userCookie != "" ) {
		const { name, email } = JSON.parse(data.userCookie); //destructure the object
		setUser(name, email);
	}
</script>

<slot />
