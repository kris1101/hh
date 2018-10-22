import axios from 'axios';
import {
    notification
} from 'antd';



export var baseUrl = 'http://10.144.129.48:8121/api/v1';
//export var baseUrl = 'http://10.26.7.195:8080/';
var instance = axios.create({
    baseURL: baseUrl, //测试环境
    headers: {
        'content-type': 'application/json',
    }
});

export function getAjax(url, params, Callback) {
    let token = sessionStorage.token;
    if (token) {
        instance.defaults.headers.common['Authorization'] = token;
    }
    instance.get(url, params)
        .then(function(response) {
            Callback(response);
        })
        .catch(function(error, resoponse) {
            /* return Promise.reject(error);*/
            notification.error({
                message: '提示',
                description: `服务器错误！`,
                duration: 2,
            });
        });
}

export function postAjax(url, params, Callback) {
    let token = sessionStorage.token;
    if (token) {
        instance.defaults.headers.common['Authorization'] = token;
    }
    instance.post(url, params)
        .then(function(response) {

            Callback(response);
        })
        .catch(function(error) {
            console.log(error);
            notification.error({
                message: '提示',
                description: `登录超时，请重新登录`,
                duration: 2,
            });
        });
}

export function putAjax(url, params, Callback) {
    let token = sessionStorage.token;
    if (token) {
        instance.defaults.headers.common['Authorization'] = token;
    }
    instance.put(url, params)
        .then(function(response) {

            Callback(response);
        })
        .catch(function(error) {
            console.log(error);
            notification.error({
                message: '提示',
                description: `登录超时，请重新登录`,
                duration: 2,
            });
        });
}

export function requestAjax(config, Callback) {
    let token = sessionStorage.token;
    if (token) {
        instance.defaults.headers.common['Authorization'] = token;
    }
    console.log(config);
    instance.request(config)
        .then(function(response) {

            Callback(response);
        })
        .catch(function(error) {
            console.log(error);
            notification.error({
                message: '提示',
                description: `登录超时，请重新登录`,
                duration: 2,
            });
        });
}

export function deleteAjax(url, Callback) {
    let token = sessionStorage.token;
    if (token) {
        instance.defaults.headers.common['Authorization'] = token;
    }
    instance.delete(url)
        .then(function(response) {

            Callback(response);
        })
        .catch(function(error) {
            console.log(error);
            notification.error({
                message: '提示',
                description: `登录超时，请重新登录`,
                duration: 2,
            });
        });
}