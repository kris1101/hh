import React, {Component} from 'react'
import { connect } from 'react-redux'; 

import store from '../../redux/index';
  
class Sum extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        }
        this.counterAdd = this.counterAdd.bind(this);
        this.counterSub = this.counterSub.bind(this);
    }

    componentDidMount() {
        //获取state
        // console.log(store.getState()['setCounter'].count)
        // store.subscribe(() => this.setState({count: store.getState()['counter']}))
        // store.subscribe(() => this.setState({
        //     asyncNumber: store.getState()['asyncNumber'],
        //     loadStatus: store.getState()['loadStatus']
        // }))

    }

    counterAdd() {
        store.dispatch({ type: 'increase' });
    }

    counterSub() {
        store.dispatch({type: 'decrease'});
    }

    render() {
        return (
            <div>
                <h1>current Number is：{store.getState()['setCounter'].count}</h1>
                <button onClick={this.counterAdd}>增+</button>
                <button onClick={this.counterSub}>减-</button>
            </div>
        )
    }
}

export default connect((state)=>{
    return {...state};
})(Sum);

