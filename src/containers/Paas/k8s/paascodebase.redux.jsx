import { notification } from 'antd';
import { getAjax } from '../../../components/docker/utils/axios'

const LOAD_DATA = 'LOAD_CODEBASE_DATA'
const LOAD_REPO_DATA = 'LOAD_CODEREPO_DATA'
const CLEAR_DATA = 'CLEAR_CODEBASE_DATA'
const START_LOADING = 'START_CODEBASE_LOADING'
const END_LOADING = 'END_CODEBASE_LOADING'

const initState = {
    redirectTo: '',
    msg: '',
    total: 0,
    loading: false,
    codeBaseList: [],
    coderepoList:[],
}

// reducer
export function paasCodeBase(state = initState, action) {
    switch (action.type) {
        case LOAD_DATA:
            return { ...state,
                codeBaseList: action.payload.result,
                total: action.payload.total,
            }
        case LOAD_REPO_DATA:
            return { ...state,
                coderepoList: action.payload,
            }
        case CLEAR_DATA:
            return initState 
        case START_LOADING:
            return { ...state,
                loading: true
            }
        case END_LOADING:
            return { ...state,
                loading: false
            }
        default:
            return state
    }
}

export function loadData(listinfo) {
    return {
        type: LOAD_DATA,
        payload: listinfo
    }
}

export function loadCodeRepoData(listinfo) {
    return {
        type: LOAD_REPO_DATA,
        payload: listinfo
    }
}

export function clearCodeBaseData() {
    return {
        type: CLEAR_DATA
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

export function getCodeBaseList(params={}) {
    return dispatch => {
        dispatch(startLoading());
        console.log(params);
      getAjax('/codeinfo/codeproject/', params, function(res) {
            dispatch(endLoading());
            if (res.data.code === 0) {
                dispatch(loadData(res.data.data))
            } else {
                notification.error({
                    description: res.data.msg,
                    message: "获取codeinfolist异常"
                })
            }
        })
    }
}

export function getCodeRepoList(params={}) {
    return dispatch => {
      getAjax('/codebase/repositories/', params, function(res) {
            if (res.data.code === 0) {
                dispatch(loadCodeRepoData(res.data.data))
            } else {
                notification.error({
                    description: res.data.msg,
                    message: "获取coderepolist异常"
                })
            }
        })
    }
}

