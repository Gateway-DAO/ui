module.exports = {
  displayName: 'theme',

  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/theme',
  preset: '../../jest.preset.ts',
};
