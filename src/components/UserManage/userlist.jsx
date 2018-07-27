import React, { Component } from 'react';
import LeftSider from '../../components/common/LeftSider';
import { Layout, Form, Input, Button, Select, Table } from 'antd';
import { connect } from 'react-redux';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { getColumns } from './TableTpl/tabletpl';
import './userlist.less';

const { Sider, Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;

class UserManageForm extends Component {
    constructor(props) {
        super(props);
        this.columns = getColumns.call(this);
    }
    state = {
        roleList: [],
        currentPage: 1,
        pageSize: 10,
        total: 0
    }
    componentDidMount () {
        this.setState({
            roleList:[{
                key:'1',
                id: '1000',
                roleName: '超级管理员'
            }, {
                key:'2',
                id: '2001',
                roleName: '设备添加员'
            }]
        })
    }
    //重置表单
    handleReset = () => {
        this.props.form.resetFields();
    }

    openAddRolePage = (value) => {
        this.props.history.push({pathname:'/config/addrole', data:value});
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
                  _that.getArticleList(value)
              })
          }
    };

    return (
      <Layout className="config">
        <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
            <LeftSider/>
        </Sider>
        <Content style={{ padding: 0, margin:10, marginLeft:210, marginBottom: 0, minHeight: window.innerHeight-84 }}>
            <BreadcrumbCustom first="用户管理" second="角色管理" />
            <div className="form-search-box" style={{ background:'#fff',padding:10, }}>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <FormItem>
                        <Button type="primary" onClick={(e) => this.openAddRolePage('add', e)}>添加角色</Button>
                    </FormItem>
                    <div style={{ float:'right'}}>
                    <FormItem label="">
                        {getFieldDecorator('roletype',{initialValue:''})(
                            <Select style={{ width:120 }}>
                                <Option value="">按角色选择</Option>
                                <Option value="1">超级管理员</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" className="btn-search" htmlType="submit" style={{marginRight: 10}}>搜索</Button>
                        <Button className="btn-search" onClick={this.handleReset}>重置</Button>
                    </FormItem>
                    </div>
                </Form>
            </div>

            <div style={{ background:'#fff' }}>
                <Table bordered rowKey={record => record.id} columns={this.columns} dataSource={this.state.roleList} pagination={pagination} />
            </div>
            <div style={{margin: 20}}>
                <span className='num'>共找到 { this.state.total }条结果， 每页显示10条</span>
            </div>
        </Content>
      </Layout>
    );
  }
}

const UserManage = Form.create()(UserManageForm);
export default connect((state) => {
    return { ...state };
})(UserManage);
