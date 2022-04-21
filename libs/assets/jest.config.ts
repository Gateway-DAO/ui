module.exports = {
  displayName: 'assets',

  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/assets',
  preset: '../../jest.preset.ts',
};
