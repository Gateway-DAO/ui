module.exports = {
  displayName: 'templates',

  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/templates',
  preset: '../../jest.preset.ts',
};
