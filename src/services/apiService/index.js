import axios from "axios";

class AxiosService {
  constructor() {
    const instance = axios.create();
    instance.interceptors.response.use(this.handleSuccess, this.handleError);
    this.instance = instance;
  }

  handleSuccess(resp) {
    return resp;
  }

  handleError(err) {
    return Promise.reject(err);
  }

  get(url, headers) {
    return this.instance.get(url, { headers });
  }
  post(url, body, headers) {
    return this.instance.post(url, body, { headers });
  }
  put(url, body, headers) {
    return this.instance.put(url, body, { headers });
  }
  delete(url, body, headers) {
    return this.instance.delete(url, { data: body, headers });
  }
}

export default new AxiosService();
