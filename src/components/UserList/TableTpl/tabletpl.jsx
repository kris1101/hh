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
        dataIndex: 'username',
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
        render: (text) => (
            <div>
                {text == 1 ?
                    <span style={{cursor: 'pointer', color: '#6FCA43'}}>正常</span>
                    :
                    <span style={{cursor: 'pointer', color: '#FB2A40'}}>冻结</span>
                }
            </div>
        )
    },{
        title: '操作',
        render: (text,record) => (
            <div>
                <span style={{cursor:'pointer',color:'#0350CF',marginRight:30}} onClick={(e) => this.openModal(record, e)}>编辑</span>
                <span style={{cursor:'pointer',color:'#0350CF',marginRight:30}} onClick={(e) => this.openPwdModal(record, e)}>重置密码</span>
                {record.status == 1 ?
                    <span style={{cursor: 'pointer', color: '#FB2A40',marginRight:30}}onClick={(e) => this.changeStatus(record.id,'0', e)}>冻结</span>
                    :
                    <span style={{cursor: 'pointer', color: '#0350CF',marginRight:30}}onClick={(e) => this.changeStatus(record.id,'1', e)}>解冻</span>
                }
                <span style={{cursor: 'pointer', color: '#FB2A40'}}onClick={(e) => this.deleteUser(record.id, e)}>删除</span>

            </div>
        )
    }];
}