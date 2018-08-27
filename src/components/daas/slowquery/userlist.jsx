import React, { Component } from 'react';
import Daassider from '../../../components/common/LeftSider/daassider';
import { Layout, Form, Input, Button, Select, Table } from 'antd';
import { connect } from 'react-redux';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import { getusers } from './TableTpl/usertabletpl';
import './userlist.less';

const { Sider, Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;

class SlowQueryUserForm extends Component {
    constructor(props) {
        super(props);
        this.columns = getusers.call(this);
    }
    state = {
        deviceList: [],
        currentPage: 1,
        pageSize: 10,
        total: 0
    }
    componentDidMount () {
        this.setState({
            deviceList:[]
        })
    }
    //重置表单
    handleReset = () => {
        this.props.form.resetFields();
    }

    openAddUserPage = (value) => {
        this.props.history.push({pathname:'/slowquery/add-user', data:value});
    }

  render() {
    const { getFieldDecorator } = this.props.form;
    let _that = this;
    const pagination = {
          current: this.state.currentPage,
          total: this.state.total,
          pageSize: this.state.pageSize,
          showQuickJumper: true,
          //当表格有变化时，如：点击分页  current是当前页面页码
          onChange() {
              let value = _that.props.form.getFieldsValue()
              _that.setState({
                  currentPage: this.current,
              }, () => {
                  _that.getUserList(value)
              })
          }
    };

    return (
      <Layout className="config">
        <Sider >
            <Daassider/>
        </Sider>
        <Content style={{ padding: 0, margin:10, marginBottom: 0, minHeight: window.innerHeight-84 }}>
            <BreadcrumbCustom first="首页" second="慢日志查询用户列表" />
            <div className="form-search-box" style={{ background:'#fff',padding:10, }}>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <FormItem>
                        <Button type="primary" onClick={(e) => this.openAddUserPage('add',e)}>创建用户</Button>
                    </FormItem>
                    <div style={{ float:'right'}}>
                      {/* <FormItem label="">
                            {getFieldDecorator('value')(
                                <Input placeholder="请输入IP地址" />
                            )}
                          </FormItem> */}
                        <FormItem label="">
                            {getFieldDecorator('name')(
                                <Input placeholder="用户名" />
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
                <Table bordered rowKey={record => record.key} columns={this.columns} dataSource={this.state.deviceList} pagination={pagination} />
            </div>
            <div style={{margin: 20}}>
                <span className='num'>共找到 { this.state.total }条结果， 每页显示10条</span>
            </div>
        </Content>
      </Layout>
    );
  }
}

const SlowQueryUser = Form.create()(SlowQueryUserForm);
export default connect((state) => {
    return { ...state };
})(SlowQueryUser);