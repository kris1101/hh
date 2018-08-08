import React, { Component } from 'react';

import VM_Machine from '../components/vm/machine/machinelist';

const vm_routes={
        exact: true,
        path: '/vm/machine',
        component: VM_Machine,
    }
export default vm_routes;
