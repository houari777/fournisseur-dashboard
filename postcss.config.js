const rtl = require('postcss-rtlcss');

module.exports = {
  plugins: [
    require('tailwindcss'),
    process.env.NODE_ENV === 'production' ? rtl() : null,
    require('autoprefixer'),
  ].filter(Boolean),
}
