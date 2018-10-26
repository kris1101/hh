import React from 'react';
import { Button, Icon, Dropdown, Menu, Modal, message} from 'antd';
import  { formatStrDate } from '../../../../utils/time_helper'
import { deleteAjax, putAjax } from '../../../../utils/axios'
import { generateformdata } from '../../../../utils/tools_helper'

const confirm = Modal.confirm;

function disablenode(name, _that) {
  const hide = message.loading('请求处理中...', 0);
  putAjax('/k8s/node/cordon/', generateformdata({'name': name}), function (res){
    hide();
    if(res.data.code === 0){
        message.success(res.data.msg);
        _that.props.getNodeList({}, {'Cluster-Id': _that.ClusterSelectFormRef.props.form.getFieldValue('clustername')});
    }else{
        console.log(res.data.msg);
        message.error("处理失败");
    }
  }, {'Cluster-Id': _that.ClusterSelectFormRef.props.form.getFieldValue('clustername')})
}

function drainnode(name, _that) {
  const hide = message.loading('请求处理中...', 0);
  putAjax('/k8s/node/drain/', generateformdata({'name': name}), function (res){
    hide();
    if(res.data.code === 0){
        message.success(res.data.msg);
        _that.props.getNodeList({}, {'Cluster-Id': _that.ClusterSelectFormRef.props.form.getFieldValue('clustername')});
    }else{
        console.log(res.data.msg);
        message.error("处理失败");
    }
  }, {'Cluster-Id': _that.ClusterSelectFormRef.props.form.getFieldValue('clustername')})
}

function enablenode(name, _that) {
  const hide = message.loading('请求处理中...', 0);
  deleteAjax('/k8s/node/cordon/', 'name=' + name, function (res){
    hide();
    if(res.data.code === 0){
        message.success(res.data.msg);
        _that.props.getNodeList({}, {'Cluster-Id': _that.ClusterSelectFormRef.props.form.getFieldValue('clustername')});
    }else{
        console.log(res.data.msg);
        message.error("处理失败");
    }
  }, {'Cluster-Id': _that.ClusterSelectFormRef.props.form.getFieldValue('clustername')})
}

function deletenode(name, _that) {
  const hide = message.loading('请求处理中...', 0);
  deleteAjax('/k8s/node/', 'name=' + name, function (res){
    hide();
    if(res.data.code === 0){
        message.success(res.data.msg);
        _that.props.getNodeList({}, {'Cluster-Id': _that.ClusterSelectFormRef.props.form.getFieldValue('clustername')});
    }else{
        console.log(res.data.msg);
        message.error("处理失败");
    }
  }, {'Cluster-Id': _that.ClusterSelectFormRef.props.form.getFieldValue('clustername')})
}

function showdisablenodeConfirm(name, _that) {
  confirm({
    title: `确认禁用${name}吗?`,
    onOk() {
      disablenode(name, _that); 
    }
  });
}

function showdeletenodeConfirm(name, _that) {
  confirm({
    title: `确认删除${name}吗?`,
    onOk() {
      deletenode(name, _that); 
    }
  });
}

function showenablenodeConfirm(name, _that) {
  confirm({
    title: `确认启用${name}吗?`,
    onOk() {
      enablenode(name, _that); 
    }
  });
}

function showdrainnodeConfirm(name, _that) {
  confirm({
    title: `确认使${name}进入维护模式吗?`,
    onOk() {
      drainnode(name, _that); 
    }
  });
}

function switchconfirm(e, name, _that){
    switch(e.key){
       case "cordon":
          showdisablenodeConfirm(name, _that) 
       break;
       case "uncordon":
          showenablenodeConfirm(name, _that) 
       break;
       case "drain":
          showdrainnodeConfirm(name, _that) 
       break;
       case "delete":
          showdeletenodeConfirm(name, _that) 
       break;
       default:
          console.log(e.key);
    }

}

export function getNode() {
    return [{
        title: '节点名称',
        dataIndex: 'metadata.name'
    }, {
        title: '创建时间',
        dataIndex: 'metadata.creation_timestamp',
        render: (data) => (formatStrDate(data))
    }, {
        title: '系统版本',
        dataIndex: 'status.node_info.os_image'
    }, {
        title: '调度状态',
        dataIndex: 'spec.unschedulable',
        render: (data) => (data === true ? <Icon type="safety" style={{color: "red"}}/> : <Icon type="safety" style={{color: "green"}} />)
    }, {
        title: '运行状态',
        dataIndex: 'status.conditions[4].status',
        render: (data) => (data === "True" ? <Icon type="safety" style={{color: "green"}}/> : <Icon type="safety" style={{color: "red"}} />)

    }, {
        title: '磁盘空间',
        dataIndex: 'status.conditions[0].status',
        render: (data) => (data === "False" ? <Icon type="safety" style={{color: "green"}}/> : <Icon type="safety" style={{color: "red"}} />)
    }, {
        title: '磁盘压力',
        dataIndex: 'status.conditions[2].status',
        render: (data) => (data === "False" ? <Icon type="safety" style={{color: "green"}}/> : <Icon type="safety" style={{color: "red"}} />)
    }, {
        title: 'pid压力',
        dataIndex: 'status.conditions[3].status',
        render: (data) => (data === "False" ? <Icon type="safety" style={{color: "green"}}/> : <Icon type="safety" style={{color: "red"}} />)
    }, {
        title: '内存空间',
        dataIndex: 'status.conditions[1].status',
        render: (data) => (data === "False" ? <Icon type="safety" style={{color: "green"}}/> : <Icon type="safety" style={{color: "red"}} />)
    },{
        title: '操作',
        render: (data, record, index) => {
            const _that = this;
            return (
            <div>
            <Dropdown overlay={
                         <Menu onClick={(e)=>{switchconfirm(e, record.metadata.name, _that)}}>
                           <Menu.Item key="cordon">
                             禁用
                           </Menu.Item>
                           <Menu.Item key="uncordon">
                             启用
                           </Menu.Item>
                               <Menu.Divider />
                           <Menu.Item key="drain">
                             维护
                           </Menu.Item>
                               <Menu.Divider />
                           <Menu.Item>
                             标签
                           </Menu.Item>
                               <Menu.Divider />
                           <Menu.Item key="delete">
                             删除
                           </Menu.Item>
                         </Menu>
            } placement="bottomCenter">
              <Button size="small">控制</Button>
            </Dropdown>
            </div>
        )}
    }];
}
