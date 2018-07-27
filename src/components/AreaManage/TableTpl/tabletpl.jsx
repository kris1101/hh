import React, { Component } from 'react';

export function getColumns() {
    return [{
        title: '序号',
        dataIndex: 'key',
    }, {
        title: '区域名称',
        dataIndex: 'areaName'
    }, {
        title: '摄像头计划数量',
        dataIndex: 'planNum',
    },{
        title: '已配置数量',
        dataIndex: 'configNum',
    },{
        title: '配置状态',
        dataIndex: 'configStatus',
    },{
        title: '操作',
        render: (data) => (
            <div>
                <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}} onClick={(e) => this.openModal(data, e)}>编辑</span>
                <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}}>配置</span>
                <span style={{cursor: 'pointer',color:'#FB2A40'}}>删除</span>
            </div>
        )
    }];
}