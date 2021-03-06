import React from 'react';
import { timezoneFormat } from '../../../../utils/vm'


export function getColumes() {
  return [{
    title: 'ID',
    dataIndex: 'id',
  }, {
    title: '操作时间',
    dataIndex: 'create_time',
    render: (text, record) => timezoneFormat(record.create_time),
  }, {
    title: '操作用户',
    dataIndex: 'username',
    render: (text, record) => <span>{text}({record.realname})</span>
  },{
    title: '动作',
    dataIndex: 'action',
  },{
    title: '操作对象',
    dataIndex: 'date_joined',
  },{
    title: '备注',
    dataIndex: 'description',
  }];
}
