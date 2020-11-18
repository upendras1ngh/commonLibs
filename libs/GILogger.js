const log4js = require('log4js');
const logger = log4js.getLogger();

// Link with S3 and store the log files in s3 till that log in console
// everything: { type: 'dateFile', filename: './logs/all-the-logs.log' }
log4js.configure({
  appenders: { everything: { type: 'console' } },
  categories: { default: { appenders: ['everything'], level: 'info' } }
});

class GILogger {
  static info(message, ...props) {
    logger.info(
      new Date().toLocaleString().replace(/ /g, ''),
      message,
      props ? JSON.stringify(props) : ''
    );
  }

  static error(message, error, ...props) {
    logger.error(
      new Date().toLocaleString().replace(/ /g, ''),
      message,
      error || '',
      props ? JSON.stringify(props) : ''
    );
  }

  static successRequest(message, req, props) {
    logger.info(
      new Date().toLocaleString().replace(/ /g, ''),
      'message: ',
      message || 'API Success',
      '\n\tURL: ',
      `${req.protocol}://${req.get('host')}${req.originalUrl}`,
      '\n\treq body: ',
      JSON.stringify(req.body),
      '\n\treq head: ',
      JSON.stringify(req.headers),
      '\n\treq query:',
      JSON.stringify(req.query),
      '\n\tprops: ',
      JSON.stringify(props),
      '\n'
    );
  }

  static errorRequest(message, req, props, error) {
    logger.error(
      new Date().toLocaleString().replace(/ /g, ''),
      'message: ',
      message || 'API Error',
      '\n\tURL: ',
      `${req.protocol}://${req.get('host')}${req.originalUrl}`,
      '\n\treq body: ',
      JSON.stringify(req.body),
      '\n\treq head: ',
      JSON.stringify(req.headers),
      '\n\treq query:',
      JSON.stringify(req.query),
      '\n\tprops: ',
      JSON.stringify(props),
      '\n\tError: ',
      error.message,
      error.stack,
      '\n'
    );
  }
}

module.exports = GILogger;
