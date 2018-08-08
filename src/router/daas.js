import React, { Component } from 'react';

import Daas_Machine from '../components/daas/machine/machinelist';

const daas_routes=[
    {
        exact: true,
        path: '/daas/machine',
        component: Daas_Machine,
    },
    ]
export default daas_routes;
