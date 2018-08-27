import React, { Component } from 'react';
import Dockersider from '../../../../common/LeftSider/dockersider';
import { Layout, Form, Input, Button, Select, Table } from 'antd';
import { connect } from 'react-redux';
import BreadcrumbCustom from '../../../../../components/BreadcrumbCustom';
import { getprojects } from './TableTpl/tabletpl';
import './harborproject.less';
import { getProjectList } from '../../../../../containers/Paas/harbor/project.redux'

const { Sider, Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;

class HarborProjectForm extends Component {
    constructor(props) {
        super(props);
        this.columns = getprojects.call(this);
    }
    state = {
        loading: false,
        currentPage: 1,
        pageSize: 10,
        total: 0
    }
    componentDidMount () {
        this.props.getProjectList({});
    }
    //重置表单
    handleReset = () => {
        this.props.form.resetFields();
    }

    openAddDevicePage = (value) => {
        this.props.history.push({pathname:'/config/add-device', data:value});
    }

  render() {
    const { getFieldDecorator } = this.props.form;
    let _that = this;
    const pagination = {
          current: this.state.currentPage,
          total: this.state.total,
          pageSize: this.state.pageSize,
          showSizeChanger: true,
          showQuickJumper: true,
          //当表格有变化时，如：点击分页  current是当前页面页码
          onChange() {
              let value = _that.props.form.getFieldsValue()
              _that.setState({
                  currentPage: this.current,
              }, () => {
                  _that.getDeviceList(value)
              })
          }
    };

    return (
      <Layout className="config">
        <Sider>
            <Dockersider/>
        </Sider>
        <Content style={{ padding: 0, margin:10, marginBottom: 0, minHeight: window.innerHeight-84 }}>
            <BreadcrumbCustom first="镜像仓库" second="项目" />
            <div className="form-search-box" style={{ background:'#fff',padding:10, }}>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <FormItem>
                        <Button type="primary" onClick={(e) => this.openAddDevicePage('add',e)}>新建项目</Button>
                    </FormItem>
                    <div style={{ float:'right'}}>
                        <FormItem label="">
                            {getFieldDecorator('value')(
                                <Input placeholder="请输入IP地址" />
                            )}
                        </FormItem>
                        <FormItem label="">
                            {getFieldDecorator('name')(
                                <Input placeholder="实例名称" />
                            )}
                        </FormItem>
                    <FormItem>
                        <Button type="primary" className="btn-search" htmlType="submit" style={{marginRight: 10}}>查询</Button>
                        <Button className="btn-search" onClick={this.handleReset}>重置</Button>
                    </FormItem>
                    </div>
                </Form>
            </div>

            <div style={{ background:'#fff' }}>
                <Table bordered loading={this.state.loading} rowKey={record => record.project_id} columns={this.columns} dataSource={this.props.projectList} pagination={pagination} />
            </div>
        </Content>
      </Layout>
    );
  }
}


const HarborProjectManage = Form.create()(HarborProjectForm);
export default connect(
  state => state.harborProject,
  { getProjectList })(HarborProjectManage);
