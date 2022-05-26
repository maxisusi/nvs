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
          sc: 'var(--color-text-base-sc)',
          fill: 'var(--color-text-fill)',
        },
      },
      backgroundColor: {
        skin: {
          fill: 'var(--color-fill)',
          light: 'var(--color-lightGray-fill)',
          white: 'var(--color-white-fil)',
          hover: 'var(--color-menu-over)',
          btnHover: 'var(--color-button-hover)',
        },
      },
    },
  },
  plugins: [],
};
