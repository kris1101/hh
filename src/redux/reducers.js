import { combineReducers } from 'redux';

import todos from '../containers/Todo/_reducer';
import { setCounter, test } from '../containers/Index/_reducer';
import { httpData } from '../services/vm';
import { harborProject } from '../containers/Paas/harbor/project.redux'
import { harborProjectDetails } from '../containers/Paas/harbor/projectdetails.redux'
import { harborLogs } from '../containers/Paas/harbor/logs.redux'


const App = combineReducers({
    todos,
    setCounter,
    test,
    httpData,
    harborProject,
    harborLogs,
    harborProjectDetails,
});

export default App
