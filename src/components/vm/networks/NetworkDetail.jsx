import React from 'react';
import { notification, Layout, message, Tooltip, Icon, Form, Modal, Button, Table, Row, Col, Card, Tabs, Input } from 'antd';

import BreadcrumbCustom from '../../BreadcrumbCustom';
import VMSider from '../../common/LeftSider/vmsider';
import { networkDetail } from '../../../services/vm/user';
import { getDetailColumes } from './TableTpl/networkTableTpl';
import { humansize } from '../../../utils/vm'

const confirm = Modal.confirm;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const { Sider, Content } = Layout;


class NetworkDetail extends React.Component {
  constructor(props) {
    super(props);
    this.columns = getDetailColumes.call(this);
  }
  state = {
    loading: false,
    activeKey: "1",
    base_data: [],
    quota_data: [],
    member_data: [],
    group_data: [],
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
    networkDetail(this.props.match.params.id).then(res => {
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
          {'title': '网络名', 'key': 'name', 'value': res.data.name},
          {'title': 'ID', 'key': 'uuid', 'value': res.data.uuid},
          {'title': '所属项目', 'key': 'project_name', 'value': res.data.project_name},
          {'title': '共享', 'key': 'shared', 'value': res.data.shared ? '是' : '否'},
          {'title': '外部', 'key': 'router_external', 'value': res.data.router_external ? '是' : '否'},
          {'title': '管理状态', 'key': 'admin_state_up', 'value': res.data.admin_state_up ? 'UP' : 'DOWN'},
          {'title': '状态', 'key': 'status', 'value': res.data.status_display},
          {'title': '创建时间', 'key': 'create_time', 'value': res.data.create_time},
          {'title': 'MTU', 'key': 'mtu', 'value': res.data.mtu},
          {'title': '网络类型', 'key': 'provider_network_type', 'value': res.data.provider_network_type},
          {'title': '物理网络', 'key': 'provider_physical_network', 'value': res.data.provider_physical_network},
          {'title': '段ID', 'key': 'provider_segmentation_id', 'value': res.data.provider_segmentation_id},
        ],
        loading: false,
      });
    });

  };

  quota_request = () => {
    this.setState({ loading: true });
    networkDetail(this.props.match.params.id, {tab: 'quota'}).then(res => {
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
    this.setState({ loading: true });
    networkDetail(this.props.match.params.id, {page: page}).then(res => {
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
        member_data: [...res.data.map(val => {
          val.key = val.id;
          return val;
        })],
        loading: false,
      });
    });

  };
  refresh_group = () => {
    this.project_group_request();
  };
  project_group_request = (page=1) => {
    this.setState({ loading: true });
    networkDetail(this.props.match.params.id, {page: page}).then(res => {
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
        group_data: [...res.data.map(val => {
          val.key = val.id;
          return val;
        })],
        loading: false,
      });
    });

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

                  <TabPane tab={<span>子网</span>} key="2">
                    <Table columns={this.columns} dataSource={this.state.member_data}
                      loading={this.state.loading}
                      pagination={false}
                      showHeader={false}
                      bordered={true}
                    />
                  </TabPane>

                  <TabPane tab={<span>端口</span>} key="3">
                    <Table columns={this.columns} dataSource={this.state.group_data}
                      loading={this.state.loading}
                      pagination={false}
                      showHeader={false}
                      bordered={true}
                    />
                  </TabPane>

                  <TabPane tab={<span>DHCP Agents</span>} key="4">
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

export default NetworkDetail;
