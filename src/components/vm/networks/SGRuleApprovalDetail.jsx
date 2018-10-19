import React from 'react';
import { notification, Layout, Table, Row, Col, Card } from 'antd';

import BreadcrumbCustom from '../../BreadcrumbCustom';
import VMSider from '../../common/LeftSider/vmsider';
import { sgRuleApprovalDetail } from '../../../services/vm/user';
import { getDetailColumes, getApprovalListColumes } from './TableTpl/sgTableTpl';
import { timezoneFormat } from '../../../utils/vm'

const { Sider, Content } = Layout;


class SGRuleApprovalDetail extends React.Component {
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
    sgRuleApprovalDetail(this.props.match.params.id).then(res => {
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
          {'title': '所属安全组', 'key': 'security_group_name', 'value': res.data.security_group.name},
          {'title': '所属安全组ID', 'key': 'security_group_id', 'value': res.data.security_group.uuid},
          {'title': '所属项目', 'key': 'project_name', 'value': res.data.security_group.name},
          {'title': '创建时间', 'key': 'create_time', 'value': timezoneFormat(res.data.create_time)},
          {'title': '方向', 'key': 'direction_display', 'value': res.data.direction_display},
          {'title': '以太网类型', 'key': 'ethertype_display', 'value': res.data.ethertype_display},
          {'title': 'IP协议', 'key': 'protocol_display', 'value': res.data.protocol_display},
          {'title': '端口范围', 'key': 'port_range_display', 'value': res.data.port_range_display},
          {'title': '远端IP前缀', 'key': 'remote_ip_prefix_display', 'value': res.data.remote_ip_prefix_display},
          {'title': '远端安全组', 'key': 'remote_group_name', 'value': res.data.remote_group_name},
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
          <BreadcrumbCustom first="网络管理" second="安全组规则列表" three="审核详情" />
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

export default SGRuleApprovalDetail;
