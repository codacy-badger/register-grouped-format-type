module.exports = {
	verbose: false,
	transform: {
		'^.+\\.js$': '<rootDir>/node_modules/babel-jest',
	},
	moduleFileExtensions: [ 'js' ],
	setupFiles: [ '<rootDir>/jest.setup.js' ],
	coverageDirectory: 'coverage',
};