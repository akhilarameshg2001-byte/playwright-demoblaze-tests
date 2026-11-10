const loginData = [
  {
    username: 'akhila@',
    password: 'Akhila@123',
    testName: 'Valid credentials',
    isValid: true
  },
  {
    username: 'arathy_jay12',
    password: 'Akhila@123',
    testName: 'Invalid username',
    isValid: false,
    expectedMessage: 'User does not exist.'
  },
  {
    username: 'akhila@',
    password: 'Test111',
    testName: 'Invalid password',
    isValid: false,
    expectedMessage: 'Wrong password.'
  },
  {
    username: 'arathy_jay22',
    password: 'Test222',
    testName: 'Both invalid credentials',
    isValid: false,
    expectedMessage: 'User does not exist.'
  }
];

module.exports = { loginData };