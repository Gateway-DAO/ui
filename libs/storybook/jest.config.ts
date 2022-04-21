module.exports = {
  displayName: 'storybook',

  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/storybook',
  preset: '../../jest.preset.ts',
};
