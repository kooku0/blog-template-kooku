/* eslint-disable @typescript-eslint/no-var-requires */
const withMdxEnhanced = require('next-mdx-enhanced');
const rehypePrism = require('@mapbox/rehype-prism');

module.exports = withMdxEnhanced({
  layoutPath: 'src/layouts',
  defaultLayout: true,
  rehypePlugins: [rehypePrism]
})({
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push(
      ...[
        {
          test: /\.yml$/,
          type: 'json',
          use: 'yaml-loader'
        }
      ]
    );
    return config;
  }
});
