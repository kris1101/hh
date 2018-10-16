import React, { Component } from 'react';

import VM_Machine from '../components/vm/machine/list/machinelist';
import VM_Recycle from '../components/vm/recycle/list/recyclelist';
import VM_Snapshot from "../components/vm/snapshot/list/list"
import VM_Backup from "../components/vm/snapshot/list/backlist"
import VM_Disk from "../components/vm/disk/list/list"
import VM_Disk_Backup from "../components/vm/disk/list/backlist"
import VM_Extend from "../components/vm/extend/list/list"
import VM_Network_Load from "../components/vm/networks/list/loadlist"

import VM_UserList from "../components/vm/accounts/UserList"
import VM_ProjectList from "../components/vm/accounts/ProjectList"
import VM_ProjectDetail from "../components/vm/accounts/ProjectDetail"
import VM_RoleList from "../components/vm/accounts/RoleList"
import VM_GroupList from "../components/vm/accounts/GroupList"
import VM_GroupMember from "../components/vm/accounts/GroupMemberList"
import VM_LogList from "../components/vm/accounts/LogList"

import VM_Key from "../components/vm/key/KeyList"
import VM_KeyCreate from "../components/vm/key/KeyCreate"

import VM_ImageList from "../components/vm/images/ImageList"

import VM_NetworkList from "../components/vm/networks/NetworkList"
import VM_NetworkDetail from "../components/vm/networks/NetworkDetail"
import VM_NetworkApprovalDetail from "../components/vm/networks/NetworkApprovalDetail"
import VM_SGList from "../components/vm/networks/SGList"
import VM_SGRuleList from "../components/vm/networks/SGRuleList"

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
    },{
        exact: true,
        path: '/vm/key',
        component: VM_Key,
    },{
        exact: true,
        path: '/vm/key/create',
        component: VM_KeyCreate,
    },{
        exact: true,
        path: '/vm/image',
        component: VM_ImageList,
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
        path: '/vm/networks/ip',
        component: VM_NetworkList,
    },
    {
        exact: true,
        path: '/vm/networks/load',
        component: VM_Network_Load,
    }, {
        exact: true,
        path: '/vm/networks/security_groups',
        component: VM_SGList,
    }, {
        exact: true,
        path: '/vm/networks/security_groups/:id/rules',
        component: VM_SGRuleList,
    }, {
        exact: true,
        path: '/vm/networks/network',
        component: VM_NetworkList,
    }, {
        exact: true,
        path: '/vm/networks/network/:id',
        component: VM_NetworkDetail,
    }, {
        exact: true,
        path: '/vm/networks/network/:id/approval',
        component: VM_NetworkApprovalDetail,
    }, {
        exact: true,
        path: '/vm/accounts/users',
        component: VM_UserList,
    },
    {
        exact: true,
        path: '/vm/accounts/groups',
        component: VM_GroupList,
    }, {
        exact: true,
        path: '/vm/accounts/groups/:id',
        component: VM_GroupMember,
    }, {
        exact: true,
        path: '/vm/accounts/projects',
        component: VM_ProjectList,
    }, {
        exact: true,
        path: '/vm/accounts/projects/:id',
        component: VM_ProjectDetail,
    }, {
        exact: true,
        path: '/vm/accounts/roles',
        component: VM_RoleList,
    }, {
        exact: true,
        path: '/vm/accounts/logs',
        component: VM_LogList,
    },

]
export default vm_routes;
