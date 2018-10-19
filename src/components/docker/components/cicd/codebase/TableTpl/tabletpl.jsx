import React from 'react';
import { Icon, Popconfirm, message, Col, Row } from 'antd';
import { formatStrDate } from '../../../../utils/time_helper'
import { deleteAjax } from '../../../../utils/axios'

function deleterepo(id, _that) {
  const hide = message.loading('请求处理中...', 0);
  deleteAjax('/codeinfo/codeproject/', "id=" + id, function (res){
    hide();
    if(res.data.code === 0){
        message.success(res.data.msg);
        _that.handleCodeBaseQuery();
    }else{
        message.error(res.data.msg);
    }
  })
}

export function getCodeBase() {
    return [{
        title: '名称',
        dataIndex: 'name'
    }, {
        title: '项目名称',
        dataIndex: 'project_name'
    }, {
        title: 'repo地址',
        dataIndex: 'http_url_to_repo'
    }, {
        title: '公开',
        dataIndex: 'is_public',
        render: (data) => {
          if(data){
            return "是"
          }else{
            return "否"
          }
        }
    }, {
        title: '创建时间',
        dataIndex: 'time',
        render: (data) => (formatStrDate(data))
    }, {
        title: '操作',
        dataIndex: 'id',
      render: (data, record, index) => {
        return (
          <Row >
              <Col span={12}>
              <Popconfirm placement="topRight" onConfirm={() => deleterepo(data, this)} title={"确定删除该代码仓库"+ record.name +"吗?"} icon={<Icon type="question-circle-o" style={{ color: 'red'  }} />}>
                 <Icon type="delete" style={{ cursor: "pointer" }}/>
              </Popconfirm>
            </Col>
              <Col span={12}>
                <Icon onClick={() => this.showCodeInfoUpdateModel(record)}type="edit" style={{ cursor: "pointer" }}/>
            </Col>
          </Row>
          );
      }
    }
    ];
}
