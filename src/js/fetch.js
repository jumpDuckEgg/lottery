import wepy from 'wepy';
import tip from './tip';

/**
 * 抓取远端API的结构
 * @param  {String} url   请求地址
 * @data  {Objece} data   数据
 * @return {Promise}      包含抓取任务的Promise
 */

const wxrequest = async (url, data, method = 'GET') => {
    return new Promise((resolve, reject) => {
        wepy.request({
            url: url,
            method: method,
            data: Object.assign({}, data),
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success(res) {
                resolve(res);
            },
            fail(res) {
                tip.toast('网络延迟');
                reject(res);
            }
        })
    })
}

function get(url, data) {
  return wxrequest(url, data);
}

function post(url, data) {
  return wxrequest(url, data, 'POST');
}

module.exports = {
    get,
    post
}