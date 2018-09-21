import React, { Component } from 'react';
import qs from 'qs'
import { message, Layout, Form, Input, Button, Select, Table } from 'antd';
import { connect } from 'react-redux';
import axios from 'axios';

import Daassider from '../../../components/common/LeftSider/daassider';
import { getGroupsList } from '../../../containers/Daas/groups.redux'
import { getGroupMembersList } from '../../../containers/Daas/groupmembers.redux'

import { GroupCreateForm } from './groupforms/groupcreateform'
import {GroupUpdateForm} from './groupforms/groupupdateform'
import {GroupMemberUpdateForm} from './groupforms/groupmemberupdateform'

import { postAjax } from '../../../utils/axios'
import BreadcrumbCustom from '../../BreadcrumbCustom';
import { getgroups } from './TableTpl/group';
import './list.less';

const baseUrl = 'http://127.0.0.1:8000';
var instance = axios.create({
    baseURL: baseUrl,//测试环境
    timeout: 2000,
});
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'

const { Sider, Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;

class DaasGroupManageForm extends Component {
    constructor(props) {
        super(props);
        this.columns = getgroups.call(this);
    }
    state = {
        currentPage: 1,
        pageSize: 10,
        updateRecord:{fields:{}},
        GroupCreateVisible: false,
        GroupCreateConfirmLoading: false,
        GroupUpdateVisible: false,
        GroupUpdateConfirmLoading: false,
    }
    componentDidMount () {
        this.props.getGroupsList({});
    }
    //重置表单
    handleReset = () => {
        this.props.form.resetFields();
    }

    showGroupCreateModel = () => {
        this.setState({GroupCreateVisible: true}) 
    }
    
    showGroupUpdateModel = (record) => {
        this.setState({updateRecord: record})
        this.setState({GroupUpdateVisible: true}) 

    }
    showGroupMemberUpdateModel = (record) => {
        this.setState({updateRecord: record})
        this.setState({GroupMemberUpdateVisible: true}) 
        this.GroupMemberUpdateFormRef.getUsers(record.pk)
        console.log(record.pk)
    }

    handleGroupCreateCancel = () => {
        this.setState({GroupCreateVisible: false}) 
        this.setState({GroupCreateConfirmLoading: false})
        const form = this.GroupCreateFormRef.props.form;
        form.resetFields();
    }

    handleGroupUpdateCancel = () => {
        this.setState({GroupUpdateVisible: false}) 
        this.setState({GroupUpdateConfirmLoading: false})
        const form = this.GroupUpdateFormRef.props.form;
        form.resetFields();
    }

    handleGroupMemberUpdateCancel = () => {
        this.setState({GroupMemberUpdateVisible: false}) 
        this.setState({GroupMemberUpdateConfirmLoading: false})
        const form = this.GroupMemberUpdateFormRef.props.form;
        form.resetFields();
    }

    handleGroupListWithArgs = (page, pageSize) => {
       let value = this.props.form.getFieldsValue()
       this.setState({
           currentPage: page,
           pageSize: pageSize 
       })
       let page_args = {page: page, pagesize: pageSize}
       page_args.name = value.name !== undefined ? value.name : "";
       this.props.getGroupsList(page_args);
    }

    handleGroupCreate = () => {
      const form = this.GroupCreateFormRef.props.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        this.setState({GroupCreateConfirmLoading: true})
        const _that = this;
        console.log(values);
        instance.post('/v1/api/slow/query/groups', qs.stringify(values))
          .then(function(res){
            if(res.data.code == 0){
                message.success("创建成功") 
                _that.setState({GroupCreateConfirmLoading: false})
                form.resetFields();
                _that.setState({ GroupCreateVisible: false });
                _that.handleGroupListWithArgs(1, 10);
            }else{
                message.error(res.data.message) 
                _that.setState({GroupCreateConfirmLoading: false})
            }
        })
      });
    }

    handleGroupUpdate = (group_obj) => {
      const form = this.GroupUpdateFormRef.props.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        this.setState({GroupUpdateConfirmLoading: true})
        const _that = this;
        console.log(values);
        // values.pk = group_id
        instance.put('/v1/api/slow/query/groups/' +  group_obj.pk, qs.stringify(values))
          .then(function(res){
            if(res.data.code == 0){
                console.log(values)
                message.success("更新成功") 
                _that.setState({GroupUpdateConfirmLoading: false})
                form.resetFields();
                _that.setState({ GroupUpdateVisible: false });
                _that.setState({ GroupCreateVisible: false });
                _that.handleGroupListWithArgs(1, 10);
            }else{
                message.error(res.data.message) 
                _that.setState({GroupUpdateConfirmLoading: false})
            }
        })
      });
    }

    handleGroupMemberUpdate = (group_obj) => {
      console.log(group_obj)
      const form = this.GroupMemberUpdateFormRef.props.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        this.setState({GroupMemberUpdateConfirmLoading: true})
        const _that = this;
        console.log(values);
        instance.put('/v1/api/slow/query/group/user/relationships/' +  group_obj.pk, qs.stringify(values))
          .then(function(res){
            if(res.data.code == 0){
                console.log(values)
                message.success("更新成功") 
                _that.setState({GroupMemberUpdateConfirmLoading: false})
                form.resetFields();
                _that.setState({ GroupMemberUpdateVisible: false });
                _that.handleGroupListWithArgs(1, 10);
            }else{
                message.error(res.data.message) 
                _that.setState({GroupMemberUpdateConfirmLoading: false})
            }
        })
      });
    }


    saveGroupCreateFormRef = (formRef) => {
      this.GroupCreateFormRef = formRef;
    }

    saveGroupUpdateFormRef = (formRef) => {
      this.GroupUpdateFormRef = formRef;
    } 

    saveGroupMemberUpdateFormRef = (formRef) => {
      this.GroupMemberUpdateFormRef = formRef;
    }

    handleGroupsQuery = () => {
        let value = this.props.form.getFieldsValue()
        this.setState({
            currentPage: 1,
            pageSize: 10 
        })
        let page_args = {page: 1, pagesize: 10}
        page_args.name = value.name !== undefined  ? value.name : "";
        this.props.getGroupsList(page_args);
    }

  render() {
    const { getFieldDecorator } = this.props.form;
    let _that = this;
    const pagination = {
          current: this.state.currentPage,
          total: this.props.total,
          pageSize: this.state.pageSize,
          showSizeChanger: true,
          showTotal:(total, range) => `${range[0]}-${range[1]} of ${total} items`,
          showQuickJumper: true,
          //当表格有变化时，如：点击分页  current是当前页面页码
          onChange(page, pageSize) {
              let value = _that.props.form.getFieldsValue()
              _that.setState({
                  currentPage: page,
                  pageSize: pageSize
              })
              let page_args = {page, page_size: pageSize}
              page_args.name = value.name !== undefined  ? value.name : "";
              _that.props.getGroupsList({page_args});
          },

          onShowSizeChange(current, size) {
              let value = _that.props.form.getFieldsValue()
              _that.setState({
                  currentPage: 1,
                  pageSize: size 
              })
              let page_args = {page: 1, page_size: size}
              page_args.name = value.name !== undefined  ? value.name : "";
              _that.props.getGroupsList({page_args});
          }
    };

    return (
      <Layout className="config">
        <Sider >
            <Daassider/>
        </Sider>
        <Content style={{ padding: 0, margin:10, marginBottom: 0, minHeight: window.innerHeight-84 }}>
            <BreadcrumbCustom first="关系型数据库" second="慢日志查询组列表" />
            <div className="form-search-box" style={{ background:'#fff',padding:10, }}>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <FormItem>
                        <Button type="primary" onClick={this.showGroupCreateModel}>创建邮件组</Button>
                        {/*<Button type="primary" onClick={(e) => this.openAddDevicePage('add',e)}>创建邮件组</Button>*/}
                		<GroupCreateForm
        				  wrappedComponentRef={this.saveGroupCreateFormRef}
        				  visible={this.state.GroupCreateVisible}
                          confirmLoading={this.state.GroupCreateConfirmLoading}
        				  onCancel={this.handleGroupCreateCancel}
        				  onCreate={this.handleGroupCreate}
        				/>
                        <GroupUpdateForm
                          wrappedComponentRef={this.saveGroupUpdateFormRef}
                          visible={this.state.GroupUpdateVisible}
                          groupinfo={this.state.updateRecord}
                          confirmLoading={this.state.GroupUpdateConfirmLoading}
                          onCancel={this.handleGroupUpdateCancel}
                          onCreate={() => this.handleGroupUpdate(this.state.updateRecord)}
                        />       
                        <GroupMemberUpdateForm
                          wrappedComponentRef={this.saveGroupMemberUpdateFormRef}
                          visible={this.state.GroupMemberUpdateVisible}
                          groupinfo={this.state.updateRecord}
                          confirmLoading={this.state.GroupMemberUpdateConfirmLoading}
                          onCancel={this.handleGroupMemberUpdateCancel}
                          onCreate={() => this.handleGroupMemberUpdate(this.state.updateRecord)}
                        />
                    </FormItem>
                    <div style={{ float:'right'}}>

                        <FormItem label="">
                            {getFieldDecorator('name')(
                                <Input placeholder="组名" />
                            )}
                        </FormItem>
                    <FormItem>
                        <Button type="primary" className="btn-search" style={{marginRight: 10}} onClick={this.handleGroupsQuery}>查询</Button>
                        <Button className="btn-search" onClick={this.handleReset}>重置</Button>
                    </FormItem>
                    </div>
                </Form>
            </div>

            <div style={{ background:'#fff' }}>
                <Table bordered loading={this.props.loading} rowKey={record => record.pk} columns={this.columns} dataSource={this.props.groupsList} pagination={pagination} />
            </div>
            <div style={{margin: 20}}>
                <span className='num'>共找到 { this.props.total }条结果， 每页显示10条</span>
            </div>
        </Content>
      </Layout>
    );
  }
}

const DaasGroupManage = Form.create()(DaasGroupManageForm);
export default connect(
  state => state.daasGroups,
  { getGroupsList })(DaasGroupManage);
