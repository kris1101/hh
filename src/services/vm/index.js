import * as config from './config';
import * as http from './user';

const requestData = category => ({
    type: config.REQUEST_DATA,
    category
});
export const receiveData = (data, category) => ({
    type: config.RECEIVE_DATA,
    data,
    category
});
/**
 * 请求数据调用方法
 * @param funcName      请求接口的函数名
 * @param params        请求接口的参数
 */
export const fetchData = ({funcName, params, stateName}) => dispatch => {
    !stateName && (stateName = funcName);
    dispatch(requestData(stateName));
    return http[funcName](params).then(res => dispatch(receiveData(res, stateName)));
};


const handleData = (state = {isFetching: true, data: {}}, action) => {
    switch (action.type) {
        case config.REQUEST_DATA:
            return {...state, isFetching: true};
        case config.RECEIVE_DATA:
            return {...state, isFetching: false, data: action.data};
        default:
            return {...state};
    }
};
export const httpData = (state = {}, action) => {
    switch (action.type) {
        case config.RECEIVE_DATA:
        case config.REQUEST_DATA:
            return {
                ...state,
                [action.category]: handleData(state[action.category], action)
            };
        default:
            return {...state};
    }
};

export const getCookie = (sName) => {
  var aCookie=document.cookie.split("; ");
  for(var i=0;i<aCookie.length;i++){
    var aCrumb=aCookie[i].split("=");if(sName==aCrumb[0])
    return(aCrumb[1]);
  }
  return null;
}
