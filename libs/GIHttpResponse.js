const GILogger = require('./GILogger');

class GIHttpResponse {
  static success(req, res, data, message, error = null) {
    res.status(200).json({
      data,
      status: 200,
      message: message || 'success',
      error
    });
  }

  static resourceCreated(req, res, data, message, error = null) {
    res.status(201).json({
      data,
      status: 201,
      message: message || 'new resource being created.',
      error
    });
  }

  // for async/batch/cron request
  static requestAccepted(req, res, data, message, error = null) {
    res.status(202).json({
      data,
      status: 202,
      message: message || 'request has been accepted for processing',
      error
    });
  }

  static dataNotFound(req, res, data, message, error = null) {
    res.status(204).json({
      data,
      status: 204,
      message: message || 'requested data not found',
      error
    });
  }

  static alreadyReported(req, res, data, message, error = null) {
    res.status(208).json({
      data,
      status: 208,
      message: message || 'already reported',
      error
    });
  }

  static badRequest(req, res, error, message, data = null) {
    res.status(400).json({
      data,
      status: 400,
      message: message || 'cannot process data',
      error
    });
  }

  static unAuthorizedRequest(req, res, error, message, data = null) {
    res.status(401).json({
      data,
      status: 401,
      message: message || 'unauthorized access',
      error
    });
  }

  // authenticating will make no difference
  static forbiddenRequest(req, res, error, message, data = null) {
    res.status(403).json({
      data,
      status: 403,
      message: message || 'forbidden resource',
      error
    });
  }

  static resourceNotFound(req, res, error, message, data = null) {
    res.status(404).json({
      data,
      status: 404,
      message: message || 'resource not found',
      error
    });
  }

  static methodNotAllowed(req, res, error, message, data = null) {
    res.status(405).json({
      data,
      status: 405,
      message: message || 'request method not allowed',
      error
    });
  }

  static requestTimeout(req, res, error, message, data = null) {
    res.status(408).json({
      data,
      status: 408,
      message: message || 'request timeout',
      error
    });
  }

  static unprocessable(req, res, error, message, data = null) {
    res.status(422).json({
      data,
      status: 422,
      message: message || 'unprocessable entity',
      error
    });
  }

  // to handle express-validator errors
  static validationErrors(req, res, errors, message, data = null) {
    res.status(422).json({
      data,
      status: 422,
      message: message || 'validation errors',
      errors
    });
  }

  static internalError(req, res, error, message, data = null) {
    res.status(500).json({
      data,
      status: 500,
      message: message || 'internal server error',
      error
    });
  }

  static badGateway(req, res, error, message, data = null) {
    res.status(502).json({
      data,
      status: 502,
      message: message || 'bad gateway',
      error
    });
  }

  static serviceUnavailable(req, res, error, message, data = null) {
    res.status(503).json({
      data,
      status: 503,
      message: message || 'service unavailable',
      error
    });
  }

  static gatewayTimeout(req, res, error, message, data = null) {
    res.status(504).json({
      data,
      status: 504,
      message: message || 'gateway timeout',
      error
    });
  }

  static error(req, res, status, error, message, data = null) {
    res.status(status).json({
      data,
      status,
      message: message || 'Something went wrong',
      error
    });
  }

  static async handleRequestResponse(callback, params, message, req, res) {
    try {
      const response = await callback(params);
      GILogger.successRequest(null, req, { response });
      GIHttpResponse.success(req, res, response, message, null);
    } catch (error) {
      GILogger.errorRequest(error.toString(), req, {}, error);
      GIHttpResponse.internalError(req, res, error);
    }
  }
}

module.exports = GIHttpResponse;
