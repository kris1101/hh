import React, { Component } from 'react';
import chart from '../../../../static/icons/area_chart.png'

export function getbinlogs() {
    return [{
        title: '备份主机',
        dataIndex: 'host',
    },{
        title: '宿主机',
        dataIndex: 'machine',
    }, {
        title: '实例端口',
        dataIndex: 'port'
    }, {
        title: '实例id',
        dataIndex: 'id',
    },{
        title: '上传状态',
        dataIndex: 'status',
    },{
        title: '更新时间',
        dataIndex: 'update',
    },{
        title: '操作',
        render: (data) => (
            <div>
                <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}}>详情</span>
            </div>
        )
    }];
}