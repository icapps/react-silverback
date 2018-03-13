import axios from 'axios';

class Network {
  static getUrl(route) {
    if (route.indexOf('http://') === 0 || route.indexOf('https://') === 0 || route.indexOf('www.') === 0) {
      return route;
    }
    return `${process.env.REACT_APP_API_HOST}${route}`;
  }

  static basicHeaders() {
    const headers = {};

    // ONLY USE THIS IF YOU WORK IN A BROWSER
    const token = window.localStorage.getItem('ACCESS_TOKEN');
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }
    headers['Content-Type'] = 'application/json';
    headers['Accept'] = 'application/json';

    return headers;
  }

  static errorHandler(error) {
    if (error.response) {
      throw {
        errors : (error.response.data && error.response.data.errors) || [ { code: '0', status: 500, title: 'Unknown error', meta: error.response } ],
      };
    } else if (error.request) {
      // The request was made but no response was received
      throw {
        errors : [ { code: '0', status: 500, title: 'Unknown error', meta: error.request } ],
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      throw {
        errors : [ { code: '0', status: 500, title: 'Unknown error', meta: error.message } ],
      };
    }
  }

  static async get(route) {
    try {
      const headers = this.basicHeaders();
      const result = await axios.get(this.getUrl(route), { headers });
      return result.data;
    } catch (err) {
      this.errorHandler(err);
    }
  }

  static async put(route, body = {}) {
    try {
      const headers = this.basicHeaders();
      const result = await axios.put(this.getUrl(route), body, { headers });
      return result.data;
    } catch (err) {
      this.errorHandler(err);
    }
  }

  static async post(route, body = {}) {
    try {
      const headers = this.basicHeaders();
      const result = await axios.post(this.getUrl(route), body, { headers });
      return result.data;
    } catch (err) {
      this.errorHandler(err);
    }
  }

  static async delete(route) {
    try {
      const headers = this.basicHeaders();
      const result = await axios.delete(this.getUrl(route), { headers });
      return result.data || true;
    } catch (err) {
      this.errorHandler(err);
    }
  }
}

export default Network;
