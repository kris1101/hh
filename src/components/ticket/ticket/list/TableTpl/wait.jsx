import React from 'react';
import { Menu,Dropdown,Icon,message } from 'antd';

function handleMenuClick(e) {
  message.info('Click on menu item.');
  console.log('click', e);
}
const menu = (
    <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">
        编辑
    </Menu.Item>
    <Menu.Item key="2">
      接受
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">详情</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="4">
     撤销
    </Menu.Item>
    <Menu.Item key="5">
      删除
    </Menu.Item>
  </Menu>
);

export function getwaits() {
    return [{
        title: '编号',
        dataIndex: 'key',
    }, {
        title: '名称',
        dataIndex: 'title'
    },{
        title: '类型',
        dataIndex: 'ticket_type'
    }, {
        title: '优先级',
        dataIndex: 'priority',
    },{
        title: '申请日期',
        dataIndex: 'create_time',
    },{
        title: '发起人',
        dataIndex: 'create_user',
    },{
        title: '受理人',
        dataIndex: 'handler_user',
    },{
        title: '状态',
        dataIndex: 'status',
    },{
        title: '操作',
        render: (data,record) => (
            <div>
                <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}} onClick={(e) => this.openModal(record, e)}>指派</span>
                <span style={{cursor: 'pointer',color:'#0350CF'}}>
                <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link" href="">
                      更多 <Icon type="down" />
                    </a>
                  </Dropdown>
                </span>
            </div>
        )
    }];
}