import { combineReducers } from 'redux';

import todos from '../containers/Todo/_reducer';
import { setCounter, test } from '../containers/Index/_reducer';
import { httpData } from '../services/vm';
import { harborProject } from '../containers/Paas/harbor/project.redux'
import { harborProjectDetails } from '../containers/Paas/harbor/projectdetails.redux'
import { harborLogs } from '../containers/Paas/harbor/logs.redux'
import { k8sCluster } from '../containers/Paas/k8s/k8scluster.redux'
import { k8sTiller } from '../containers/Paas/k8s/k8stiller.redux'
import { harborConfigurations } from '../containers/Paas/harbor/configurations.redux'
import { harborUser } from '../containers/Paas/harbor/user.redux'
import { daasGroups } from '../containers/Daas/groups.redux'


const App = combineReducers({
    todos,
    setCounter,
    test,
    httpData,
    k8sCluster,
    harborProject,
    harborLogs,
    daasGroups,
    k8sTiller,
    harborUser,
    harborConfigurations,
    harborProjectDetails,
});

export default App
