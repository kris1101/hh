import React, { Component } from 'react';
import { Row, Col } from 'antd';
export function getemails() {
    return [{
        title: '组名',
        dataIndex: 'fields.group_name',
    },{
        title: '用户名',
        dataIndex: 'fields.user_name',
    },{
        title: '用户邮件',
        dataIndex: 'fields.user_email',
    },{ 
        title: '用户电话',
        dataIndex: 'fields.user_phone',
    },{ 
        title: '创建时间',
        dataIndex: 'fields.create_time',
    },{ 
        title: '创建时间',
        dataIndex: 'fields.update_time',
    },{ 
        title: '描述',
        dataIndex: 'fields.description',
    }];
}
