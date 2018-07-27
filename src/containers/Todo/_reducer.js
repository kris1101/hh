// import {
//     ADD_COUNT,
// } from './_action'

// const $$initStat = {
//     count: 0,
// }

// const todos = ($$state = $$initStat, action) => {
//     switch (action.type) {
//         case ADD_COUNT:
//             return Object.assign($$state, {
//                 count: $$state.count + 1,
//             });
//         default:
//             return $$state;
//     }
// }

// export default todos;


export default function todos(state = [], action) {
    switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text])
    default:
      return state
    }
  }