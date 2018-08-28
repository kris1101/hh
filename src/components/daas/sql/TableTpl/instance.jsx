import React, { Component } from 'react';
import chart from '../../../../static/icons/area_chart.png'

export function getinstances() {
    return [{
        title: '实例名称',
        dataIndex: 'name',
    }, {
        title: '监控',
        render:(data)=>(
            <a href="http://www.baidu.com"><img className="img" src={chart} alt="监控"/></a>
        )
    },{
        title: '实例端口',
        dataIndex: 'ip'
    }, {
        title: '工程',
        dataIndex: 'config',
    },{
        title: '运行状态',
        dataIndex: 'status',
    },{
        title: '创建时间',
        dataIndex: 'date',
    },{
        title: '操作',
        render: (data) => (
            <div>
                <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}}>详情</span>
                <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}}>编辑</span>
                <span style={{cursor: 'pointer',color:'#cf1f0f',marginRight:30}}>删除</span>
                <span style={{cursor: 'pointer',color:'#cf1f0f',marginRight:30}}>停止</span>
                <span style={{cursor: 'pointer',color:'#cf1f0f',marginRight:30}}>重启</span>
            </div>
        )
    }];
}