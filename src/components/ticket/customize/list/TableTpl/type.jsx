import React, { Component } from 'react';

export function gettypes() {
    return [{
        title: '编号',
        dataIndex: 'id',
    }, {
        title: '名称',
        dataIndex: 'name'
    },{
        title: '类型',
        dataIndex: 'type'
    }, {
        title: '创建人',
        dataIndex: 'create',
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