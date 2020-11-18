class GIError extends Error {
  constructor(errname, errmsg, status, cmsg, cdata) {
    super(errmsg);
    this.name = errname;
    this.status = status;
    this.cmsg = cmsg;
    this.cdata = cdata;
  }
}

GIError.CODE_UNPROCESSABLE = 422;
module.exports = GIError;
