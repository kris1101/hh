import React, { Component } from 'react';

import VM_Machine from '../components/vm/machine/list/machinelist';
import VM_Recycle from '../components/vm/recycle/list/recyclelist';

const vm_routes=[{
        exact: true,
        path: '/vm/machine/list',
        component: VM_Machine,
    },
    {
        exact: true,
        path: '/vm/recycle/list',
        component: VM_Recycle,
    }
]
export default vm_routes;
