import React, { Component } from 'react';
import Ticketsider from '../../../common/LeftSider/ticketsider';
import { Layout, Form, Input, Button, Select, Table,notification, message } from 'antd';
import { connect } from 'react-redux';
import BreadcrumbCustom from '../../../BreadcrumbCustom';
import { getobjects } from './TableTpl/object';
import './list.less';
import * as Ajax from '../../../../utils/ticket/axios';

const { Sider, Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;

class ObjectManageForm extends Component {
    constructor(props) {
        super(props);
        this.columns = getobjects.call(this);
    }
    state = {
        deviceList: [],
        currentPage: 1,
        pageSize: 10,
        total: 0
    }
    getObjectList = (currentPage,e) =>  {
        if(e){
            e.preventDefault();
        }

        this.props.form.validateFields((err, values) => {
            let $this = this;
            let data = values;
            data.page = currentPage;
            data.status=0;
            data.pageSize = 10;
            Ajax.getAjax('/tickets',data,function (response) {
                console.log(data);
                console.log(response.data);
                if (response.data.code == 30000) {
                    let deviceList = response.data.objects;
                    let total = response.data.total ||0;
                    for(let key in deviceList){
                        deviceList[key].key = key-0+1;
                    }
                    $this.setState({userList: response.data.objects,total:total,currentPage:currentPage});
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
                if (response.data.code == "0") {
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

    deleteTicket = (id) =>{
        let $this = this;
        let data={id:id};
        Ajax.postAjax('/user/deleteUser',data,function (response) {
            console.log(response);
            if (response.data.code == "0") {
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

    getOptions = () =>{
        let $this = this;
        let data = {};
        Ajax.getAjax('/tickets',data,function (response) {
            if (response.data.code == 30000 ) {
                let options = response.data;
                $this.setState({options:options});
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
        this.getObjectList(1);
        // this.getOptions();
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
                  _that.getDeviceList(value)
              })
          }
    };

    return (
      <Layout className="config">
        <Sider >
            <Ticketsider/>
        </Sider>
        <Content style={{ padding: 0, margin:10, marginBottom: 0, minHeight: window.innerHeight-84 }}>
            <BreadcrumbCustom first="定制管理" second="工单对象" />
            <div className="form-search-box" style={{ background:'#fff',padding:10, }}>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <FormItem>
                        <Button type="primary" onClick={(e) => this.openModal('add',e)}>新建对象</Button>
                    </FormItem>
                    <div style={{ float:'right'}}>
                        <FormItem label="">
                            {getFieldDecorator('name',{initialValue:null})(
                                <Input placeholder="对象名称" />
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

const ObjectManage = Form.create()(ObjectManageForm);
export default connect((state) => {
    return { ...state };
})(ObjectManage);
