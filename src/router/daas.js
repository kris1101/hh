import React, { Component } from 'react';

import Daas_Instance from '../components/daas/sql/Instance';
import Daas_Cluster from '../components/daas/sql/cluster';
import Daas_Backup from '../components/daas/sql/backup';
import Daas_Binlog from '../components/daas/sql/binlog';
import Daas_Email from '../components/daas/sql/email';
import Daas_Group from '../components/daas/sql/group';
import Daas_Machine from '../components/daas/sql/machine';
import Daas_User from '../components/daas/sql/user';


const daas_routes=
    [{
        exact: true,
        path: '/daas/instance',
        component: Daas_Instance,
    },{
        exact: true,
        path: '/daas/cluster',
        component: Daas_Cluster,
    },{
        exact: true,
        path: '/daas/backup',
        component: Daas_Backup,
    },{
        exact: true,
        path: '/daas/binlog',
        component: Daas_Binlog,
    },{
        exact: true,
        path: '/daas/email',
        component: Daas_Email,
    },{
        exact: true,
        path: '/daas/group',
        component: Daas_Group,
    },{
        exact: true,
        path: '/daas/machine',
        component: Daas_Machine,
    },{
        exact: true,
        path: '/daas/user',
        component: Daas_User,
    }]
export default daas_routes;
