import React, { Component } from 'react';

import Daas_Machine from '../components/daas/machine/machinelist';
import  SlowQuery_Group from '../components/daas/slowquery/grouplist';
import  SlowQuery_User from '../components/daas/slowquery/userlist';

const daas_routes=
    [{
        exact: true,
        path: '/daas/machine',
        component: Daas_Machine,
    },
    {
        exact: true,
        path: '/daas/slowquery/grouplist',
        component: SlowQuery_Group,
    },
    {
        exact: true,
        path: '/daas/slowquery/userlist',
        component: SlowQuery_User,
    },

]
export default daas_routes;
