import React, { Component } from 'react';
import { Menu,Dropdown,Icon } from 'antd';
import chart from '../../../../../static/icons/area_chart.png'

export function getsnapshots() {
    return [{
        title: '名称',
        dataIndex: 'name',
    }, {
        title: '关联主机',
        dataIndex: 'host'
    }, {
        title: '创建时间',
        dataIndex: 'date',
    },{
        title: '备份策略',
        dataIndex: 'back',
    },{
        title: '状态',
        dataIndex: 'status',
    },{
        title: '保留周期',
        dataIndex: 'save',
    },{
        title: '用户名称',
        dataIndex: 'username',
    },{
        title: '操作',
        render: (data) => (
            <div>
                <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}}>编辑</span>
                <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}}>删除</span>
            </div>
        )
    }];
}