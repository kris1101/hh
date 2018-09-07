import React, { Component } from 'react';
import { Menu, Dropdown, Icon, Button, Popconfirm, message } from 'antd';

import { Link  } from 'react-router-dom';
import { deleteAjax, putAjax  } from '../../../../../../utils/axios'

import { formatStrDate } from '../../../../../../utils/time_helper'

const roleDict = {1: "项目管理员", 2: "开发者", 3: "访客"}
const ButtonGroup = Button.Group;

function getMenuItem(record, thisarg) {
 return ( <Menu onClick={(e) => handleRoleMenuClick(e, record, thisarg)}>
    <Menu.Item key="1"><Icon type="user" />管理员</Menu.Item>
    <Menu.Item key="2"><Icon type="user" />开发者</Menu.Item>
    <Menu.Item key="3"><Icon type="user" />匿名者</Menu.Item>
  </Menu>)
};

function handleRoleMenuClick(e, record, thisarg) {
    const hide = message.loading('Action in progress..', 0);
    putAjax('/harbor/projectmember/', {project_id: record.project_id, user_id: record.id, role_id: e.key}, function(res){
      hide();
      if(res.data.code == 0){
          thisarg.handleProjectMemberQuery();
          message.success("更新成功");
      }else{
          message.error("更新失败");
          console.log(res.data.msg);
      }
    })
}

function confirm(record, _that) {
  const hide = message.loading('Action in progress..', 0);
  deleteAjax('/harbor/projectmember/', "project_id=" + record.project_id + "&user_id=" + record.id, function (res){
    hide();
    if(res.data.code == 0){
        message.success(res.data.msg);
        _that.handleProjectMemberListWithArgs();
    }else{
        message.error(res.data.msg);
    }
  })
}


export function getprojectmembers() {
    return [{
        title: '名称',
        dataIndex: 'entity_name'
    },{
        title: '角色',
        dataIndex: 'role_name',
        render: (data, record, index) => (roleDict[record.role_id])
    },{
        title: '操作',
        render: (data, record, index) => {
            return (
            <div>
              <Popconfirm title={"Are you sure delete " + record.entity_name + " member?"} onConfirm={() => confirm(record, this)} okText="是" cancelText="否">
            <Button disabled={record.entity_name == "admin" ? true : false }><Icon type="delete" />删除</Button>
              </Popconfirm>
    		<Dropdown disabled={record.entity_name == "admin" ? true : false } overlay={getMenuItem(record, this)}>
    		  <Button style={{ marginLeft: 8 }}>
    		    设置角色 <Icon type="down" />
    		  </Button>
    		</Dropdown>
        </div>
        )}
    }];
}
