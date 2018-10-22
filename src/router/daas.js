import Daas_RDB_Instance from '../components/daas/sql/instance/instance';
import Daas_RDB_Project from '../components/daas/sql/project/project';
import Daas_RDB_Cluster from '../components/daas/sql/cluster/cluster';
import Daas_Backup from '../components/daas/sql/backup';
import Daas_Binlog from '../components/daas/sql/binlog';
import Daas_Verify from '../components/daas/sql/verify';
// import Daas_Group from '../components/daas/slowquery/group';
import Daas_Group from '../components/daas/sql/group';
import Daas_User from '../components/daas/sql/user';
import Daas_Email from '../components/daas/sql/email';
import Daas_Parameter from '../components/daas/sql/parameter';
import Daas_Machine from '../components/daas/sql/machine';
import Daas_SlowQuery_User from '../components/daas/slowquery/user';
import Daas_SlowQuery_Instance from '../components/daas/slowquery/instance';
import Daas_SlowQuery_Email from '../components/daas/slowquery/email';
import Daas_SlowQuery_Group from '../components/daas/slowquery/group';

const daas_routes =
    [{
        exact: true,
        path: '/daas/rdb/instance',
        component: Daas_RDB_Instance,
    }, {
        exact: true,
        path: '/daas/rdb/project',
        component: Daas_RDB_Project,
    }, {
        exact: true,
        path: '/daas/rdb/cluster',
        component: Daas_RDB_Cluster,
    }, {
        exact: true,
        path: '/daas/backup',
        component: Daas_Backup,
    }, {
        exact: true,
        path: '/daas/binlog',
        component: Daas_Binlog,
    }, {
        exact: true,
        path: '/daas/verify',
        component: Daas_Verify,
    }, {
        exact: true,
        path: '/daas/group',
        component: Daas_Group,
    }, {
        exact: true,
        path: '/daas/user',
        component: Daas_User,
    }, {
        exact: true,
        path: '/daas/email',
        component: Daas_Email,
    }, {
        exact: true,
        path: '/daas/parameter',
        component: Daas_Parameter,
    }, {
        exact: true,
        path: '/daas/machine',
        component: Daas_Machine,
    }, {
        exact: true,
        path: '/daas/slowquery/user',
        component: Daas_SlowQuery_User,
    }, {
        exact: true,
        path: '/daas/slowquery/instance',
        component: Daas_SlowQuery_Instance,
    }, {
        exact: true,
        path: '/daas/slowquery/email',
        component: Daas_SlowQuery_Email,
    }, {
        exact: true,
        path: '/daas/slowquery/group',
        component: Daas_SlowQuery_Group,
    }]
export default daas_routes;