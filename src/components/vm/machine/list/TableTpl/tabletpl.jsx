import React from 'react';
import { Menu,Dropdown } from 'antd';
import chart from '../../../../../static/icons/area_chart.png'
import '../machinelist.less';

const menu = (
    <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">制作镜像</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">在线升级配置</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">冷重启</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">重装系统</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">编辑防火墙</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">设置弹性IP</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">删除</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">分配至项目</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">添加便签</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">生成快照</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">挂载数据盘</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">在线迁移</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">关机迁移</a>
    </Menu.Item>
  </Menu>
);

export function getmachines() {
    return [{
        title: '实例名称',
        dataIndex: 'name',
    }, {
        title: '监控',
        render:(data)=>(
            <a href="http://www.baidu.com"><img className="img" src={chart} alt="监控"/></a>
        )
    },{
        title: 'IP地址',
        dataIndex: 'ip'
    }, {
        title: '配置',
        dataIndex: 'config',
    },{
        title: '状态',
        dataIndex: 'type',
    },{
        title: '所属网络',
        dataIndex: 'network',
    },{
        title: '创建时间',
        dataIndex: 'date',
    },{
        title: '操作',
        render: (data) => (
            <div>
                <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}}>连接实例</span>
                <span style={{cursor: 'pointer',color:'#0350CF'}}>
                  <Dropdown overlay={menu}>
                  </Dropdown>
                </span>
            </div>
        )
    }];
}
