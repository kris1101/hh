import React, { Component } from 'react';
import { Button } from 'antd';

import { formatStrDate } from '../../../../utils/time_helper'

export function getlogs() {
    return [{
        title: '用户名',
        dataIndex: 'username'
    }, {
        title: '镜像名称',
        dataIndex: 'repo_name'
    },{
        title: '标签',
        dataIndex: 'repo_tag',
    },{
        title: '操作',
        dataIndex: 'operation',
    }, {
        title: '操作时间',
        dataIndex: 'op_time',
        render: (data) => formatStrDate(data)
    }];
}
