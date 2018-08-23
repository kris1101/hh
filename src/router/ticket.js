import React, { Component } from 'react';

import Ticket_Wait from '../components/ticket/ticket/list/waitlist'
import Ticket_Delete from '../components/ticket/ticket/list/deletelist'
import Ticket_Complete from '../components/ticket/ticket/list/completelist'
import Ticket_Cancel from '../components/ticket/ticket/list/cancellist'
import Ticket_Type from '../components/ticket/customize/list/typelist'
import Ticket_Object from '../components/ticket/customize/list/objectlist'
import Ticket_User from '../components/ticket/address/list/userlist'
import Ticket_Group from '../components/ticket/address/list/grouplist'


const ticket_routes=[
    {
        exact: true,
        path: '/ticket/wait',
        component: Ticket_Wait,
    },{
        exact: true,
        path: '/ticket/delete',
        component: Ticket_Delete,
    },{
        exact: true,
        path: '/ticket/complete',
        component: Ticket_Complete,
    },{
        exact: true,
        path: '/ticket/cancel',
        component: Ticket_Cancel,
    },{
        exact: true,
        path: '/ticket/type',
        component: Ticket_Type,
    },{
        exact: true,
        path: '/ticket/object',
        component: Ticket_Object,
    },{
        exact: true,
        path: '/ticket/user',
        component: Ticket_User,
    },{
        exact: true,
        path: '/ticket/group',
        component: Ticket_Group,
    },
]
export default ticket_routes;
