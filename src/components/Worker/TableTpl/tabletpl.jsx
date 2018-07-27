import React, { Component } from 'react';

export function getColumns() {
    return [{
        title: '序号',
        dataIndex: 'key',
    }, {
        title: '施工队名称',
        dataIndex: 'workerTeam'
    }, {
        title: '人数',
        dataIndex: 'memberNum',
    }, {
        title: '开始时间',
        dataIndex: 'startTime',
    },{
        title: '结束时间',
        dataIndex: 'endTime',
    },{
        title: '施工状态',
        dataIndex: 'workerStatus',
    },{
        title: '创建时间',
        dataIndex: 'createTime',
    },{
        title: '更新时间',
        dataIndex: 'repeatTime',
    },{
        title: '操作',
        render: (data) => (
            <div>
                <span style={{cursor:'pointer',color:'#0350CF',marginRight:30}} onClick={(e) => this.openModal(data, e)}>编辑</span>
                <span style={{cursor:'pointer',color:'#FB2A40',marginRight:30}}>查看</span>
                <span style={{cursor:'pointer',color:'#0350CF',marginRight:30}}>添加</span>
                <span style={{cursor:'pointer',color:'#0350CF'}}>导入</span>
            </div>
        )
    }];
}