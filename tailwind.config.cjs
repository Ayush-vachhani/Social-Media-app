/** @type {import('tailwindcss').Config}*/
const config = {
	content: ["./src/**/*.{html,js,svelte,ts}"],

	theme: {
		extend: {},
	},

	plugins: [require("daisyui")],
	daisyui: {
		darkTheme: "light",
	},
};

module.exports = config;
