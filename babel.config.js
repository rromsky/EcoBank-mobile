module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',

      {
        root: ['.'],
        alias: {
          shared: './src/shared',
          'shared/*': './src/shared/*',
          src: './src',
          'src/*': './src/*',
          store: './src/shared/store/index.tsx',
        },
      },
    ],
  ],
}
