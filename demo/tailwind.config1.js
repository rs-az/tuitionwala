module.exports = {
	mode: "jit",
	purge: ["./pages/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {},
	},
	variants: {
		extend: {
			backgroundColor: [
				"responsive",
				"dark",
				"group-hover",
				"focus-within",
				"hover",
				"focus",
			],
		},
	},
	plugins: [],
};
