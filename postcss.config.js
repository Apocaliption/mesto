const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const plugins = [
  autoprefixer,
  cssnano({preset: 'default'}),
];

module.exports = {
  plugins,
};