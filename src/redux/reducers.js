import {
    combineReducers
} from 'redux';

import todos from '../containers/Todo/_reducer';
import {
    setCounter,
    test
} from '../containers/Index/_reducer';
import {
    httpData
} from '../services/vm';
import {
    harborProject
} from '../containers/Paas/harbor/project.redux'
import {
    harborProjectDetails
} from '../containers/Paas/harbor/projectdetails.redux'
import {
    harborLogs
} from '../containers/Paas/harbor/logs.redux'
import {
    k8sCluster
} from '../containers/Paas/k8s/k8scluster.redux'
import {
    k8sTiller
} from '../containers/Paas/k8s/k8stiller.redux'
import {
    PaasCommon
} from '../containers/Paas/common/paascommon.redux'
import {
    harborConfigurations
} from '../containers/Paas/harbor/configurations.redux'
import {
    harborUser
} from '../containers/Paas/harbor/user.redux'
import {
    daasGroups
} from '../containers/Daas/groups.redux'
import {
    daasSlowQueryUser
} from '../containers/Daas/reducers/slow_query_user';

import {
    daasSlowQueryInstance
} from '../containers/Daas/reducers/slow_query_instance';
import {
    helmRepo
} from '../containers/Paas/k8s/k8shelmrepo.redux'
import {
    helmChart
} from '../containers/Paas/k8s/k8shelmchart.redux'
import {
    helmTaskState
} from '../containers/Paas/k8s/k8shelmtaskstate'
import {
    daasSlowQueryEmail
} from '../containers/Daas/reducers/slow_query_email';
import {
    daasSlowQueryGroup
} from '../containers/Daas/reducers/slow_query_group';
import {
    daasSlowQueryGroupUserRelationship
} from '../containers/Daas/reducers/slow_query_group_user_relationship';
import {
    daasSlowQueryInstanceGroupRelationship
} from '../containers/Daas/reducers/slow_query_instance_group_relationship';
import {
    helmRelease
} from '../containers/Paas/k8s/k8shelmrelease.redux';
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
    helmRepo,
    helmChart,
    helmRelease,
    PaasCommon,
    helmTaskState,
    harborUser,
    harborConfigurations,
    harborProjectDetails,
    daasSlowQueryUser,
    daasSlowQueryInstance,
    daasSlowQueryEmail,
    daasSlowQueryGroup,
    daasSlowQueryGroupUserRelationship,
    daasSlowQueryInstanceGroupRelationship,
});

export default App