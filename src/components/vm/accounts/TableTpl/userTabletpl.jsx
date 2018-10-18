import { timezoneFormat } from '../../../../utils/vm'


export function getColumes() {
  return [{
    title: '用户ID',
    dataIndex: 'id',
  }, {
    title: '姓名',
    dataIndex: 'first_name'
  }, {
    title: '邮箱',
    dataIndex: 'email',
  },{
    title: '用户名',
    dataIndex: 'username',
  },{
    title: '加入时间',
    dataIndex: 'date_joined',
    render: (text, record) => timezoneFormat(record.date_joined),
  },{
    title: '所属项目',
    dataIndex: 'project',
  },{
    title: '所属角色',
    dataIndex: 'role',
  }];
}
