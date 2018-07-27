import React, { Component } from 'react';
import LeftSider from '../../components/common/LeftSider';
import { Layout, Form, Input, Button, Select, Table, notification, message} from 'antd';
import * as Ajax from '../../utils/axios';
import { connect } from 'react-redux';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { getColumns } from './TableTpl/tabletpl';
import UserModal from './Modal/modal';
import ChangeModalForm from'./ChangeModalForm/index';


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
        pageSize: 10,
        total: 0

    }

    getUserList = (currentPage,e) =>  {
        if(e){
            e.preventDefault();
        }

        this.props.form.validateFields((err, values) => {
            let $this = this;
            let data = values;
            data.page = currentPage;
            data.pageSize = this.state.pageSize;
            Ajax.postAjax('/user/searchUser',data,function (response) {
                console.log(response);
                if (response.data.errorCode == "0") {
                    let userList = response.data.data.list;
                    let total = response.data.data.total;
                    for(let key in userList){
                        userList[key].key = key-0+1;
                    }
                    $this.setState({userList: response.data.data.list,total:total});
                } else {
                    notification.error({
                        message: '提示',
                        description: response.data.msg,
                        duration: 2
                    })
                }
            })
        });
    }

    changeStatus = (id,status) =>{

        console.log(id);
        console.log(status);

            let $this = this;
            let data={id:id,status:status};
            Ajax.postAjax('/user/updateUserStatus',data,function (response) {
                console.log(response);
                if (response.data.errorCode == "0") {
                   // this.getUserList();
                    message.success("状态修改成功！")
                    $this.getUserList();
                } else {
                    notification.error({
                        message: '提示',
                        description: response.data.msg,
                        duration: 2
                    })
                }
            })

    }

    deleteUser = (id) =>{

        console.log(id);

        let $this = this;
        let data={id:id};
        Ajax.postAjax('/user/deleteUser',data,function (response) {
            console.log(response);
            if (response.data.errorCode == "0") {
                // this.getUserList();
                message.success("删除成功！")
                $this.getUserList();
            } else {
                notification.error({
                    message: '提示',
                    description: response.data.msg,
                    duration: 2
                })
            }
        })

    }

    componentDidMount () {
        this.getUserList();
    }
    //重置表单
    handleReset = () => {
        this.props.form.resetFields();
    }
    openModal = (data) => {
        console.log(data);
        if(data === "add"){
            this.setState({
                modalType: 'add',
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

    openPwdModal = (data) => {
        this.setState({
            isPwdOpen: true,
            areaData:data
        })
    }
    hideModal = () => {
        this.setState({
            isOpen: false,
        })
    }
    hidePwdModal = () => {
        this.setState({
            isPwdOpen: false,
        })
    }



  render() {
    const { getFieldDecorator, getFieldsValue } = this.props.form;
    let $this = this;
    const pagination = {
          current: this.state.currentPage,
          total: this.state.total,
          pageSize: this.state.pageSize,
          showQuickJumper: true,
          //当表格有变化时，如：点击分页  current是当前页面页码
          onChange() {
              const values = getFieldsValue();
              const currentPage = this.current;
              $this.getUserList
          }
    };

    return (
      <Layout className="config">
        <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
            <LeftSider/>
        </Sider>
        <Content style={{ padding: 0, margin:10, marginLeft:210, marginBottom: 0, minHeight: window.innerHeight-84 }}>
            <BreadcrumbCustom first="用户管理" second="用户列表" />
            <div className="form-search-box" style={{ background:'#fff',padding:10, }}>
                <Form layout="inline" onSubmit={(e) => this.getUserList('1',e)}>
                    <FormItem>
                        <Button type="primary" onClick={(e) => this.openModal('add',e)}>添加用户</Button>
                    </FormItem>
                    <div style={{ float:'right'}}>
                    <FormItem label="">
                        {getFieldDecorator('roleId',{initialValue:''})(
                            <Select style={{ width:120 }}>
                                <Option value="">按角色选择</Option>
                                <Option value="1">超级管理员</Option>
                            </Select>
                        )}
                    </FormItem>
                        <FormItem label="">
                            {getFieldDecorator('name',{initialValue:''})(
                                <Input placeholder="请输入姓名、邮箱"/>
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
                this.state.isOpen && <UserModal hideModal={this.hideModal} modalType={this.state.modalType} isOpen={this.state.isOpen}  areaData={this.state.areaData} />
            }
            {
                this.state.isPwdOpen && <ChangeModalForm hidePwdModal={this.hidePwdModal}  isPwdOpen={this.state.isPwdOpen} areaData={this.state.areaData} />
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
