'use strict';
import Base from './Base'

var BaseUri = '';
var RestApi = {
  //base fetch method
  fetchBase: function(req) {
    if (!(req instanceof Object && req.uri)) {
      return null;
    }
    var method = req.method ? req.method : 'get';
    var uri = BaseUri + req.uri;
    var data = req.data;
    var p = null;
    if (data instanceof Object) {
      p = Object.keys(data).map(function(k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
      }).join('&');
    }
    if (method == 'get') {
      if (p) {
        uri += ('?' + p);
      }
      return fetch(uri);
    } else {
      return fetch(uri, {
        method: method,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: p
      });
    }
  },

  /*封装统一的错误处理，显示一个toast提示，用户如需自己处理错误，请使用fetchBase*/
  /*showLoading: 是否显示加载提示，默认不显示*/
  /*msg: 需要显示的加载提示信息*/
  fetch: function(req, showLoading, msg) {
    return new Promise((resolve, reject) => {
      this.fetchInTime(req, 5000)
        .then((response) => {
          if (!response.ok) {
            Base.showToast('网络请求出错');
            reject("statusCodeError:" + response.status);
          } else {
              response.json().then((res) => {
                //check the status in json,do some common handle here
                if(res.code == '0'){
                  resolve(res);
                } else {
                  Base.showToast(res.message);
                  reject(res.message);
                }
              }).catch((error) => {
                Base.showToast('json解析错误');
                reject(error.message);
              });
          }
        })
        .catch((error) => {
          Base.showToast('网络异常，请检查您的网络设置');
          reject("networkError:" + error.message);
        });
    });
  },

  /*增加超时设置*/
  fetchInTime: function(req, timeout) {
    return new Promise((resolve, reject) => {
      var timer = setTimeout(() => {
        reject(new Error('timeoutError'));
      }, timeout);
      this.fetchBase(req)
        .then((obj) => {
          resolve(obj);
          clearTimeout(timer);
        }).catch((obj) => {
          reject(obj);
          clearTimeout(timer);
        });
    });
  },

}

export default RestApi;
