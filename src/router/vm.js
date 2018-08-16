import React, { Component } from 'react';

import VM_Machine from '../components/vm/machine/list/machinelist';
import VM_Recycle from '../components/vm/recycle/list/recyclelist';
import VM_Snapshot from "../components/vm/snapshot/list/list"
import VM_Backup from "../components/vm/snapshot/backlist/list"
import VM_Mirror from "../components/vm/mirror/list/list"
import VM_Disk from "../components/vm/disk/list/list"
import VM_Extend from "../components/vm/extend/list/list"
import VM_Network from "../components/vm/network/list/list"


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
    {
        exact: true,
        path: '/vm/mirror',
        component: VM_Mirror,
    },
    {
        exact: true,
        path: '/vm/disk',
        component: VM_Disk,
    },
    {
        exact: true,
        path: '/vm/extend',
        component: VM_Extend,
    },
    {
        exact: true,
        path: '/vm/network',
        component: VM_Network,
    },
]
export default vm_routes;
