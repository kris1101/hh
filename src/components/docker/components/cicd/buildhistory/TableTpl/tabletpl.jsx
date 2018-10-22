import React from 'react';
import { Tooltip, Icon, message, Col, Row, Modal } from 'antd';
import { formatStrDate } from '../../../../utils/time_helper'
import { deleteAjax } from '../../../../utils/axios'

const confirm = Modal.confirm;
function deletetask(id, _that) {
  const hide = message.loading('请求处理中...', 0);
  deleteAjax('/codetask/buildhistory/', "id=" + id, function (res){
    hide();
    if(res.data.code === 0){
        message.success(res.data.msg);
        _that.handleBuildHistoryQuery();
    }else{
        message.error(res.data.msg);
    }
  })
}

function showConfirm(id, _that) {
  confirm({
    title: '确认删除该历史记录吗?',
    onOk() {
      deletetask(id, _that); 
    }
  });
}


export function getBuildHistory() {
  return [
    {
        title: '构建状态',
        dataIndex: 'status'
    }, {
        title: '任务名称',
        dataIndex: 'task_name'
    }, {
        title: '代码分支',
        dataIndex: 'branch'
    }, {
        title: '镜像名称',
        dataIndex: 'image_name'
    }, {
        title: '镜像tag',
        dataIndex: 'image_tag'
    }, {
        title: '是否编译',
        dataIndex: 'is_compile',
        render: (data) => (data ? "是" : "否")
    }, {
        title: '创建时间',
        dataIndex: 'create_time',
        render: (data) => (formatStrDate(data))
    }, {
        title: '操作',
        dataIndex: 'id',
      render: (data, record, index) => {
        return (
          <Row gutter={16}>
              <Col span={24}>
                <Tooltip title="删除历史记录">
                 <Icon type="delete" onClick={() => showConfirm(data, this)} style={{ cursor: "pointer" }}/>
                </Tooltip>
            </Col>
          </Row>
          );
      }
    }
    ];
}
