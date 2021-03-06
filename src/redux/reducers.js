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
    RDBInstanceBackup
} from '../containers/Daas/reducers/rdb_backup_info';
import {
    RDBInstanceBinlog
} from '../containers/Daas/reducers/rdb_binlog_info';
import {
    helmRepo
} from '../containers/Paas/k8s/k8shelmrepo.redux'
import {
    helmChart
} from '../containers/Paas/k8s/k8shelmchart.redux'
import {
    helmTaskState
} from '../containers/Paas/k8s/k8shelmtaskstate.redux'
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

import {
    paasCodeBase
} from '../containers/Paas/k8s/paascodebase.redux';
import {
    paasCodeBuild
} from '../containers/Paas/k8s/paascodebuild.redux';
import {
    daasRdbInstance
} from '../containers/Daas/reducers/rdb_instance';
import {
    daasRdbProject
} from '../containers/Daas/reducers/rdb_project';
import {
    daasRdbCluster
} from '../containers/Daas/reducers/rdb_cluster';
import {
    daasRdbClusterInstanceRelationship
} from '../containers/Daas/reducers/rdb_cluster_instance_relationship';
import {
    daasRdbHost
} from '../containers/Daas/reducers/rdb_host';
import {
    daasRdbHostInstanceRelationship
} from '../containers/Daas/reducers/rdb_host_instance_relationship';
import {
    paasBuildHistory
} from '../containers/Paas/k8s/paasbuildhistory';
import {
    k8sNode 
} from '../containers/Paas/k8s/k8snodemanagement.redux';
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
    paasCodeBase,
    paasCodeBuild,
    helmRepo,
    helmChart,
    helmRelease,
    PaasCommon,
    paasBuildHistory,
    helmTaskState,
    harborUser,
    k8sNode,
    harborConfigurations,
    harborProjectDetails,
    daasSlowQueryUser,
    daasSlowQueryInstance,
    daasSlowQueryEmail,
    daasSlowQueryGroup,
    daasSlowQueryGroupUserRelationship,
    daasSlowQueryInstanceGroupRelationship,
    daasRdbInstance,
    daasRdbProject,
    daasRdbCluster,
    RDBInstanceBackup,
    RDBInstanceBinlog,
    daasRdbClusterInstanceRelationship,
    daasRdbHost,
    daasRdbHostInstanceRelationship,
});

export default App
