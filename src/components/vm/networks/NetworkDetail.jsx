import React from 'react';
import { notification, Layout, message, Tooltip, Icon, Form, Modal, Button, Table, Row, Col, Card, Tabs, Input } from 'antd';

import BreadcrumbCustom from '../../BreadcrumbCustom';
import VMSider from '../../common/LeftSider/vmsider';
import { networkDetail } from '../../../services/vm/user';
import { getDetailColumes, getDetailDHCPColumes, getDetailPortColumes, getDetailSubnetColumes } from './TableTpl/networkTableTpl';
import { humansize, timezoneFormat } from '../../../utils/vm'
import SubnetCreate from './SubnetCreate'

const confirm = Modal.confirm;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const { Sider, Content } = Layout;


class NetworkDetail extends React.Component {
  constructor(props) {
    super(props);
    this.columns = getDetailColumes.call(this);
    this.subnetColumns = getDetailSubnetColumes.call(this);
    this.portColumns = getDetailPortColumes.call(this);
    this.dhcpColumns = getDetailDHCPColumes.call(this);
  }
  state = {
    loading: false,
    activeKey: "1",
    base_data: [],
    subnet_data: [],
    port_data: [],
    dhcp_data: [],
  };
  componentDidMount() {
    this.start();
  }
  onTabChange = (activeKey) => {
    // console.log(activeKey)
    this.setState({ activeKey: activeKey });
    if (activeKey === '4'){
      // console.log(activeKey);
      this.dhcp_request();
    } else if (activeKey === '2'){
      this.network_subnet_request();
    } else if (activeKey === '3'){
      this.network_port_request();
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
          {'title': '创建时间', 'key': 'create_time', 'value': timezoneFormat(res.data.create_time)},
          {'title': 'MTU', 'key': 'mtu', 'value': res.data.mtu},
          {'title': '网络类型', 'key': 'provider_network_type', 'value': res.data.provider_network_type},
          {'title': '物理网络', 'key': 'provider_physical_network', 'value': res.data.provider_physical_network},
          {'title': '段ID', 'key': 'provider_segmentation_id', 'value': res.data.provider_segmentation_id},
        ],
        loading: false,
      });
    });

  };

  dhcp_request = () => {
    this.setState({ loading: true });
    networkDetail(this.props.match.params.id, {tab: 'dhcp'}).then(res => {
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
        dhcp_data: [...res.data.map(val => {
          val.key = val.id;
          return val;
        })],
        loading: false,
      });
    });

  };
  refresh_subnet = () => {
    this.network_subnet_request();
  };
  network_subnet_request = (page=1) => {
    this.setState({ loading: true });
    networkDetail(this.props.match.params.id, {tab: 'subnet'}).then(res => {
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
        subnet_data: [...res.data.map(val => {
          val.key = val.id;
          return val;
        })],
        loading: false,
      });
    });

  };
  refresh_group = () => {
    this.network_port_request();
  };
  network_port_request = (page=1) => {
    this.setState({ loading: true });
    networkDetail(this.props.match.params.id, {tab: 'port'}).then(res => {
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
        port_data: [...res.data.map(val => {
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
          <BreadcrumbCustom first="网络管理" second="网络列表" three="网络详情" />
          <Row gutter={16}>
            <Col className="gutter-row" md={24}>

              <Card bordered={false}>
                <Tabs defaultActiveKey="1" activeKey={this.state.activeKey} onChange={this.onTabChange}>
                  <TabPane tab={<span>基本信息</span>} key="1">
                    <SubnetCreate refresh={this.refresh_subnet} network_id={this.props.match.params.id} />
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
                    <SubnetCreate refresh={this.refresh_subnet} network_id={this.props.match.params.id} />
                    <Table columns={this.subnetColumns} dataSource={this.state.subnet_data}
                      loading={this.state.loading}
                      pagination={false}
                      bordered={true}
                    />
                  </TabPane>

                  <TabPane tab={<span>端口</span>} key="3">
                    <Table columns={this.portColumns} dataSource={this.state.port_data}
                      loading={this.state.loading}
                      pagination={false}
                      bordered={true}
                    />
                  </TabPane>

                  <TabPane tab={<span>DHCP Agents</span>} key="4">
                    <Table columns={this.dhcpColumns} dataSource={this.state.dhcp_data}
                      loading={this.state.loading}
                      pagination={false}
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
