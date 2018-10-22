import React from 'react';
import { Icon, Popover  } from 'antd';
import { formatStrDate } from '../../../../../utils/time_helper'

export function getTaskState() {
    return [{
        title: '任务类型',
        dataIndex: 'type'
    }, {
        title: '任务状态',
        dataIndex: 'status'
    }, {
        title: '任务描述',
        dataIndex: 'description'
    }, {
        title: '异常信息',
        dataIndex: 'raise',
        render: (data) => {
          if (data.length){
            const content = (
              <pre>
                <code>
                  {data}
                </code>
              </pre>
            )
            return (
            <Popover content={content} title="异常信息" trigger="hover">
              <Icon type="eye" theme="twoTone" style={{fontSize: 20}}/>
            </Popover>
              ); 
          }else{
            return "无"
          }
        }
    }, {
        title: '任务结果',
        dataIndex: 'result',
        render: (data) => {
          if (data.length){
            const content = (
              <pre>
                <code>
                  {data}
                </code>
              </pre>
            )
            return (
            <Popover content={content} title="任务结果" trigger="hover">
              <Icon type="eye" theme="twoTone" style={{fontSize: 20}}/>
            </Popover>
              ); 
          }else{
            return "无"
          }
        }
    }, {
        title: '更新时间',
        dataIndex: 'create_time',
        render: (data) => {
            return formatStrDate(data); 
        }
    }];
}
