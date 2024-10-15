module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json', '.ts'],
        alias: {
          shared: './src/shared',
          src: './src',
          store: './src/shared/store/index.tsx',
          assets: './assets',
          theme: './src/shared/ui/theme.ts',
        },
      },
    ],
  ],
}
