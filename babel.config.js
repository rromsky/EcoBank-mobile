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
          src: './src',
          store: './src/shared/store/index.tsx',
          assets: './assets',
        },
      },
    ],
  ],
}
