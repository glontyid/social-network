const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');

module.exports = (context) => {
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split('Bearer')[0];

    if (token) {
      try {
        const user = jwt.verify(token, 'SUPER_SAFE_STRING');

        return user;
      } catch (error) {
        throw new AuthenticationError('Неверный или просроченный токен')
      }
    }
    throw new Error('Авторизационный токен должен быть Bearer[token]')
  }

  throw new Error('Авторизационные данные не разрешены')
}