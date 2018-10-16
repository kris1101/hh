import React, { Component } from 'react';

export function getusers() {
    return [{
        title: '编号',
        dataIndex: 'key',
    }, {
        title: '姓名',
        dataIndex: 'user_name'
    },{
        title: '部门',
        dataIndex: 'department'
    }, {
        title: '职位',
        dataIndex: 'duty',
    },{
        title: '邮箱',
        dataIndex: 'email',
    },{
        title: '手机号',
        dataIndex: 'telephone',
    },{
        title: '备注',
        dataIndex: 'comments',
    },{
        title: '操作',
        render: (data,record) => (
            <div>
                <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}} onClick={(e) => this.openModal(record, e)}>编辑</span>
                <span style={{cursor: 'pointer',color:'#0350CF'}}onClick={(e) => this.deleteData(data,e)}>删除</span>
            </div>
        )
    }];
}