import axios from 'axios'
import {
    notification
} from 'antd';
import {
    getAjax
} from '../../../components/docker/utils/axios'

const LOAD_DATA = 'LOAD_HELMCHART_DATA'
const LOAD_REPOOPTION_DATA = 'LOAD_REPOOPTION_DATA'
const LOAD_CHARTOPTION_DATA = 'LOAD_CHARTOPTION_DATA'
const LOAD_CHARTVERSION_DATA = 'LOAD_CHARTVERSION_DATA'
const LOCAL_SEARCH_DATA = 'LOCAL_SEARCH_DATA'
const START_LOADING = 'START_HELMCHART_LOADING'
const END_LOADING = 'END_HELMCHART_LOADING'

const initState = {
    redirectTo: '',
    msg: '',
    total: 0,
    loading: false,
    helmchartList: [],
    helmchartListorigin: [],
    helmrepooptionList: [],
    helmchartoptionList: [],
    helmchartversionList: [],
}

// reducer
export function helmChart(state = initState, action) {
    switch (action.type) {
        case LOAD_DATA:
            return { ...state,
                helmchartList: action.payload,
                helmchartListorigin: action.payload
            }
        case LOAD_REPOOPTION_DATA:
            return { ...state,
                helmrepooptionList: action.payload
            }
        case LOAD_CHARTOPTION_DATA:
            return { ...state,
                helmchartoptionList: action.payload
            }
        case LOAD_CHARTVERSION_DATA:
            return { ...state,
                helmchartversionList: action.payload
            }
        case START_LOADING:
            return { ...state,
                loading: true
            }
        case END_LOADING:
            return { ...state,
                loading: false
            }
        case LOCAL_SEARCH_DATA:
            return { ...state,
                helmchartList: state.helmchartListorigin.filter(function(currentValue) {
                    return currentValue.chart_name.toLowerCase().indexOf(action.payload.toLowerCase()) != -1
                })
            }
        default:
            return state
    }
}

export function loadData(helmchartlistinfo) {
    return {
        type: LOAD_DATA,
        payload: helmchartlistinfo
    }
}

export function loadRepoOptionData(helmrepooptionlistinfo) {
    return {
        type: LOAD_REPOOPTION_DATA,
        payload: helmrepooptionlistinfo
    }
}

export function loadChartOptionData(helmchartoptionlistinfo) {
    return {
        type: LOAD_CHARTOPTION_DATA,
        payload: helmchartoptionlistinfo
    }
}

export function loadChartVersionData(helmchartversionlistinfo) {
    return {
        type: LOAD_CHARTVERSION_DATA,
        payload: helmchartversionlistinfo
    }
}

export function startLoading() {
    return {
        type: START_LOADING
    }
}

export function endLoading() {
    return {
        type: END_LOADING
    }
}

export function localDataSearch(searchkey) {
    return {
        type: LOCAL_SEARCH_DATA,
        payload: searchkey
    }
}

export function getlocalsearch(searchkey) {
    return dispatch => {
        dispatch(startLoading());
        dispatch(localDataSearch(searchkey))
        dispatch(endLoading());
    }
}

export function getHelmChartList(params) {
    return dispatch => {
        dispatch(startLoading());
        console.log(params);
        getAjax('/helm/helmchart/', params, function(res) {
            dispatch(endLoading());
            if (res.data.code == 0) {
                dispatch(loadData(res.data.data))
            } else {
                notification.error({
                    description: res.data.msg,
                    message: "获取chart异常"
                })
            }
        })
    }
}

export function getHelmRepoOptionList() {
    return dispatch => {
        getAjax('/helm/helmrepooptionlist/', {}, function(res) {
            if (res.data.code == 0) {
                dispatch(loadRepoOptionData(res.data.data))
            } else {
                notification.error({
                    description: res.data.msg,
                    message: "获取repo_option选项异常"
                })
            }
        })
    }
}

export function getHelmChartOptionList(params) {
    return dispatch => {
        getAjax('/helm/helmchartoptionlist/', params, function(res) {
            if (res.data.code == 0) {
                dispatch(loadChartOptionData(res.data.data))
            } else {
                notification.error({
                    description: res.data.msg,
                    message: "获取chart_option选项异常"
                })
            }
        })
    }
}

export function getHelmChartVersionList(params) {
    return dispatch => {
        getAjax('/helm/helmchartversionlist/', params, function(res) {
            if (res.data.code == 0) {
                dispatch(loadChartVersionData(res.data.data))
            } else {
                notification.error({
                    description: res.data.msg,
                    message: "获取chart_version选项异常"
                })
            }
        })
    }
}
