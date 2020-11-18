const axios = require('axios').default;
// In order to gain the TypeScript typings (for intellisense / autocomplete) while using CommonJS imports with require() use ().deafults
// axios.<method> will now provide autocomplete and parameter typings

class GIHttp {
  static async get(reqUrl, headers, queries) {
    return axios.get(reqUrl, { params: queries, headers });
  }

  static async post(reqUrl, headers, queries, body) {
    const res = await axios.post(reqUrl, body, { params: queries, headers });
    return res;
  }

  static async put(reqUrl, headers, queries, body) {
    const res = await axios.put(reqUrl, body, { params: queries, headers });
    return res;
  }

  static async delete(reqUrl, headers, queries) {
    return axios.delete(reqUrl, { params: queries, headers });
  }

  static jsonContentType() {
    return { 'Content-Type': 'application/json' };
  }
}

module.exports = GIHttp;
