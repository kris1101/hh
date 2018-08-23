import React, { Component } from 'react';

export function getusers() {
    return [{
        title: '编号',
        dataIndex: 'id',
    }, {
        title: '姓名',
        dataIndex: 'name'
    },{
        title: '部门',
        dataIndex: 'department'
    }, {
        title: '职位',
        dataIndex: 'post',
    },{
        title: '邮箱',
        dataIndex: 'email',
    },{
        title: '手机号',
        dataIndex: 'phone',
    },{
        title: '备注',
        dataIndex: 'ps',
    },{
        title: '操作',
        render: (data) => (
            <div>
                <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}}>编辑</span>
                <span style={{cursor: 'pointer',color:'#0350CF'}}>删除</span>
            </div>
        )
    }];
}