import React, { Component } from 'react';
import { Divider } from 'antd';
import { Link } from 'react-router-dom';


export function getColumes() {
  return [{
    title: '项目名',
    dataIndex: 'name',
    render: (text, record) => <Link to={`/vm/accounts/projects/${record.id}`} className="href-class">{text}</Link>
  }, {
    title: '项目ID',
    dataIndex: 'id'
  }, {
    title: '域名',
    dataIndex: 'domain_id',
  },{
    title: '父项目',
    dataIndex: 'parent_name',
    render: (text, record) => record.parent_name ? record.parent_name : '无',
  },{
    title: '描述',
    dataIndex: 'description',
  },{
    title: '是否是域',
    dataIndex: 'is_domain',
    render: (text, record) => record.is_domain ? '是' : '否',
  },{
    title: '状态',
    dataIndex: 'status',
    render: (text, record) => record.status === 1 ? <span className="mygreen">正常</span> : <span className="myred">禁用</span>,
  },{
    title: '操作',
    render: (record) => (
      <div>
        <Divider type="vertical" />
      </div>
    )
  }];
}

export function getDetailColumes() {
  return [{
    dataIndex: 'title',
    width: '10%',
  }, {
    dataIndex: 'value',
    render: (text, record) => <span className="display-linebreak"> {text} </span>
  }];
}
export function getDetailGroupColumes() {
  return [{
    dataIndex: 'title',
    width: '10%',
  }, {
    dataIndex: 'value',
    render: (text, record) => <span className="display-linebreak"> {text} </span>
  }];
}
export function getDetailQuotaColumes() {
  return [{
    dataIndex: 'title',
    width: '10%',
  }, {
    dataIndex: 'value',
    render: (text, record) => <span className="display-linebreak"> {text} </span>
  }];
}

export function getDetailMemeberColumes() {
  return [{
      title: 'ID',
      dataIndex: 'id',
    }, {
      title: '分支',
      dataIndex: 'branch',
    }, {
      title: 'COMMIT ID',
      dataIndex: 'commit_id',
    }, {
      title: '提交人',
      dataIndex: 'commit_user',
    }, {
      title: '状态',
      dataIndex: 'status',
      render: (text, record) => {
        if (record.status === 0) {
          return <span>新增</span>
        }else if (record.status === 1) {
          return <span>生成JOB</span>
        }else if (record.status === 2) {
          return <span>拉取代码</span>
        }else if (record.status === 3) {
          return <span>打包编译</span>
        }else if (record.status === 4) {
          return <span>镜像编译及推送</span>
        }else if (record.status === 5) {
          return <span className="text-green">成功</span>
        }else{
          return <span className="text-red">失败</span>
        }
      }
    }, {
      title: '开始时间',
      dataIndex: 'start_datetime',
    }, {
      title: '结束时间',
      dataIndex: 'end_datetime',
    }, {
        title: '操作',
        key: 'action',
        width: 120,
        render: (text, record) => (
          <span>
            <Tooltip title="构建日志">
              <a onClick={() => this.showLog(record.id)}><Icon type="file-text" /></a>
            </Tooltip>
            <span className="ant-divider" />
            <Tooltip title="重新构建">
              <a onClick={() => this.rebuild(record.id)}><Icon type="play-circle" /></a>
            </Tooltip>
          </span>
        ),
    }];
;
}
