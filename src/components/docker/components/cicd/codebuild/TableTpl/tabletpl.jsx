import React from 'react';
import { Tooltip, Icon, message, Col, Row, Modal } from 'antd';
import { formatStrDate } from '../../../../utils/time_helper'
import { deleteAjax } from '../../../../utils/axios'

const confirm = Modal.confirm;
function deletetask(id, _that) {
  const hide = message.loading('请求处理中...', 0);
  deleteAjax('/codebuild/task/', "id=" + id, function (res){
    hide();
    if(res.data.code === 0){
        message.success(res.data.msg);
        _that.handleCodeBuildQuery();
    }else{
        message.error(res.data.msg);
    }
  })
}

function showConfirm(id, _that) {
  confirm({
    title: '确认删除该任务吗?',
    onOk() {
      deletetask(id, _that); 
    }
  });
}

function buildImageConfirm(record, _that) {
  confirm({
    title: '确认开始构建吗',
    onOk() {
      _that.showCodeBuildImageModel(record)
    }
  });
}

export function getCodeBuildTask() {
    return [{
        title: '任务名称',
        dataIndex: 'task_name'
    }, {
        title: 'harbor项目名称',
        dataIndex: 'harbor_project_name'
    }, {
        title: '代码名称',
        dataIndex: 'codename'
    }, {
        title: '分支名称',
        dataIndex: 'build_branch'
    }, {
        title: '是否编译',
        dataIndex: 'is_compile',
        render: (data) => (data === "false" ? "否" : "是")

    }, {
        title: '代码地址',
        dataIndex: 'http_url_to_repo'
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
              <Col span={12}>
                <Tooltip title="开始构建">
                <Icon onClick={() => buildImageConfirm(record, this)} type="caret-right" style={{ cursor: "pointer" }}/>
                </Tooltip>
            </Col>
              <Col span={12}>
                <Tooltip title="删除任务">
                 <Icon type="delete" onClick={() => showConfirm(data, this)} style={{ cursor: "pointer" }}/>
                </Tooltip>
            </Col>
          </Row>
          );
      }
    }
    ];
}
