/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@': './src',
          '@/assets': './assets',
        },
        extensions: ['.js', '.json', '.png', '.jpg'],
        root: ['./src'],
      },
    ],
    'inline-dotenv',
    '@babel/plugin-transform-export-namespace-from',
    'react-native-worklets/plugin', // need to be the last plugin
  ],
  presets: ['module:@react-native/babel-preset'],
};
