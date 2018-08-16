import React, { Component } from 'react';

import VM_Machine from '../components/vm/machine/list/machinelist';
import VM_Recycle from '../components/vm/recycle/list/recyclelist';
import VM_Snapshot from "../components/vm/snapshot/list/list"
import VM_Backup from "../components/vm/snapshot/list/backlist"
import VM_Mirror from "../components/vm/mirror/list/list"
import VM_Disk from "../components/vm/disk/list/list"
import VM_Disk_Backup from "../components/vm/disk/list/backlist"
import VM_Extend from "../components/vm/extend/list/list"
import VM_Network_IP from "../components/vm/network/list/iplist"
import VM_Network_Load from "../components/vm/network/list/loadlist"
import VM_Network_Safety from "../components/vm/network/list/safetylist"
import VM_Network_virtual from "../components/vm/network/list/virtuallist"


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
    },{
        exact: true,
        path: '/vm/disk/backup',
        component: VM_Disk_Backup,
    },
    {
        exact: true,
        path: '/vm/extend',
        component: VM_Extend,
    },
    {
        exact: true,
        path: '/vm/network/ip',
        component: VM_Network_IP,
    },
    {
        exact: true,
        path: '/vm/network/load',
        component: VM_Network_Load,
    },
    {
        exact: true,
        path: '/vm/network/safety',
        component: VM_Network_Safety,
    },
    {
        exact: true,
        path: '/vm/network/virtual',
        component: VM_Network_virtual,
    },
]
export default vm_routes;
