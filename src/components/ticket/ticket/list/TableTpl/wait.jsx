import React, { Component } from 'react';
import { Menu,Dropdown,Icon } from 'antd';


const menu = (
    <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">编辑</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">接受</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">详情</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">撤销</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">删除</a>
    </Menu.Item>
  </Menu>
);

export function getwaits() {
    return [{
        title: '编号',
        dataIndex: 'id',
    }, {
        title: '名称',
        dataIndex: 'name'
    },{
        title: '类型',
        dataIndex: 'type'
    }, {
        title: '优先级',
        dataIndex: 'priority',
    },{
        title: '申请日期',
        dataIndex: 'date',
    },{
        title: '发起人',
        dataIndex: 'sponsor',
    },{
        title: '受理人',
        dataIndex: 'assignee',
    },{
        title: '状态',
        dataIndex: 'status',
    },{
        title: '操作',
        render: (data) => (
            <div>
                <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}}>指派</span>
                <span style={{cursor: 'pointer',color:'#0350CF'}}>
                <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link" href="#">
                      更多 <Icon type="down" />
                    </a>
                  </Dropdown>
                </span>
            </div>
        )
    }];
}