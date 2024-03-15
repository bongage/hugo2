const purgecss = require('@fullhuman/postcss-purgecss')({
    content: ['./hugo_stats.json'],
    defaultExtractor: content => {
      const contentWithoutStyleBlocks = content.replace(/<style[^]+?<\/style>/gi, '');
      return contentWithoutStyleBlocks.match(/[\w-/:]+(?<!:)/g) || [];
    },
    safelist: ['random', 'yep', 'button'], // Add any classes you want to keep
  });
  
  module.exports = {
    syntax: 'postcss-scss',
    map: false,
    plugins: [
      require('css-declaration-sorter')({ order: 'smacss' }),
      require('autoprefixer')({ cascade: false }),
      ...(process.env.HUGO_ENVIRONMENT === 'production' ? [purgecss] : []),
    ],
  };
  