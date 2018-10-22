import { FETCHSLOWQUERYUSERS, SLOWQUERYUSERDETAIL } from '../constants';

const initState={
    redirectTo:'',
    msg:'',
    total: 0,
    loading: false,
    usersList:[]
}

export function daasSlowQueryUser(state=initState, action){
  switch(action.type){
    case FETCHSLOWQUERYUSERS:
        return {
            ...state,
            usersList: action.users,
            total: action.users.data.length,
        };
    case SLOWQUERYUSERDETAIL:
        return {
            ...state,
            usersList: action.user,
        }
    default:
        return {
            ...state, 
        };
  }
}
