import React, { Component } from 'react';

export function getColumns() {
    return [{
        title: '序号',
        dataIndex: 'key',
    }, {
        title: 'ID',
        dataIndex: 'id'
    }, {
        title: '角色名称',
        dataIndex: 'roleName',
        width: 250
    },
    {
        title: '操作',
        render: () => (
            <div>
                <span style={{color:'#0350CF',marginRight:30}}>编辑</span>
                <span style={{color:'#FB2A40'}}>删除</span>
            </div>
        )
    }];
}