import React, { Component } from 'react';

export function getColumns() {
    return [{
        title: '序号',
        dataIndex: 'key',
    }, {
        title: 'IP地址',
        dataIndex: 'ip'
    }, {
        title: '设备编号',
        dataIndex: 'deviceId',
    },{
        title: '设备型号',
        dataIndex: 'model',
    },{
        title: '端口号',
        dataIndex: 'portNum',
    },{
        title: '协议',
        dataIndex: 'agreement',
    },{
        title: '设备状态',
        dataIndex: 'status',
        render: (data) => (
            <div>
                <span style={{color:'#6FCA43'}}>在线</span>
            </div>
        )
    },{
        title: '操作',
        render: (data) => (
            <div>
                <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}}>查看</span>
                <span style={{cursor: 'pointer',color:'#0350CF'}}>添加</span>
            </div>
        )
    }];
}