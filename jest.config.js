// filepath: c:\Users\SHAKIR\Desktop\Country React\jest.config.js
export default {
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\\.(css|scss)$': 'identity-obj-proxy', // Mock CSS imports
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Setup file for Jest
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Use Babel for transforming files
    },
  };