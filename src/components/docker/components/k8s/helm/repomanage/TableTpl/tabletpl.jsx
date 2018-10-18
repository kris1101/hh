import React from 'react';
import { Button, Popconfirm, message, Row, Col } from 'antd';

import { deleteAjax  } from '../../../../../utils/axios'
import { putAjax  } from '../../../../../utils/axios'
import { generateformdata   } from '../../../../../utils/tools_helper'

function confirm(repo_id, _that) {
  const hide = message.loading('Action in progress..', 0);
  deleteAjax('/helm/helmrepo/', "id=" + repo_id, function (res){
    hide();
    if(res.data.code === 0){
        message.success(res.data.msg);
        _that.handleHelmRepoQuery(1, 10);
    }else{
        message.error(res.data.msg);
    }
  })
}


function handleRepoUpdate(repo_id, _that) {
  const hide = message.loading('Action in progress..', 0);
  putAjax('/helm/helmrepo/', generateformdata({id: repo_id}), function (res){
    hide();
    if(res.data.code === 0){
        message.success(res.data.msg);
        _that.handleHelmRepoQuery(1, 10);
    }else{
        message.error(res.data.msg);
    }
  })
}


export function getHelmRepo() {
    return [{
        title: 'Repo名称',
        dataIndex: 'name'
    }, {
        title: 'url',
        dataIndex: 'url'
    }, {
        title: '生成时间',
        dataIndex: 'generated'
    },{
        title: '操作',
        render: (data, record, index) => {
            return (
            <Row gutter={16}>
              <Col span={8} offset={4}>
              <Popconfirm title={"确认删除" + record.name + "repo吗?"} onConfirm={() => confirm(record.id, this)} okText="确定" cancelText="取消">
            <div>
                 <Button   icon="delete">删除</Button>
            </div>
              </Popconfirm>
            </Col>
            <Col span={8}>
              <Popconfirm title={"确认更新" + record.name + "repo吗?"} onConfirm={() => handleRepoUpdate(record.id, this)} okText="确定" cancelText="取消">
            <div>
              <Button  icon="cloud-download">更新</Button>
            </div>
              </Popconfirm>
            </Col>
            </Row>
        )}
    }];
}
