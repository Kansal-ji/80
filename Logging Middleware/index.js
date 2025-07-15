const fs = require('fs');

const logger = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const end = Date.now();
    const responseTime = end - start;

    const log = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${responseTime}ms\n`;
    console.log(log);
    });

  next();
};

module.exports = logger;
