import React from 'react';
import { notification, Layout, message, Tooltip, Icon, Form, Modal, Button, Table, Row, Col, Card, Tabs, Input } from 'antd';

import BreadcrumbCustom from '../../BreadcrumbCustom';
import VMSider from '../../common/LeftSider/vmsider';
import { projectDetail, projectMemberList, projectGroupList } from '../../../services/vm/user';
import { getDetailColumes, getDetailGroupColumes, getDetailMemeberColumes } from './TableTpl/projectTabletpl';
import { humansize, timezoneFormat } from '../../../utils/vm'
import ProjectMemberCreate from './ProjectMemberCreate';
import ProjectGroupCreate from './ProjectGroupCreate';

const confirm = Modal.confirm;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const { Sider, Content } = Layout;


class ProjectDetail extends React.Component {
  constructor(props) {
    super(props);
    this.columns = getDetailColumes.call(this);
    this.member_columns = getDetailMemeberColumes.call(this);
    this.group_columns = getDetailGroupColumes.call(this);
  }
  state = {
    loading: false,
    activeKey: "1",
    base_data: [],
    quota_data: [],
    member_data: [],
    member_pagination: {total: 0, defaultPageSize: 20, defaultCurrent: 1, pageSize: 20},

    group_data: [],
    group_pagination: {total: 0, defaultPageSize: 20, defaultCurrent: 1, pageSize: 20},
  };
  componentDidMount() {
    this.start();
  }
  onTabChange = (activeKey) => {
    // console.log(activeKey)
    this.setState({ activeKey: activeKey });
    if (activeKey === '4'){
      // console.log(activeKey);
      this.quota_request();
    } else if (activeKey === '2'){
      this.project_member_request();
    } else if (activeKey === '3'){
      this.project_group_request();
    }
  }

  start = () => {
    this.setState({ loading: true });
    projectDetail(this.props.match.params.id).then(res => {
      if(res.code === -2){
        notification['warning']({message: res.msg});
        this.setState({loading: false});
        return
      } else if(res.code === -1){
        notification['warning']({message: res.msg});
        this.setState({loading: false});
        return
      }
      this.setState({
        data: res.data,
        base_data: [
          {'title': '项目名', 'key': 'name', 'value': res.data.name},
          {'title': 'ID', 'key': 'id', 'value': res.data.id},
          {'title': '描述', 'key': 'description', 'value': res.data.description},
          {'title': '父项目', 'key': 'parent_name', 'value': res.data.parent_name || '无'},
          {'title': '是否是域', 'key': 'is_domain', 'value': res.data.is_domain ? '是' : '否'},
          {'title': '状态', 'key': 'status', 'value': res.data.status === 1 ? <span className="mygreen">正常</span> : <span className="myred">禁用</span>},
          {'title': '创建时间', 'key': 'create_time', 'value': timezoneFormat(res.data.create_time)},
        ],
        loading: false,
      });
    });

  };

  quota_request = () => {
    this.setState({ loading: true });
    projectDetail(this.props.match.params.id, {tab: 'quota'}).then(res => {
      if(res.code === -2){
        notification['warning']({message: res.msg});
        this.setState({loading: false});
        return
      } else if(res.code === -1){
        notification['warning']({message: res.msg});
        this.setState({loading: false});
        return
      }

      this.setState({
        quota_data: [
          {'title': '实例', 'key': 'instances', 'value': res.data.instances},
          {'title': 'VCPU数量', 'key': 'cores', 'value': res.data.cores},
          {'title': '密钥对', 'key': 'key_pairs', 'value': res.data.key_pairs},
          {'title': '内存', 'key': 'ram', 'value': humansize(res.data.ram, 'MB')},
          {'title': '主机组', 'key': 'server_groups', 'value': res.data.server_groups},
          {'title': '主机组成员', 'key': 'server_group_members', 'value': res.data.server_group_members},
          {'title': '网络数量', 'key': 'network', 'value': res.data.network},
          {'title': '子网数量', 'key': 'subnet', 'value': res.data.subnet},
          {'title': '安全组数量', 'key': 'security_groups', 'value': res.data.security_groups},
          {'title': '安全组规则数量', 'key': 'security_group_rule', 'value': res.data.security_group_rule},
        ],
        loading: false,
      });
    });

  };
  refresh_member = () => {
    this.project_member_request();
  };
  project_member_request = (page=1) => {
    const { member_pagination } = this.state;
    this.setState({ loading: true });
    projectMemberList(this.props.match.params.id, {page: page}).then(res => {
      if(res.code === -2){
        notification['warning']({message: res.msg});
        this.setState({loading: false});
        return
      } else if(res.code === -1){
        notification['warning']({message: res.msg});
        this.setState({loading: false});
        return
      }
      const pagination_ = { ...this.state.member_pagination };
      pagination_.total = res.count;
      this.setState({
        member_data: [...res.data.map(val => {
          val.key = val.id;
          return val;
        })],
        loading: false,
        member_pagination: pagination_,
      });
    });

  };
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.member_pagination };
    pager.current = pagination.current;
    this.setState({
      member_pagination: pager,
    });
    this.project_member_request(pagination.current);
  };
  refresh_group = () => {
    this.project_group_request();
  };
  project_group_request = (page=1) => {
    const { group_pagination } = this.state;
    this.setState({ loading: true });
    projectGroupList(this.props.match.params.id, {page: page}).then(res => {
      if(res.code === -2){
        notification['warning']({message: res.msg});
        this.setState({loading: false});
        return
      } else if(res.code === -1){
        notification['warning']({message: res.msg});
        this.setState({loading: false});
        return
      }
      const pagination_ = { ...this.state.group_pagination };
      pagination_.total = res.count;
      this.setState({
        group_data: [...res.data.map(val => {
          val.key = val.id;
          return val;
        })],
        loading: false,
        group_pagination: pagination_,
      });
    });

  };

  handleGroupTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.group_pagination };
    pager.current = pagination.current;
    this.setState({
      group_pagination: pager,
    });
    this.project_member_request(pagination.current);
  };


  render() {
    return (
      <Layout className="config">
        <Sider>
            <VMSider/>
        </Sider>
        <Content style={{ padding: 0, margin:10,  marginBottom: 0, minHeight: window.innerHeight-84 }}>
          <BreadcrumbCustom first="用户管理" second="项目列表" three="项目详情" />
          <Row gutter={16}>
            <Col className="gutter-row" md={24}>

              <Card bordered={false}>
                <Tabs defaultActiveKey="1" activeKey={this.state.activeKey} onChange={this.onTabChange}>
                  <TabPane tab={<span>基本信息</span>} key="1">
                    <Table
                      columns={this.columns}
                      dataSource={this.state.base_data}
                      loading={this.state.loading}
                      pagination={false}
                      showHeader={false}
                      bordered={true}
                    />
                  </TabPane>

                  <TabPane tab={<span>项目成员</span>} key="2">
                    <ProjectMemberCreate refresh={this.refresh_member} project_id={this.props.match.params.id} />
                    <Table columns={this.member_columns} dataSource={this.state.member_data}
                      loading={this.state.loading}
                      pagination={this.state.member_pagination}
                      onChange={this.handleTableChange}
                      bordered={true}
                    />
                  </TabPane>

                  <TabPane tab={<span>项目组</span>} key="3">
                    <ProjectGroupCreate refresh={this.refresh_group} project_id={this.props.match.params.id} />
                    <Table columns={this.group_columns} dataSource={this.state.group_data}
                      loading={this.state.loading}
                      pagination={this.state.group_pagination}
                      onChange={this.handleGroupTableChange}
                      bordered={true}
                    />
                  </TabPane>

                  <TabPane tab={<span>配额</span>} key="4">
                    <Table columns={this.columns} dataSource={this.state.quota_data}
                      loading={this.state.loading}
                      pagination={false}
                      showHeader={false}
                      bordered={true}
                    />
                  </TabPane>
                </Tabs>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}

export default ProjectDetail;
