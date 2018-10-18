import axios from 'axios'
import { notification } from 'antd';
import { getAjax } from '../../../components/docker/utils/axios'

const LOAD_DATA = 'LOAD_CODEBUILD_DATA'
const LOAD_USERCODEPROJECT_DATA = 'LOAD_USERCODEPROJECT_DATA'
const LOAD_CODEBRANCHTAG_DATA = 'LOAD_CODEBRANCHTAG_DATA'
const LOAD_BASEREPO_DATA = 'LOAD_BASEREPO_DATA'
const LOAD_BASEREPOTAG_DATA = 'LOAD_BASEREPOTAG_DATA'
const LOAD_COMPILEREPO_DATA = 'LOAD_COMPILEREPO_DATA'
const LOAD_COMPILEREPOTAG_DATA = 'LOAD_COMPILEREPOTAG_DATA'
const CLEAR_DATA = 'CLEAR_CODEBUILD_DATA'
const START_LOADING = 'START_CODEBUILD_LOADING'
const END_LOADING = 'END_CODEBUILD_LOADING'

const initState = {
    redirectTo: '',
    msg: '',
    total: 0,
    loading: false,
    codeBuildList: [],
    codeBranchTagList: [],
    baserepoList: [],
    baserepotagList: [],
    compilerepoList: [],
    compilerepotagList: [],
    usercodeprojectList: [],
}

// reducer
export function paasCodeBuild(state = initState, action) {
    switch (action.type) {
        case LOAD_DATA:
            return { ...state,
                codeBuildList: action.payload.result,
                total: action.payload.total,
            }
        case LOAD_USERCODEPROJECT_DATA:
            return { ...state, usercodeprojectList: action.payload}
        case LOAD_BASEREPO_DATA:
            return { ...state, baserepoList: action.payload}
        case LOAD_BASEREPOTAG_DATA:
            return { ...state, baserepotagList: action.payload}
        case LOAD_COMPILEREPO_DATA:
            return { ...state, compilerepoList: action.payload}
        case LOAD_COMPILEREPOTAG_DATA:
            return { ...state, compilerepotagList: action.payload}
        case LOAD_CODEBRANCHTAG_DATA:
            return { ...state, codeBranchTagList: action.payload}
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

export function loadCodeProjectData(listinfo) {
    return {
        type: LOAD_USERCODEPROJECT_DATA,
        payload: listinfo
    }
}

export function loadCodeBranchTagData(listinfo) {
    return {
        type: LOAD_CODEBRANCHTAG_DATA,
        payload: listinfo
    }
}

export function loadBaseRepoData(listinfo) {
    return {
        type: LOAD_BASEREPO_DATA,
        payload: listinfo
    }
}

export function loadBaseRepoTagData(listinfo) {
    return {
        type: LOAD_BASEREPOTAG_DATA,
        payload: listinfo
    }
}

export function loadCompileRepoData(listinfo) {
    return {
        type: LOAD_COMPILEREPO_DATA,
        payload: listinfo
    }
}

export function loadCompileRepoTagData(listinfo) {
    return {
        type: LOAD_COMPILEREPOTAG_DATA,
        payload: listinfo
    }
}

export function clearCodeBuildData() {
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

export function getCodeBuildTaskList(params={}) {
    return dispatch => {
        dispatch(startLoading());
      getAjax('/codebuild/task/', params, function(res) {
            dispatch(endLoading());
            if (res.data.code == 0) {
                dispatch(loadData(res.data.data))
            } else {
                notification.error({
                    description: res.data.msg,
                    message: "获取CodeBuildTaskList异常"
                })
            }
        })
    }
}

export function getUserCodeProjectList(params={}) {
    return dispatch => {
      getAjax('/codeinfo/usercodeproject/', params, function(res) {
            if (res.data.code == 0) {
                dispatch(loadCodeProjectData(res.data.data))
            } else {
                notification.error({
                    description: res.data.msg,
                    message: "获取Codeprojectlist异常"
                })
            }
        })
    }
}

export function getCodeBranchTagList(params={}) {
    return dispatch => {
      getAjax('/codeinfo/branchtag/', params, function(res) {
            if (res.data.code == 0) {
                dispatch(loadCodeBranchTagData(res.data.data))
            } else {
                notification.error({
                    description: res.data.msg,
                    message: "获取CodeBranchTagList异常"
                })
            }
        })
    }
}

export function getBaseRepoList(params={}) {
    return dispatch => {
      getAjax('/harbor/baserepo/', params, function(res) {
            if (res.data.code == 0) {
                dispatch(loadBaseRepoData(res.data.data))
            } else {
                notification.error({
                    description: res.data.msg,
                    message: "获取BaseRepoList异常"
                })
            }
        })
    }
}

export function getBaseRepoTagList(params={}) {
    return dispatch => {
      getAjax('/harbor/repositories/tags/', params, function(res) {
            if (res.data.code == 0) {
                dispatch(loadBaseRepoTagData(res.data.data))
            } else {
                notification.error({
                    description: res.data.msg,
                    message: "获取BaseRepoTagList异常"
                })
            }
        })
    }
}

export function getCompileRepoList(params={}) {
    return dispatch => {
      getAjax('/harbor/compilerepo/', params, function(res) {
            if (res.data.code == 0) {
                dispatch(loadCompileRepoData(res.data.data))
            } else {
                notification.error({
                    description: res.data.msg,
                    message: "获取CompileRepoList异常"
                })
            }
        })
    }
}

export function getCompileRepoTagList(params={}) {
    return dispatch => {
      getAjax('/harbor/repositories/tags/', params, function(res) {
            if (res.data.code == 0) {
                dispatch(loadCompileRepoTagData(res.data.data))
            } else {
                notification.error({
                    description: res.data.msg,
                    message: "获取CompileRepoTagList异常"
                })
            }
        })
    }
}
