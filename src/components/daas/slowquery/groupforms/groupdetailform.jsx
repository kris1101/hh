import React from 'react'
import { Modal, Button, Form, message, List, Avatar } from 'antd';
import axios from 'axios';

import { formatStrDate } from '../../../docker/utils/time_helper'

const baseUrl = 'http://127.0.0.1:8000';
var instance = axios.create({
    baseURL: baseUrl,//测试环境
    timeout: 2000,
});
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'

export function groupdetail(pk, _that) {
 instance.get('/v1/api/slow/query/groups/' + pk)
    .then(function(res){
    // hide();
    if(res.data.code == 0){
        console.log(res.data)
        const ret = res.data.data[0].fields;
        const groupdetaillist = [{
                                     title: '名称',
                                     dataIndex: ret.name,
                                 },{
                                     title: '描述',
                                     dataIndex: ret.description,
                                 },{
                                     title: '创建时间',
                                     dataIndex: ret.create_time,
                                     render: (data) => formatStrDate(data)
                                 },{
                                     title: '更新时间',
                                     dataIndex: ret.update_time,
                                     render: (data) => formatStrDate(data)
                                 },{
                                     title: '类型',
                                     dataIndex: ret.type,
                                 }];
        Modal.info({
            title: '组详情',
            content: (
              <div>
                 <List
                  itemLayout="horizontal"
                  dataSource={groupdetaillist}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        title={<a href="/">{item.title}</a>}
                        description={item.dataIndex}
                      />
                    </List.Item>
                  )}
                 />
              </div>
            ),
            onOk() {},
            okText: "返回",
          });
    }else{
        message.error(res.data.message);
    }
  })
}

