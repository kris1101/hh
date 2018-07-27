import React, { Component } from 'react';

export function getColumns() {
    return [{
        title: '序号',
        dataIndex: 'key',
    }, {
        title: 'ID',
        dataIndex: 'id'
    }, {
        title: '用户名',
        dataIndex: 'userName',
    }, {
        title: '姓名',
        dataIndex: 'name',
    },{
        title: '角色',
        dataIndex: 'roleName',
    },{
        title: '邮箱',
        dataIndex: 'email',
    },{
        title: '状态',
        dataIndex: 'status',
        render: (data) => (
            <div>
                <span style={{cursor:'pointer',color:'#FB2A40',marginRight:30}}>冻结</span>
                <span style={{cursor:'pointer',color:'#6FCA43'}}>正常</span>
            </div>
        )
    },{
        title: '操作',
        render: (data) => (
            <div>
                <span style={{cursor:'pointer',color:'#0350CF',marginRight:30}} onClick={(e) => this.openModal(data, e)}>编辑</span>
                <span style={{cursor:'pointer',color:'#0350CF',marginRight:30}}>重置密码</span>
                <span style={{cursor:'pointer',color:'#0350CF'}}>冻结</span>
            </div>
        )
    }];
}