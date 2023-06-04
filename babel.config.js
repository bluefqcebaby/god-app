module.exports = {
  presets: ['module:metro-react-native-babel-preset'],

  plugins: [
    'react-native-reanimated/plugin',
    '@babel/plugin-proposal-class-properties',
    [
      'module-resolver',
      {
        extensions: [
          '.ios.js',
          '.android.js',
          '.ios.jsx',
          '.android.jsx',
          '.js',
          '.jsx',
          '.json',
          '.ts',
          '.tsx',
        ],
        root: ['.'],
        alias: {
          '@widgets': './src/widgets',
          '@pages': './src/pages',
          '@shared': './src/shared',
          '@entities': './src/entities',
          '@features': './src/features',
          '@': './src/app/store',
        },
      },
    ],
  ],
}
