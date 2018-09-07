import React from 'react';
import { notification, Layout, message, Tooltip, Icon, Form, Modal, Button, Table, Row, Col, Card, Tabs, Input } from 'antd';

import BreadcrumbCustom from '../../BreadcrumbCustom';
import VMSider from '../../common/LeftSider/vmsider';
import { projectDetail } from '../../../services/vm/user';
import { getDetailColumes, getDetailMemeberColumes } from './TableTpl/projectTabletpl';

const confirm = Modal.confirm;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const { Sider, Content } = Layout;


class ProjectDetail extends React.Component {
  constructor(props) {
    super(props);
    this.columns = getDetailColumes.call(this);
    this.log_columns = getDetailMemeberColumes.call(this);
  }
  state = {
    loading: false,
    activeKey: "1",
    base_data: [],
    quota_data: [],
    build_data: [],

    build_log_data: [],
    log_pagination: {total: 0, defaultPageSize: 20, defaultCurrent: 1, pageSize: 20},
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
          {'title': '父项目', 'key': 'parent_name', 'value': res.data.parent_name},
          {'title': '是否是域', 'key': 'is_domain', 'value': res.data.is_domain},
          {'title': '状态', 'key': 'status', 'value': res.data.status},
          {'title': '创建时间', 'key': 'create_time', 'value': res.data.create_time},
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
          {'title': '内存', 'key': 'ram', 'value': res.data.ram},
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
  build_log_request = (page=1) => {
    const { log_pagination } = this.state;
    this.setState({ loading: true });
    getProjectDetail(this.props.params.id, page, log_pagination.pageSize).then(res => {
      if(res.code === -2){
        notification['warning']({message: res.msg});
        this.setState({loading: false});
        return
      } else if(res.code === -1){
        notification['warning']({message: res.msg});
        this.setState({loading: false});
        return
      }
      const pagination_ = { ...this.state.log_pagination };
      pagination_.total = res.count;
      this.setState({
        build_log_data: [...res.data.map(val => {
          val.key = val.id;
          return val;
        })],
        loading: false,
        log_pagination: pagination_,
      });
    });

  };
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.log_pagination };
    pager.current = pagination.current;
    this.setState({
      log_pagination: pager,
    });
    this.user_request(pagination.current);
  }

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
                    <Table columns={this.columns} dataSource={this.state.quota_data}
                      loading={this.state.loading}
                      pagination={false}
                      showHeader={false}
                      bordered={true}
                    />
                  </TabPane>

                  <TabPane tab={<span>项目组</span>} key="3">
                    <Table columns={this.columns} dataSource={this.state.build_data}
                      loading={this.state.loading}
                      pagination={false}
                      showHeader={false}
                      bordered={true}
                    />
                  </TabPane>

                  <TabPane tab={<span>配额</span>} key="4">
                    <Table columns={this.columns} dataSource={this.state.quota_data}
                      loading={this.state.loading}
                      pagination={this.state.log_pagination}
                      onChange={this.handleTableChange}
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
