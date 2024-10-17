module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    ['module:react-native-dotenv'],
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
          '@typed': './src/types',
          '@hooks': './src/hooks',
          '@storage': './src/storage',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
