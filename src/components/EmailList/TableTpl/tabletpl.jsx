import React, { Component } from 'react';

export function getColumns() {
    return [{
        title: '序号',
        dataIndex: 'key',
    }, {
        title: '邮箱名称',
        dataIndex: 'id'
    }, {
        title: '创建时间',
        dataIndex: 'userName',
    }, {
        title: '邮件类型',
        dataIndex: 'name',
    },{
        title: '警报级别',
        dataIndex: 'roleName',
    },,{
        title: '操作',
        render: (data) => (
            <div>
                <span style={{cursor:'pointer',color:'#0350CF',marginRight:30}} onClick={(e) => this.openModal(data, e)}>编辑</span>
                <span style={{cursor:'pointer',color:'#FB2A40'}}>删除</span>
            </div>
        )
    }];
}