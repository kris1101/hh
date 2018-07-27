import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';

import store from './redux/index';
// console.log(store.getState())

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// import React, {Component} from 'react'
// import PropTypes from 'prop-types'
// import ReactDOM from 'react-dom'
// import {createStore} from 'redux'
// import {Provider,connect} from 'react-redux'
//
// //Counter 是个UI组件
// class Counter extends Component {
//     render(){
//         const {value,onIncreaseClick} = this.props;
//         return (
//             <div>
//                 <span>{value}</span>
//                 <button onClick={onIncreaseClick}>Increase</button>
//             </div>
//         )
//     }
// }
//
// Counter.propTypes = {
//     value: PropTypes.number.isRequired,
//     onIncreaseClick: PropTypes.func.isRequired
// }
//
// //定义value到state映射
// function mapStateToProps(state){
//     return {
//         value: state.count
//     }
// }
// //定义onIncreaseClick到dispatch映射
// function mapDispatchToProps(dispatch){
//     return {
//         onIncreaseClick: () => dispatch(increaseAction)
//     }
// }
// //Action Creator
// const increaseAction = { type:'increase' }
//
// //使用connect方法生成容器组件App
// const App = connect (
//     mapStateToProps,
//     mapDispatchToProps
// )(Counter)
//
// //定义App这个组件的Reducer
// //Reducer
// function counter(state = {count:0},action){
//     const count = state.count
//     switch (action.type){
//         case 'increase':
//             return {count:count+1}
//         default:
//             return state
//     }
// }
//
// //最后生成store对象，并使用Provider在根组件外面包一层
// const store = createStore(counter)
//
// ReactDOM.render(
//     <Provider store={store}>
//         <App />
//     </Provider>,
//     document.getElementById('root')
// );