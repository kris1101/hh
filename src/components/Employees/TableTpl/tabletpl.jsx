import React, { Component } from 'react';

export function getColumns() {
    return [{
        title: '序号',
        dataIndex: 'key',
    }, {
        title: '部门名称',
        dataIndex: 'partmentName'
    }, {
        title: '分组数量',
        dataIndex: 'groupName',
    }, {
        title: '部门详情',
        render: (data) => {
            return (
                <span style={{cursor:'pointer',color:'#0350CF'}} onClick={(e) => this.openModal2(data, "view")}>查看</span>
            )
        }
    },{
        title: '员工数量',
        dataIndex: 'memberNum',
    },{
        title: '创建时间',
        dataIndex: 'createTime',
    },{
        title: '更新时间',
        dataIndex: 'repeatTime',
    },{
        title: '部门状态',
        dataIndex: 'status',
    },{
        title: '操作',
        render: (data) => (
            <div>
                <span style={{cursor:'pointer',color:'#0350CF',marginRight:30}} onClick={(e) => this.openModal2(data, "edit")}>编辑</span>
                <span style={{cursor:'pointer',color:'#FB2A40',marginRight:30}}>冻结</span>
                <span style={{cursor:'pointer',color:'#0350CF',marginRight:30}}>详情</span>
                <span style={{cursor:'pointer',color:'#0350CF',marginRight:30}}>添加</span>
                <span style={{cursor:'pointer',color:'#0350CF'}}>导入</span>
            </div>
        )
    }];
}