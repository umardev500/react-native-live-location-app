module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
          '@typed': './src/types',
        },
      },
    ],
  ],
};
