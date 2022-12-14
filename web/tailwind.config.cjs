/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx', './index.html'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif']
    },
    extend: {
      backgroundImage: {
        galaxy: "url('/background.png')",
        'first-gradient' :'linear-gradient(89.86deg, #9572FC 23.08%, #43E7AD 70.94%, #E1D55D 90.57%)',
        'game-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)',
      },
      boxShadow: {
        'center-violet': '0 0px 8px 1px #9572FC',
      }
    },
  },
  plugins: [],
}
