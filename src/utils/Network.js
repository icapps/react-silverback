import axios from 'axios';

class Network {
  static async basicHeaders() {
    const headers = {};

    // ONLY USE THIS IF YOU WORK IN A BROWSER
    const token = await window.localStorage.getItem('ACCESS_TOKEN');
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }
    headers['Content-Type'] = 'application/json';
    headers['Accept'] = 'application/json';

    return headers;
  }

  static async errorHandler(error) {
    if (error.response) {
      throw {
        errors : error.response.data.errors,
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
    const headers = await this.basicHeaders();
    const result = await axios.get(`${process.env.REACT_APP_API_HOST}${route}`, { headers });
    return result.data;
  }

  static async put(route, body = {}) {
    const headers = await this.basicHeaders();
    const result = await axios.put(`${process.env.REACT_APP_API_HOST}${route}`, body, { headers });
    return result.data;
  }

  static async post(route, body = {}) {
    const headers = await this.basicHeaders();
    const result = await axios.post(`${process.env.REACT_APP_API_HOST}${route}`, body, { headers });
    return result.data;
  }

  static async delete(route) {
    const headers = await this.basicHeaders();
    const result = await axios.delete(`${process.env.REACT_APP_API_HOST}${route}`, { headers });
    return result.data || true;
  }
}

export default Network;
