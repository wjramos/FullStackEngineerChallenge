export default {
  presets: [
    'nano-react-app',
  ],
  plugins: [
    [
      'transform-imports', {
        components: {
          transform: './web/components/${member}/${member}',
          preventFullImport: true,
        },
      },
    ],
    [
    '@babel/plugin-proposal-class-properties',
      {
        loose: true,
      },
    ],
    [
      '@babel/plugin-transform-react-jsx',
      {
        pragmaFrag: 'React.Fragment',
      },
    ],
  ],
};