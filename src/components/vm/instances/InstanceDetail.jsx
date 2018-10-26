import React from 'react';
import { notification, Layout, Table, Row, Col, Card, Tabs } from 'antd';

import BreadcrumbCustom from '../../BreadcrumbCustom';
import VMSider from '../../common/LeftSider/vmsider';
import { instanceDetail } from '../../../services/vm/user';
import { getDetailColumes, getLogColumes } from './TableTpl/instanceTableTpl';
import { humansize, timezoneFormat } from '../../../utils/vm'

const TabPane = Tabs.TabPane;
const { Sider, Content } = Layout;


class InstanceDetail extends React.Component {
  constructor(props) {
    super(props);
    this.columns = getDetailColumes.call(this);
    this.snapshot_columns = getLogColumes.call(this);
    this.log_columns = getLogColumes.call(this);
  }
  state = {
    loading: false,
    activeKey: "1",
    base_data: [],
    base_flavor_data: [],
    base_ip_data: [],
    base_sg_data: [],
    base_metadata_data: [],
    snapshot_data: [],
    snapshot_pagination: {total: 0, defaultPageSize: 20, defaultCurrent: 1, pageSize: 20},

    log_data: [],
    log_pagination: {total: 0, defaultPageSize: 20, defaultCurrent: 1, pageSize: 20},
  };
  componentDidMount() {
    this.start();
  }
  onTabChange = (activeKey) => {
    // console.log(activeKey)
    this.setState({ activeKey: activeKey });
    if (activeKey === '2'){
      this.snapshot_request();
    } else if (activeKey === '3'){
      this.log_request();
    }
  }

  start = () => {
    this.setState({ loading: true });
    instanceDetail(this.props.match.params.id).then(res => {
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
          {'title': '实例名', 'key': 'name', 'value': res.data.name},
          {'title': 'ID', 'key': 'uuid', 'value': res.data.uuid},
          {'title': '主机', 'key': 'host', 'value': res.data.host},
          {'title': '可用域', 'key': 'domain_id', 'value': res.data.domain_id},
          {'title': '状态', 'key': 'run_status_display', 'value': res.data.run_status_display},
          {'title': '创建时间', 'key': 'create_time', 'value': timezoneFormat(res.data.create_time)},
          {'title': '申请理由', 'key': 'reason', 'value': res.data.reason},
          {'title': '描述', 'key': 'description', 'value': res.data.description},
        ],
        base_flavor_data: [
          {'title': '实例类型名称', 'key': 'flavor_name', 'value': res.data.flavor_data.name},
          {'title': '实例类型ID', 'key': 'flavor_uuid', 'value': res.data.flavor_data.uuid},
          {'title': '内存', 'key': 'flavor_memory_mb', 'value': humansize(res.data.flavor_data.memory_mb, 'MB')},
          {'title': 'VCPU数量', 'key': 'flavor_vcpus', 'value': res.data.flavor_data.vcpus},
          {'title': '磁盘', 'key': 'flavor_root_gb', 'value': res.data.flavor_data.root_gb + 'GB'},
        ],
        base_ip_data: [...Object.keys(res.data.api_instance.addresses).map(val => {
          return {'title': val, 'key': 'ip_'+val, 'value': res.data.api_instance.addresses[val].map(val => {return val.addr}).join('\n')};
        })],
        base_sg_data: [...res.data.api_instance.security_groups.map(val => {
          const rules = val.rules || []
          return {'title': val.name, 'key': 'ip_'+val.name, 'value': rules.join('\n')};
        })],
        base_metadata_data: [
          {'title': '密钥对名称', 'key': 'image_key', 'value': res.data.api_instance.key_name || '-'},
          {'title': '镜像名称', 'key': 'image_name', 'value': res.data.image_name || '-'},
          {'title': '镜像ID', 'key': 'image_id', 'value': res.data.image_id},
        ],
        loading: false,
      });
    });

  };

  refresh_snapshot = () => {
    this.snapshot_request();
  };
  snapshot_request = (page=1) => {
    this.setState({ loading: true });
    this.setState({ loading: false });

  };
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.snapshot_pagination };
    pager.current = pagination.current;
    this.setState({
      snapshot_pagination: pager,
    });
    this.snapshot_request(pagination.current);
  };
  refresh_group = () => {
    this.log_request();
  };
  log_request = (page=1) => {
    // const { log_pagination } = this.state;
    this.setState({ loading: true });
    instanceDetail(this.props.match.params.id, {page: page}).then(res => {
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
        log_data: [...res.data.map(val => {
          val.key = val.id;
          return val;
        })],
        loading: false,
        log_pagination: pagination_,
      });
    });

  };

  handleLogTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.log_pagination };
    pager.current = pagination.current;
    this.setState({
      log_pagination: pager,
    });
    this.snapshot_request(pagination.current);
  };


  render() {
    return (
      <Layout className="config">
        <Sider>
            <VMSider/>
        </Sider>
        <Content style={{ padding: 0, margin:10,  marginBottom: 0, minHeight: window.innerHeight-84 }}>
          <BreadcrumbCustom first="虚拟机管理" second="实例列表" three="实例详情" />
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
                    <h3>规格:</h3>
                    <Table
                      columns={this.columns}
                      dataSource={this.state.base_flavor_data}
                      loading={this.state.loading}
                      pagination={false}
                      showHeader={false}
                      bordered={true}
                    />
                    <h3>IP地址:</h3>
                    <Table
                      columns={this.columns}
                      dataSource={this.state.base_ip_data}
                      pagination={false}
                      showHeader={false}
                      bordered={true}
                    />
                    <h3>安全组:</h3>
                    <Table
                      columns={this.columns}
                      dataSource={this.state.base_sg_data}
                      pagination={false}
                      showHeader={false}
                      bordered={true}
                    />
                    <h3>元数据:</h3>
                    <Table
                      columns={this.columns}
                      dataSource={this.state.base_metadata_data}
                      pagination={false}
                      showHeader={false}
                      bordered={true}
                    />
                  </TabPane>

                  <TabPane tab={<span>快照列表</span>} key="2">
                    <Table columns={this.snapshot_columns} dataSource={this.state.snapshot_data}
                      loading={this.state.loading}
                      pagination={this.state.snapshot_pagination}
                      onChange={this.handleTableChange}
                      bordered={true}
                    />
                  </TabPane>

                  <TabPane tab={<span>操作历史</span>} key="3">
                    <Table columns={this.log_columns} dataSource={this.state.log_data}
                      loading={this.state.loading}
                      pagination={this.state.log_pagination}
                      onChange={this.handleLogTableChange}
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

export default InstanceDetail;
