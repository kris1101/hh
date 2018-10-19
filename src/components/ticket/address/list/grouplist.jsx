import React, { Component } from 'react';
import Ticketsider from '../../../common/LeftSider/ticketsider';
import { Layout, Form, Input, Button, Select, Table,notification, message,Modal } from 'antd';
import { connect } from 'react-redux';
import BreadcrumbCustom from '../../../BreadcrumbCustom';
import { getgroups } from './TableTpl/group';
import './list.less';
import * as Ajax from '../../../../utils/ticket/axios';
import GroupModal from '../create/groupmodal';

const { Sider, Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm;


class GroupManageForm extends Component {
    constructor(props) {
        super(props);
        this.columns = getgroups.call(this);
    }
    state = {
        deviceList: [],
        currentPage: 1,
        pageSize: 10,
        total: 0,
        isOpen: false,
        currentData: [],
    }
    getGroupList = (value) =>  {
        let params = {
            "page": this.state.currentPage,
            "pageSize": this.state.pageSize,
        }
        let _this = this;

        if(value){
            params.displayName = value && value.name ? value.name : '';
        }

        this.props.form.validateFields((err, values) => {
            let $this = this;
            let data = values;
            data.page = params.page;
            data.status=0;
            data.pageSize = 10;

            Ajax.getAjax('/ticket/groups',data,function (response) {
                console.log(response.data);
                if (response.data.code == 30000) {
                    let deviceList = response.data.objects;
                    let total = response.data.total ||0;
                    for(let key in deviceList){
                        deviceList[key].key = key-0+1;
                        let user_names='';
                        let users=deviceList[key].users;
                        for (let name in users){
                            user_names = user_names+users[name].user_name+ ','
                        }
                        deviceList[key].user_names=user_names
                    }

                    $this.setState({deviceList: response.data.objects,total:total,currentPage:params.page});
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

    deleteData = (value) => {
        let id = value.uuid;
        let _this = this;
        confirm({
            title:'确认删除?',
            okText:'确认',
            okType: 'danger',
            cancelText: '取消',
            onOk(){
                Ajax.deleteAjax('/ticket/group/'+id, (res) => {
                    if(res.data.code===30000){
                        message.success(res.data.message, 3);
                        _this.getGroupList();
                    } else {
                        message.error(res.data.message, 3)
                    }
                })
            }
        })
    }

    openModal = (data) => {
        if(data === "add"){
            this.setState({
                modalType: data,
                isOpen: true,
                currentData: null
            })
        } else {
            this.setState({
                modalType: 'edit',
                isOpen: true,
                currentData: data
            })
        }
    }

    componentDidMount () {
        this.getGroupList();
    }
    //重置表单
    handleReset = () => {
        this.props.form.resetFields();
    }

    hideModal = (str) => {
        let _this = this;
        if(str === 'ok') {
            _this.setState({
                isOpen: false
            }, () => {
                _this.getGroupList()
            })
        } else {
            this.setState({
                isOpen: false
            })
        }
    }
    handleSubmit = (e) => {
        if(e){
            e.preventDefault()
        }
        this.props.form.validateFields((err, values) => {
            if(!err) {
                this.setState({
                    currentPage: 1
                }, () => {
                    this.getGroupList(values);
                })
            }
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
            <BreadcrumbCustom first="通讯录" second="通讯组" />
            <div className="form-search-box" style={{ background:'#fff',padding:10, }}>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <FormItem>
                        <Button type="primary" onClick={(e) => this.openModal('add',e)}>新建通讯组</Button>
                    </FormItem>
                    <div style={{ float:'right'}}>

                        <FormItem label="">
                            {getFieldDecorator('name',{initialValue:null})(
                                <Input placeholder="通讯录名称" />
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
            {
                this.state.isOpen && <GroupModal hideModal={this.hideModal} isOpen={this.state.isOpen} modalType={this.state.modalType} currentData={this.state.currentData} />
            }
        </Content>
      </Layout>
    );
  }
}

const GroupManage = Form.create()(GroupManageForm);
export default connect((state) => {
    return { ...state };
})(GroupManage);
