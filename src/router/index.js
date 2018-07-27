import React, { Component } from 'react';
import Home from '../components/Index/index.jsx';
import Device from '../components/DeviceManage/devicelist.jsx';
import AddDevice from '../components/AddDevice/adddevice.jsx';
import Area from '../components/AreaManage/arealist.jsx';
import User from '../components/UserManage/userlist.jsx';
import UserList from '../components/UserList/userlist.jsx';
import AddRole from '../components/AddRole/addrole.jsx';
import EmailModal from '../components/EmailList/emaillist.jsx';
import AlarmSet from '../components/AlarmSet/alarmset.jsx';
import Employees from '../components/Employees/employees.jsx';
import Worker from '../components/Worker/worker.jsx';
import Visitors from '../components/Visitors/visitors.jsx';
import Attendance from '../components/AttendanceManage/attendance.jsx';

const routes = [
    {
        exact: true,
        path: '/',
        component: Home,
    },{
        exact: true,
        path: '/config/device',
        component: Device,
    },{
        exact: true,
        path: '/config/add-device',
        component: AddDevice,
    },{
        exact: true,
        path: '/config/area',
        component: Area,
    },{
        exact: true,
        path: '/config/user',
        component: User,
    },{
        exact: true,
        path: '/config/userlist',
        component: UserList,
    },{
        exact: true,
        path: '/config/addrole',
        component: AddRole,
    },{
        exact: true,
        path: '/config/emaillist',
        component: EmailModal,
    },{
        exact: true,
        path: '/config/alarm',
        component: AlarmSet,
    },{
        exact: true,
        path: '/config/employees',
        component: Employees,
    },{
        exact: true,
        path: '/config/worker',
        component: Worker,
    },{
        exact: true,
        path: '/config/visitors',
        component: Visitors,
    },{
        exact: true,
        path: '/attendance',
        component: Attendance,
    }



]

export default routes;
