import { RDBPROJECTFETCH } from '../constants';

const initState={
    redirectTo:'',
    msg:'',
    total: 0,
    loading: false,
    projectsList:[]
}

export function daasRdbProject(state=initState, action){
  switch(action.type){
    case RDBPROJECTFETCH:
        return {
            ...state,
            projectsList: action.projects,
            total: action.projects.length,
        };
    default:
        return {
            ...state, 
        };
  }
}
