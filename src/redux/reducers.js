import { combineReducers } from 'redux';

import todos from '../containers/Todo/_reducer';
// import counter from '../containers/Index/_reducer';
// import * as counter from '../containers/Index/_reducer';
import { setCounter, test } from '../containers/Index/_reducer';
import { httpData } from '../services/vm';


const App = combineReducers({
    todos,
    setCounter,
    test,
    httpData,
});

export default App
