import React, { Component } from 'react';

export function getColumns() {
    return [{
        title: '序号',
        dataIndex: 'key',
    }, {
        title: '考勤月份',
        dataIndex: 'month'
    }, {
        title: '部门',
        dataIndex: 'part',
    }, {
        title: '组别',
        dataIndex: 'group',
    },{
        title: '考勤设置',
        dataIndex: 'set',
    },{
        title: '生成/更新日期',
        dataIndex: 'time',
    },{
        title: '查看次数',
        dataIndex: 'checkTimes',
    },{
        title: '下载次数',
        dataIndex: 'downloadTimes',
    },{
        title: '操作',
        render: (data) => (
            <div>
                <span style={{cursor:'pointer',color:'#0350CF',marginRight:30}} onClick={(e) => this.openModal(data, e)}>查看</span>
                <span style={{cursor:'pointer',color:'#0350CF'}}>下载</span>
            </div>
        )
    }];
}