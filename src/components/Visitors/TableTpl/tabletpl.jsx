import React, { Component } from 'react';

export function getColumns() {
    return [{
        title: '序号',
        dataIndex: 'key',
    }, {
        title: '姓名',
        dataIndex: 'name'
    }, {
        title: '联系方式',
        dataIndex: 'contact',
    }, {
        title: '身份证号',
        dataIndex: 'cardID',
    },{
        title: '创建时间',
        dataIndex: 'createTime',
    },{
        title: '结束时间',
        dataIndex: 'endTime',
    },{
        title: '接待部门',
        dataIndex: 'partment',
    },{
        title: '接待人员',
        dataIndex: 'member',
    },{
        title: '访问理由',
        dataIndex: 'visitorReason',
    },{
        title: '头像',
        dataIndex: 'headImg',
    },{
        title: '操作',
        render: (data) => (
            <div>
                <span style={{cursor:'pointer',color:'#0350CF',marginRight:30}} onClick={(e) => this.openModal(data,e)}>编辑</span>
                <span style={{cursor:'pointer',color:'#FB2A40'}}>删除</span>
            </div>
        )
    }];
}