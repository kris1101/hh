import axios from 'axios';
import { notification } from 'antd';
import qs from 'qs'


const baseUrl = 'http://paas.sinochem.cloud/api/paas';
var instance = axios.create({
    baseURL: baseUrl,//测试环境
    timeout: 2000,
});

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'

export function getAjax(url,params,Callback) {
    let token = sessionStorage.token;
    if(token){
        instance.defaults.headers.common['Authorization'] = token;
    }
    instance.get(url,{params})
        .then(function (response) {
            Callback(response);
        })
        .catch(function (error,resoponse) {
            /* return Promise.reject(error);*/
            notification.error({
                message: '提示',
                description: `服务器错误！`,
                duration: 2,
            });
        });
}

export function postAjax(url,params,Callback) {
    let token = sessionStorage.token;
    if(token){
        instance.defaults.headers.common['Authorization'] = token;
    }
    instance.post(url,qs.stringify(params))
        .then(function (response) {

            Callback(response);
        })
        .catch(function (error) {
            console.log(error);
            notification.error({
                message: '提示',
                description: `登录超时，请重新登录`,
                duration: 2,
            });
        });
}

export function putAjax(url,params,Callback) {
    let token = sessionStorage.token;
    if(token){
        instance.defaults.headers.common['Authorization'] = token;
    }
    instance.put(url,qs.stringify(params))
        .then(function (response) {

            Callback(response);
        })
        .catch(function (error) {
            console.log(error);
            notification.error({
                message: '提示',
                description: `登录超时，请重新登录`,
                duration: 2,
            });
        });
}

export function requestAjax(config,Callback) {
    let token = sessionStorage.token;
    if(token){
        instance.defaults.headers.common['Authorization'] = token;
    }
    console.log(config);
    instance.request(config)
        .then(function (response) {

            Callback(response);
        })
        .catch(function (error) {
            console.log(error);
            notification.error({
                message: '提示',
                description: `登录超时，请重新登录`,
                duration: 2,
            });
        });
}

export function deleteAjax(url,params,Callback) {
    let token = sessionStorage.token;
    if(token){
        instance.defaults.headers.common['Authorization'] = token;
    }
    instance.delete(url, {data:params})
        .then(function (response) {

            Callback(response);
        })
        .catch(function (error) {
            console.log(error);
            notification.error({
                message: '提示',
                description: `登录超时，请重新登录`,
                duration: 2,
            });
        });
}

