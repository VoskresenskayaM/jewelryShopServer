const rateLimiter = require('express-rate-limit');

const limiter = rateLimiter({
  windowMs: 15 * 60 * 100,
  max: 200000,
  message: 'В настоящий момент превышено количество запросов на сервер. Пожалуйста, попробуйте повторить позже',
});

module.exports = limiter;