import axios from "axios";

const baseURL = "http://api.xxx.com";
const timeout = 5000;
/**
 * 设置请求头
 */
const requestHeader = () => {
  let HEADER = {
    "Content-Type": "application/json; charset=UTF-8"
  };
  //TODO:获取用户,加入请求头
  const userToken = localStorage.getItem("token");
  if(userToken){
    HEADER.userid = userToken.uid;
    HEADER.Authorization = `YLT${userToken}`;
  }
  return HEADER;
};

const request = (url, method, params, headers = requestHeader()) => {
  return new Promise((resolve, reject) => {
    axios
      .request(url, method, params, baseURL, headers, timeout)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const get = (url, params, headers) => {
  return new Promise((resolve, reject) => {
    request(url, "get", params, headers)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const post = (url, params, headers) => {
  return new Promise((resolve, reject) => {
    request(url, "post", params, headers)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default {};
