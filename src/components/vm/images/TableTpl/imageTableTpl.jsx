import React from 'react';
import { Divider } from 'antd';
import { humansize } from '../../../../utils/vm'

import ImageDetail from '../ImageDetail';


export function getColumes() {
  return [{
    title: '镜像名',
    dataIndex: 'name',
    // render: (text, record) => <Link to={`/vm/accounts/projects/${record.id}`} className="href-class">{text}</Link>
  }, {
    title: '大小',
    dataIndex: 'size',
    render: (text, record) => humansize(record.size, 'B'),
  },{
    title: '类型',
    dataIndex: 'image_type_display',
  },{
    title: '磁盘格式',
    dataIndex: 'disk_format',
  },{
    title: '可见性',
    dataIndex: 'visibility_display',
  },{
    title: '受保护的',
    dataIndex: 'protected',
    render: (text, record) => record.protected ? '是' : '否',
  },{
    title: '操作',
    render: (record) => (
      <div>
        <ImageDetail record={ record } />
        <Divider type="vertical" />
      </div>
    )
  }];
}

export function getDetailColumes() {
  return [{
    dataIndex: 'title',
    width: '30%',
  }, {
    dataIndex: 'value',
    render: (text, record) => <span className="display-linebreak"> {text} </span>
  }];
}


