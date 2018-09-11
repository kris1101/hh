import React, { Component } from 'react';
import { Modal, Icon, Button, Popconfirm, message } from 'antd';

import { Link  } from 'react-router-dom';
import { deleteAjax, putAjax  } from '../../../../utils/axios'

import { formatStrDate } from '../../../../utils/time_helper'
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;

function showDeleteConfirm(user_id, _that) {
  confirm({
    title: '警告',
    content: '确定删除该用户吗?',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      console.log('OK');
      deleteUser(user_id, _that);
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

function showChangeAdminConfirm(user_id, has_admin_role, _that) {
  confirm({
    title: '警告',
    content: '确定修改用户权限吗?',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      changeUserAdmin(user_id, has_admin_role, _that);
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

function deleteUser(user_id, _that) {
  const hide = message.loading('Action in progress..', 0);
  deleteAjax('/harbor/user/', "user_id=" + user_id, function (res){
    hide();
    if(res.data.code == 0){
        message.success(res.data.msg);
        _that.handleHarborUserListWithArgs(1, 10);
    }else{
        message.error(res.data.msg);
    }
  })
}

function changeUserAdmin(user_id, has_admin_role, _that) {
  const hide = message.loading('Action in progress..', 0);
  putAjax('/harbor/users/sysadmin/', {user_id: user_id, has_admin_role: has_admin_role ? 0 : 1}, function (res){
    hide();
    if(res.data.code == 0){
        message.success(res.data.msg);
        _that.handleHarborUserListWithArgs(1, 10);
    }else{
        message.error(res.data.msg);
    }
  })
}

export function getharborusers() {
    return [{
        title: '用户名称',
        dataIndex: 'username',
    }, {
        title: '管理员',
        dataIndex: 'has_admin_role',
        render: (data) =>( data ? "是":"否" ) 
    },{
        title: '邮件',
        dataIndex: 'email',
    }, {
        title: '注册时间',
        dataIndex: 'creation_time',
        render: (data) => formatStrDate(data)
    },{
        title: '操作',
        render: (data, record, index) => {
            return record.has_admin_role ? (
        <ButtonGroup>
          <Button onClick={() => {showDeleteConfirm(record.user_id, this)}}><Icon type="delete"/>删除</Button>
          <Button onClick={() => {showChangeAdminConfirm(record.user_id, record.has_admin_role, this)}}><Icon type="setting" />取消管理员</Button>
        </ButtonGroup>
        ):(
        <ButtonGroup>
          <Button onClick={() => {showDeleteConfirm(record.user_id, this)}}><Icon type="delete"/>删除</Button>
          <Button onClick={() => {showChangeAdminConfirm(record.user_id, record.has_admin_role, this)}}><Icon type="setting" />设置管理员</Button>
        </ButtonGroup>
      )}
    }];
}
