import React from 'react';
import { Popconfirm, message } from 'antd';
import axios from 'axios';
import {groupdetail} from '../groupforms/groupdetailform'

const baseUrl = 'http://127.0.0.1:8000';
var instance = axios.create({
    baseURL: baseUrl,//测试环境
    timeout: 2000,
});

function confirm(pk, _that) {
  const hide = message.loading('Action in progress..', 0);
  instance.delete('/v1/api/slow/query/groups/' + pk)
    .then(function(res){
    hide();
    if(res.data.code === 0){
        message.success(res.data.message);
        _that.handleGroupListWithArgs(1, 10);
    }else{
        message.error(res.data.message);
    }
  })
}
export function getgroups() {
    return [{
        title: '组名',
        dataIndex: 'fields.name',
    }, {
        title: '创建时间',
        dataIndex: 'fields.create_time'
    }, {
        title: '更新时间',
        dataIndex: 'fields.update_time',
    },{
        title: '操作',
        render: (data, record, index) => (
            <div>
              <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}} onClick={()=> {groupdetail(record.pk, this)}}>详情</span>
              <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}} onClick={() => this.showGroupUpdateModel(record)}>编辑</span>
              <Popconfirm title={"Are you sure delete " + record.fields.name + "group?"} onConfirm={() => confirm(record.pk, this)} okText="Yes" cancelText="No">
               <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}}>删除</span>
              </Popconfirm>
              <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}}>编辑成员</span>
            </div>
        )
    }];
}
