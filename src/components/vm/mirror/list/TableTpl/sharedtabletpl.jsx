import React, { Component } from 'react';


export function getsharts() {
    return [{
        title: '名称',
        dataIndex: 'name',
    }, {
        title: '操作系统',
        dataIndex: 'mirror'
    }, {
        title: '创建时间',
        dataIndex: 'date',
    },{
        title: '标签',
        dataIndex: 'username',
    },{
        title: '状态',
        dataIndex: 'username',
    },{
        title: '操作',
        render: (data) => (
            <div>
                <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}}>创建实例</span>
                <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}}>删除</span>
                <span style={{cursor: 'pointer',color:'#0350CF'}}>添加标签</span>
            </div>
        )
    }];
}