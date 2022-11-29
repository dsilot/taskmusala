module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
  };
  process.env = Object.assign(process.env, {
    JWTKEY: 'TestSecret'
  });