import React, { Component } from 'react';
import LeftSider from '../../components/common/LeftSider';
import { Layout, Form, Input, Button, Select, Table } from 'antd';
import { connect } from 'react-redux';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { getColumns } from './TableTpl/tabletpl';
import EmailModal from './Modal/modal';
import EmailModal2 from './Modal/modal2';

const { Sider, Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;

class UserListForm extends Component {
    constructor(props) {
        super(props);
        this.columns = getColumns.call(this);
    }
    state = {
        userList: [],
        currentPage: 1,
        pageSize: 10,
        total: 0,
        isOpen: false,
        isOpen2: false
    }
    componentDidMount () {
        this.setState({
            userList:[{
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
    openModal = (data) => {
        if(data === "add"){
            this.setState({
                modalType: data,
                isOpen: true,
                areaData: null
            })
        } else {
            this.setState({
                modalType: 'edit',
                isOpen: true,
                areaData: data
            })
        }
    }
    hideModal = () => {
        this.setState({
            isOpen: false,
        })
    }

    openModal2 = () => {
       this.setState({
           isOpen2: true,
       })
    }
    hideModal2 = () => {
        this.setState({
            isOpen2: false,
        })
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
        <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
            <LeftSider/>
        </Sider>
        <Content style={{ padding: 0, margin:10, marginLeft:210, marginBottom: 0, minHeight: window.innerHeight-84 }}>
            <BreadcrumbCustom first="系统设置" second="邮箱设置" />
            <div className="form-search-box" style={{ background:'#fff',padding:10, }}>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <FormItem>
                        <Button type="primary" onClick={(e) => this.openModal('add',e)}>添加邮箱</Button>
                    </FormItem>
                    <FormItem>
                        <Button type="primary">邮箱模板</Button>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={(e) => this.openModal2(e)}>配置发送邮箱</Button>
                    </FormItem>
                    <div style={{ float:'right'}}>
                    <FormItem label="">
                        {getFieldDecorator('emailtype',{initialValue:''})(
                            <Select style={{ width:120 }}>
                                <Option value="">按邮件类型</Option>
                                <Option value="1">考勤</Option>
                                <Option value="2">报警</Option>
                            </Select>
                        )}
                    </FormItem>
                        <FormItem label="">
                            {getFieldDecorator('alerttype',{initialValue:''})(
                                <Select style={{ width:120 }}>
                                    <Option value="">按警报类型</Option>
                                    <Option value="1">周界入侵高级</Option>
                                    <Option value="2">周界入侵中级</Option>
                                    <Option value="3">周界入侵低级</Option>
                                    <Option value="0">异常时间报警</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label="">
                            {getFieldDecorator('roletype',{initialValue:''})(
                                <Input placeholder="请输入邮箱"/>
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
                <Table bordered rowKey={record => record.id} columns={this.columns} dataSource={this.state.userList} pagination={pagination} />
            </div>
            <div style={{margin: 20}}>
                <span className='num'>共找到 { this.state.total }条结果， 每页显示10条</span>
            </div>

            {
                this.state.isOpen && <EmailModal hideModal={this.hideModal} modalType={this.state.modalType} isOpen={this.state.isOpen} areaData={this.state.UserData} />
            }
            {
                this.state.isOpen2 && <EmailModal2 hideModal={this.hideModal2} isOpen={this.state.isOpen2} areaData={this.state.UserData} />
            }
        </Content>
      </Layout>
    );
  }
}

const Emaillist = Form.create()(UserListForm);
export default connect((state) => {
    return { ...state };
})(Emaillist);
