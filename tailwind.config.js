/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Menggunakan font Inter sebagai default (Tailwind default)
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        // Tema Warna VN (Gaya A: Lembut, Hangat)
        'vn-primary': '#f472b6', // Pink 400
        'vn-background': '#fef3c7', // Cream/Kuning Muda
        'vn-text': '#1f2937', // Abu-abu Gelap
        'vn-box': 'rgba(255, 255, 255, 0.95)', // Kotak Dialog semi-transparan putih
      }
    },
  },
  plugins: [],
}
