import React from 'react';
import { notification, Layout, Table, Row, Col, Card } from 'antd';

import BreadcrumbCustom from '../../BreadcrumbCustom';
import VMSider from '../../common/LeftSider/vmsider';
import { networkApprovalDetail } from '../../../services/vm/user';
import { getDetailColumes, getApprovalListColumes } from './TableTpl/networkTableTpl';
import { timezoneFormat } from '../../../utils/vm'

const { Sider, Content } = Layout;


class NetworkApprovalDetail extends React.Component {
  constructor(props) {
    super(props);
    this.columns = getDetailColumes.call(this);
    this.approvalColumns = getApprovalListColumes.call(this);
  }
  state = {
    loading: false,
    base_data: [],
    approval_list: [],
  };
  componentDidMount() {
    this.start();
  }

  start = () => {
    this.setState({ loading: true });
    networkApprovalDetail(this.props.match.params.id).then(res => {
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
        approval_list: res.data.approval_list,
        base_data: [
          {'title': '网络名', 'key': 'name', 'value': res.data.name},
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

          {'title': '子网名', 'key': 'subnet_name', 'value': res.data.subnet.name},
          {'title': 'CIDR', 'key': 'subnet_cidr', 'value': res.data.subnet.cidr},
          {'title': '网关', 'key': 'subnet_gateway_ip', 'value': res.data.subnet.gateway_ip},
          {'title': '启动DHCP', 'key': 'subnet_enable_dhcp', 'value': res.data.subnet.enable_dhcp? '是' : '否'},
          {'title': 'DNS', 'key': 'subnet_dns', 'value': res.data.subnet.dns_nameservers},
        ],
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
          <BreadcrumbCustom first="网络管理" second="网络列表" three="审核详情" />
          <Row gutter={16}>
            <Col className="gutter-row" md={24}>
              <Card bordered={false}>
                <Table
                  columns={this.approvalColumns}
                  dataSource={this.state.approval_list}
                  loading={this.state.loading}
                  pagination={false}
                  showHeader={true}
                  bordered={true}
                  rowKey={record => record.id}
                />
                <br />
                <Table
                  columns={this.columns}
                  dataSource={this.state.base_data}
                  loading={this.state.loading}
                  pagination={false}
                  showHeader={false}
                  bordered={true}
                />
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}

export default NetworkApprovalDetail;
