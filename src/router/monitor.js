import React, { Component } from 'react';

import Monitor_Machine from '../components/monitor/machine/machinelist';

const monitor_routes=[
    {
        exact: true,
        path: '/monitor/machine',
        component: Monitor_Machine,
    },

    ]
export default monitor_routes;
