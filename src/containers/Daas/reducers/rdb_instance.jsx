import { RDBINSTANCEFETCH } from '../constants';

const initState={
    redirectTo:'',
    msg:'',
    total: 0,
    loading: false,
    instancesList:[]
}

export function daasRdbInstance(state=initState, action){
  switch(action.type){
    case RDBINSTANCEFETCH:
        return {
            ...state,
            instancesList: action.instances,
            total: action.instances.length,
        };
    default:
        return {
            ...state, 
        };
  }
}
