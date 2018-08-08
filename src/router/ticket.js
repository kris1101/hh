import React, { Component } from 'react';

import Ticket_Wait from '../components/ticket/wait/waitlist'
const ticket_routes=[{
        exact: true,
        path: '/ticket/wait',
        component: Ticket_Wait,
    },
    ]
export default ticket_routes;
