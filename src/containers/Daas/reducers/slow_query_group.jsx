import { SLOWQUERYGROUPFETCH } from '../constants';

const initState={
    redirectTo:'',
    msg:'',
    total: 0,
    loading: false,
    groupsList:[]
}

export function daasSlowQueryGroup(state=initState, action){
  switch(action.type){
    case SLOWQUERYGROUPFETCH:
        return {
            ...state,
            groupsList: action.groups,
            total: action.groups.data.length,
        };
    default:
        return {
            ...state, 
        };
  }
}
