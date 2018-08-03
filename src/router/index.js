import React, { Component } from 'react';

import Machine from '../components/vm/machine/machinelist.jsx';



const routes=[{
        exact: true,
        path: '/vm/machine',
        component: Machine,
    },{
        exact: true,
        path: '/config/machine',
        component: Machine,
    },]
export default routes;
