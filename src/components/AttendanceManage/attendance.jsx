import React, { Component } from 'react';
import AttendSider from '../../components/common/LeftSider';
import { Layout, Form, Input, Button, Select, Table } from 'antd';
import { connect } from 'react-redux';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { getColumns } from './TableTpl/tabletpl';
import UserModal from './Modal/modal';
import './attendance.less';

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
        total: 0
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
                    <AttendSider/>
                </Sider>
                <Content style={{ padding: 0, margin:10, marginLeft:210, marginBottom: 0, minHeight: window.innerHeight-84 }}>
                    <BreadcrumbCustom first="考勤管理" second="考勤记录" />
                    <div className="form-search-box" style={{ background:'#fff',padding:10, }}>
                        <div className="form-title">加工组一组考勤记录列表</div>
                        <Form layout="inline" onSubmit={this.handleSubmit}>
                            <FormItem>
                                <Button type="primary" onClick={(e) => this.openModal('add',e)}>考勤设置</Button>
                            </FormItem>
                            <div style={{ float:'right'}}>
                                <FormItem label="">
                                    {getFieldDecorator('roletype',{initialValue:''})(
                                        <Select style={{ width:120 }}>
                                            <Option value="">2018年7月</Option>
                                            <Option value="1">2018年6月</Option>
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
                        <Table bordered rowKey={record => record.id} columns={this.columns} dataSource={this.state.userList} pagination={pagination} />
                    </div>
                    <div style={{margin: 20}}>
                        <span className='num'>共找到 { this.state.total }条结果， 每页显示10条</span>
                    </div>

                    {
                        this.state.isOpen && <UserModal hideModal={this.hideModal} modalType={this.state.modalType} isOpen={this.state.isOpen} areaData={this.state.UserData} />
                    }
                </Content>
            </Layout>
        );
    }
}

const UserList = Form.create()(UserListForm);
export default connect((state) => {
    return { ...state };
})(UserList);
