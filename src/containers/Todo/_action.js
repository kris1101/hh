
// action types

export const ADD_COUNT = 'nums add 1';


// actions
export const addOne = (params = {}) => {
    return {
        type: ADD_COUNT,
        payload: params,
    }
}

