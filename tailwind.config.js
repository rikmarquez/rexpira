/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'breath-blue': '#3B82F6',
        'breath-turquoise': '#06B6D4',
        'breath-amber': '#F59E0B',
        'breath-yellow': '#FBBF24',
        'breath-purple': '#8B5CF6',
        'breath-dark-blue': '#1E3A8A',
        'breath-bg-from': '#0F172A',
        'breath-bg-to': '#1E293B',
      },
    },
  },
  plugins: [],
}
