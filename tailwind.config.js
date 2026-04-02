/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'hot-pink': '#FF006E',
				'electric-purple': '#8338EC',
				gold: '#FFD700',
				surface: 'rgba(255, 255, 255, 0.05)',
				'surface-hover': 'rgba(255, 255, 255, 0.08)'
			},
			fontFamily: {
				serif: ['Playfair Display', 'Georgia', 'Times New Roman', 'serif'],
				sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif']
			},
			backgroundImage: {
				'gradient-accent': 'linear-gradient(135deg, #FF006E, #8338EC, #FFD700)',
				'gradient-accent-h': 'linear-gradient(90deg, #FF006E, #8338EC, #FFD700)'
			}
		}
	},
	plugins: []
};
