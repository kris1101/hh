import axios from 'axios';
import {
    notification
} from 'antd';
import React, {
    Component
} from 'react';
import Qs from 'qs';
import qs from 'qs';
import {
    BASE_URL
} from '../../containers/Daas/constants';

export var baseUrl = BASE_URL;
var instance = axios.create({
    baseURL: baseUrl, //测试环境
    timeout: 2000,
});

function generateformdata(values) {
    let params = new FormData();
    Object.keys(values).forEach(function(key) {
        params.append(key, values[key])
    })
    return params
}
//instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

instance.defaults.headers.post['Content-Type'] = 'multipart/form-data'
export function getAjax(url, params, Callback) {
    let token = sessionStorage.token;
    if (token) {
        instance.defaults.headers.common['Authorization'] = token;
    }
    if (params.isdispach) {
        delete params.isdispach;
    }
    instance.get(url, {
            params: params
        })
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
    instance.post(url, generateformdata(params))
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
    instance.put(url, qs.stringify(params))
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
