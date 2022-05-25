module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      textColor: {
        skin: {
          base: 'var(--color-text-base)',
          white: 'var(--color-text-white)',
          gray: 'var(--color-text-gray)',
        },
      },
      backgroundColor: {
        skin: {
          fill: 'var(--color-fill)',
          light: 'var(--color-lightGray-fill)',
        },
      },
    },
  },
  plugins: [],
};
