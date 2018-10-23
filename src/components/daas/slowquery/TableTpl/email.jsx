import { formatStrDate } from '../../../../utils/daas/time_helper'

export function getemails() {
    return [{
        title: '组名',
        dataIndex: 'fields.group_name',
    },{
        title: '用户名',
        dataIndex: 'fields.user_name',
    },{
        title: '用户邮件',
        dataIndex: 'fields.user_email',
    },{ 
        title: '用户电话',
        dataIndex: 'fields.user_phone',
    },{ 
        title: '创建时间',
        dataIndex: 'fields.create_time',
        render: (data) => formatStrDate(data),
    },{ 
        title: '更新时间',
        dataIndex: 'fields.update_time',
        render: (data) => formatStrDate(data),
    },{ 
        title: '描述',
        dataIndex: 'fields.description',
    }];
}
