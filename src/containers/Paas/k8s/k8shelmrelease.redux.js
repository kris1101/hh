import { notification } from 'antd';
import { getAjax } from '../../../components/docker/utils/axios'

const LOAD_DATA = 'LOAD_HELMRELEASE_DATA'
const CLEAR_DATA = 'CLEAR_HELMRELEASE_DATA'
const LOAD_RELEASEVERSION_DATA = 'LOAD_RELEASEVERSION_DATA'
const LOCAL_SEARCH_DATA = 'LOCAL_RELEASE_SEARCH_DATA'
const START_LOADING = 'START_HELMRELEASE_LOADING'
const END_LOADING = 'END_HELMRELEASE_LOADING'

const initState = {
    redirectTo: '',
    msg: '',
    total: 0,
    loading: false,
    helmReleaseList: [],
    helmReleaseVersionList: [],
    helmReleaseListOrigin: [],
}

// reducer
export function helmRelease(state = initState, action) {
    switch (action.type) {
        case LOAD_DATA:
            return { ...state,
                helmReleaseList: action.payload,
                helmReleaseListOrigin: action.payload
            }
        case CLEAR_DATA:
            return initState 
        case LOAD_RELEASEVERSION_DATA:
            return { ...state,
                helmReleaseVersionList: action.payload,
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
                helmReleaseList: state.helmReleaseListOrigin.filter(function(currentValue) {
                    return currentValue.name.toLowerCase().indexOf(action.payload.toLowerCase()) !== -1
                })
            }
        default:
            return state
    }
}

export function loadData(helmreleaselistinfo) {
    return {
        type: LOAD_DATA,
        payload: helmreleaselistinfo
    }
}

export function clearReleaseData() {
    return {
        type: CLEAR_DATA
    }
}

export function loadReleaseversionData(helmreleaseversionlistinfo) {
    return {
        type: LOAD_RELEASEVERSION_DATA,
        payload: helmreleaseversionlistinfo 
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

export function getHelmReleaseList(params, header={}) {
    return dispatch => {
        dispatch(startLoading());
        console.log(params);
        getAjax('/helm/helmrelease/', params, function(res) {
            dispatch(endLoading());
            if (res.data.code === 0) {
                dispatch(loadData(res.data.data))
            } else {
                notification.error({
                    description: res.data.msg,
                    message: "获取release异常"
                })
            }
        }, header)
    }
}

export function getHelmReleaseVersionList(params, header={}) {
    return dispatch => {
        getAjax('/helm/helmreleasehistorylist/', params, function(res) {
            if (res.data.code === 0) {
                dispatch(loadReleaseversionData(res.data.data))
            } else {
                notification.error({
                    description: res.data.msg,
                    message: "获取release版本历史异常"
                })
            }
        }, header)
    }
}
