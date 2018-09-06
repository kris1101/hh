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
    project_data: [],
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
      this.build_log_request(1);
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
        project_data: [
          {'title': '基础镜像', 'key': 'image_name', 'value': res.data.image_name+':'+res.data.image_tag},
          {'title': '安装依赖命令', 'key': 'install_cmd', 'value': res.data.install_cmd},
          {'title': '代码存放路径', 'key': 'code_path', 'value': res.data.code_path},
          {'title': '编译命令', 'key': 'compile_cmd', 'value': res.data.compile_cmd},
          {'title': '工作目录', 'key': 'work_dir', 'value': res.data.work_dir},
          {'title': '启动命令', 'key': 'start_cmd', 'value': res.data.start_cmd},
          {'title': 'User in Docker', 'key': 'docker_user', 'value': res.data.docker_user},
        ],
        build_data: [
          {'title': 'Gitlab', 'key': 'git', 'value': res.data.git},
          {'title': '自动构建分支', 'key': 'git_branch', 'value': res.data.git_branch},
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
                    <Table columns={this.columns} dataSource={this.state.project_data}
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
                    <div style={{ marginBottom: 16 }}>
                      <Form layout="inline">
                        <FormItem>
                          <Button type="primary" onClick={() => this.build_log_request(1)}
                                  disabled={this.state.loading} loading={this.state.loading}
                          ><Icon type="reload" /></Button>
                        </FormItem>
                      </Form>
                    </div>

                    <Table columns={this.log_columns} dataSource={this.state.build_log_data}
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
