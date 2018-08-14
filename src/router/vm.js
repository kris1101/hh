import React, { Component } from 'react';

import VM_Machine from '../components/vm/machine/list/machinelist';
import VM_Recycle from '../components/vm/recycle/list/recyclelist';
import VM_Snapshot from "../components/vm/snapshot/list/list"
import VM_Backup from "../components/vm/snapshot/backlist/list"

const vm_routes=[{
        exact: true,
        path: '/vm/machine',
        component: VM_Machine,
    },
    {
        exact: true,
        path: '/vm/recycle',
        component: VM_Recycle,
    },
    {
        exact: true,
        path: '/vm/snapshot',
        component: VM_Snapshot,
    },
    {
        exact: true,
        path: '/vm/backup',
        component: VM_Backup,
    },
]
export default vm_routes;
