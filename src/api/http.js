import axios from "axios";

// const baseURL = "http://192.168.1.33/api";
// const timeout = 5000;
if (process.env.NODE_ENV == "development") {
  axios.defaults.baseURL = "/api";
} else if (process.env.NODE_ENV == "production") {
  axios.defaults.baseURL = "/api";
}

axios.defaults.timeout = 10000;
// axios.defaults.headers.post["Content-Type"] =
//   "application/x-www-form-urlencoded;charset=UTF-8";
axios.defaults.headers.post["Content-Type"] = "application/json";
// 响应拦截器
axios.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    const res = response.data;
    if (res.status === 200) {
      return Promise.resolve(res.data);
    } else {
      return Promise.reject(res);
    }
  },

  error => {
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          break;
        case 403:
          //TODO: 去登陆
          alert(error.response.message);
          break;
        // 404请求不存在
        case 404:
          break;
        // 其他错误，直接抛出错误提示
        default:
          break;
      }
      return Promise.reject(error.response);
    }
  }
);

const get = (url, params) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, params)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const post = (url, params) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};
const api = {
  getUserInfo() {
    return new Promise((resolve, reject) =>
      get("/User/Get")
        .then(res => {
          resolve(res.results);
        })
        .catch(err => {
          reject(err);
        })
    );
  },
  getTypeList() {
    return new Promise((resolve, reject) => {
      get("/Type/Get")
        .then(res => {
          resolve(res.results);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  /**
   * 
   * @param {Number} typeId 报考类别id
   */
  getModeClassifyList(typeId) {
    return new Promise((resolve, reject) => {
      get(`/Module/Get/${typeId}`)
        .then(res => {
          resolve(res.results);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  /**
   * 
   * @param {Number} id 试题类型id
   */
  getTestTypeList(id) {
    return new Promise((resolve, reject) => {
      post(`/Test/TypeIndex/${id}`)
        .then(res => {
          resolve(res.results);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
export default api;
