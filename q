warning: LF will be replaced by CRLF in src/components/daas/slowquery/email.jsx.
The file will have its original line endings in your working directory.
warning: LF will be replaced by CRLF in src/components/daas/slowquery/instance.jsx.
The file will have its original line endings in your working directory.
warning: LF will be replaced by CRLF in src/containers/Daas/constants/index.js.
The file will have its original line endings in your working directory.
[1mdiff --git a/src/components/daas/slowquery/TableTpl/group.jsx b/src/components/daas/slowquery/TableTpl/group.jsx[m
[1mindex 4253736..a7aa8e7 100644[m
[1m--- a/src/components/daas/slowquery/TableTpl/group.jsx[m
[1m+++ b/src/components/daas/slowquery/TableTpl/group.jsx[m
[36m@@ -1,53 +1,33 @@[m
 import React, { Component } from 'react';[m
[31m-import { Button, Popconfirm, message } from 'antd';[m
[31m-import axios from 'axios';[m
[32m+[m[32mimport { Row, Col} from 'antd';[m
[32m+[m[32mimport DaasSlowQueryGroupDetailModel from '../group/groupdetailmodel';[m
[32m+[m[32mimport DaasSlowQueryGroupEditModel from '../group/groupeditmodel';[m
[32m+[m[32mimport DaasSlowQueryGroupDeleteModel from '../group/groupdeletemodel';[m
 [m
[31m-import { formatStrDate } from '../../../docker/utils/time_helper'[m
[31m-import chart from '../../../../static/icons/area_chart.png'[m
[31m-import {groupdetail} from '../groupforms/groupdetailform'[m
[31m-import {GroupUpdateForm} from '../groupforms/groupupdateform'[m
 [m
[31m-const baseUrl = 'http://127.0.0.1:8000';[m
[31m-var instance = axios.create({[m
[31m-    baseURL: baseUrl,//测试环境[m
[31m-    timeout: 2000,[m
[31m-});[m
[31m-[m
[31m-function confirm(pk, _that) {[m
[31m-  const hide = message.loading('Action in progress..', 0);[m
[31m-  instance.delete('/v1/api/slow/query/groups/' + pk)[m
[31m-    .then(function(res){[m
[31m-    hide();[m
[31m-    if(res.data.code == 0){[m
[31m-        message.success(res.data.message);[m
[31m-        _that.handleGroupListWithArgs(1, 10);[m
[31m-    }else{[m
[31m-        message.error(res.data.message);[m
[31m-    }[m
[31m-  })[m
[31m-}[m
 export function getgroups() {[m
     return [{[m
         title: '组名',[m
         dataIndex: 'fields.name',[m
[32m+[m[32m    }, {[m
[32m+[m[32m        title: '类型',[m
[32m+[m[32m        dataIndex: 'fields.type',[m
     }, {[m
         title: '创建时间',[m
         dataIndex: 'fields.create_time',[m
[31m-        render: (data) => formatStrDate(data)[m
     }, {[m
         title: '更新时间',[m
         dataIndex: 'fields.update_time',[m
[31m-        render: (data) => formatStrDate(data)[m
     },{[m
         title: '操作',[m
         render: (data, record, index) => ([m
             <div>[m
[31m-              <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}} onClick={()=> {groupdetail(record.pk, this)}}>详情</span>[m
[31m-              <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}} onClick={() => this.showGroupUpdateModel(record)}>编辑</span>[m
[31m-              <Popconfirm title={"Are you sure delete " + record.fields.name + "group?"} onConfirm={() => confirm(record.pk, this)} okText="Yes" cancelText="No">[m
[31m-               <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}}>删除</span>[m
[31m-              </Popconfirm>[m
[31m-              <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}} onClick={() => this.showGroupMemberUpdateModel(record)}>编辑成员</span>[m
[32m+[m[32m                <Row>[m
[32m+[m[32m                    <Col span={5} style={{color:'#0350CF'}}><DaasSlowQueryGroupDetailModel pk={ data.pk } /></Col>[m
[32m+[m[32m                    <Col span={5} style={{color:'#0350CF'}}><DaasSlowQueryGroupEditModel pk={data.pk} /></Col>[m
[32m+[m[32m                    <Col span={5} style={{color:'#0350CF'}}><DaasSlowQueryGroupDeleteModel pk={data.pk} /></Col>[m
[32m+[m[32m                    <Col span={5} style={{color:'#0350CF'}}>编辑成员</Col>[m
[32m+[m[32m                </Row>[m
             </div>[m
         )[m
     }];[m
[1mdiff --git a/src/components/daas/slowquery/email.jsx b/src/components/daas/slowquery/email.jsx[m
[1mindex 3084dda..8688254 100644[m
[1m--- a/src/components/daas/slowquery/email.jsx[m
[1m+++ b/src/components/daas/slowquery/email.jsx[m
[36m@@ -52,7 +52,7 @@[m [mclass SlowQueryEmailManager extends Component {[m
             <Daassider/>[m
         </Sider>[m
         <Content style={{ padding: 0, margin:10, marginBottom: 0, minHeight: window.innerHeight-84 }}>[m
[31m-            <BreadcrumbCustom first="首页" second="慢日志查询用户列表" />[m
[32m+[m[32m            <BreadcrumbCustom first="首页" second="慢日志查询邮件列表" />[m
             <div className="form-search-box" style={{ background:'#fff',padding:10, }}>[m
                 <Form layout="inline">[m
                     <FormItem>[m
[1mdiff --git a/src/components/daas/slowquery/group.jsx b/src/components/daas/slowquery/group.jsx[m
[1mindex d2cc8b0..c156245 100644[m
[1m--- a/src/components/daas/slowquery/group.jsx[m
[1m+++ b/src/components/daas/slowquery/group.jsx[m
[36m@@ -1,240 +1,49 @@[m
 import React, { Component } from 'react';[m
[31m-import qs from 'qs'[m
[31m-import { message, Layout, Form, Input, Button, Select, Table } from 'antd';[m
[31m-import { connect } from 'react-redux';[m
[31m-import axios from 'axios';[m
[31m-[m
 import Daassider from '../../../components/common/LeftSider/daassider';[m
[31m-import { getGroupsList } from '../../../containers/Daas/groups.redux'[m
[31m-import { getGroupMembersList } from '../../../containers/Daas/groupmembers.redux'[m
[31m-[m
[31m-import { GroupCreateForm } from './groupforms/groupcreateform'[m
[31m-import {GroupUpdateForm} from './groupforms/groupupdateform'[m
[31m-import {GroupMemberUpdateForm} from './groupforms/groupmemberupdateform'[m
[31m-[m
[31m-import { postAjax } from '../../../utils/axios'[m
[32m+[m[32mimport { Layout, Form, Input, Button, Select, Table } from 'antd';[m
[32m+[m[32mimport { connect } from 'react-redux';[m
 import BreadcrumbCustom from '../../BreadcrumbCustom';[m
 import { getgroups } from './TableTpl/group';[m
[31m-import './list.less';[m
[31m-[m
[31m-const baseUrl = 'http://127.0.0.1:8000';[m
[31m-var instance = axios.create({[m
[31m-    baseURL: baseUrl,//测试环境[m
[31m-    timeout: 2000,[m
[31m-});[m
[31m-instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'[m
[32m+[m[32mimport DaasSlowQueryGroupCreateModel from './group/groupcreatemodel';[m
[32m+[m[32mimport PropTypes from 'prop-types';[m
[32m+[m[32mimport { slowQueryGroupFetch } from '../../../containers/Daas/actions/slow_query_group';[m
 [m
 const { Sider, Content } = Layout;[m
 const FormItem = Form.Item;[m
 const Option = Select.Option;[m
 [m
[31m-class DaasGroupManageForm extends Component {[m
[32m+[m[32mclass SlowQueryGroupManager extends Component {[m
[32m+[m[41m    [m
     constructor(props) {[m
         super(props);[m
         this.columns = getgroups.call(this);[m
[31m-    }[m
[31m-    state = {[m
[31m-        currentPage: 1,[m
[31m-        pageSize: 10,[m
[31m-        updateRecord:{fields:{}},[m
[31m-        GroupCreateVisible: false,[m
[31m-        GroupCreateConfirmLoading: false,[m
[31m-        GroupUpdateVisible: false,[m
[31m-        GroupUpdateConfirmLoading: false,[m
[31m-    }[m
[31m-    componentDidMount () {[m
[31m-        this.props.getGroupsList({});[m
[31m-    }[m
[31m-    //重置表单[m
[31m-    handleReset = () => {[m
[31m-        this.props.form.resetFields();[m
[31m-    }[m
[31m-[m
[31m-    showGroupCreateModel = () => {[m
[31m-        this.setState({GroupCreateVisible: true}) [m
[31m-    }[m
[31m-    [m
[31m-    showGroupUpdateModel = (record) => {[m
[31m-        this.setState({updateRecord: record})[m
[31m-        this.setState({GroupUpdateVisible: true}) [m
[31m-[m
[31m-    }[m
[31m-    showGroupMemberUpdateModel = (record) => {[m
[31m-        this.setState({updateRecord: record})[m
[31m-        this.setState({GroupMemberUpdateVisible: true}) [m
[31m-        this.GroupMemberUpdateFormRef.getUsers(record.pk)[m
[31m-        console.log(record.pk)[m
[31m-    }[m
[31m-[m
[31m-    handleGroupCreateCancel = () => {[m
[31m-        this.setState({GroupCreateVisible: false}) [m
[31m-        this.setState({GroupCreateConfirmLoading: false})[m
[31m-        const form = this.GroupCreateFormRef.props.form;[m
[31m-        form.resetFields();[m
[31m-    }[m
[31m-[m
[31m-    handleGroupUpdateCancel = () => {[m
[31m-        this.setState({GroupUpdateVisible: false}) [m
[31m-        this.setState({GroupUpdateConfirmLoading: false})[m
[31m-        const form = this.GroupUpdateFormRef.props.form;[m
[31m-        form.resetFields();[m
[31m-    }[m
[31m-[m
[31m-    handleGroupMemberUpdateCancel = () => {[m
[31m-        this.setState({GroupMemberUpdateVisible: false}) [m
[31m-        this.setState({GroupMemberUpdateConfirmLoading: false})[m
[31m-        const form = this.GroupMemberUpdateFormRef.props.form;[m
[31m-        form.resetFields();[m
[31m-    }[m
[31m-[m
[31m-    handleGroupListWithArgs = (page, pageSize) => {[m
[31m-       let value = this.props.form.getFieldsValue()[m
[31m-       this.setState({[m
[31m-           currentPage: page,[m
[31m-           pageSize: pageSize [m
[31m-       })[m
[31m-       let page_args = {page: page, pagesize: pageSize}[m
[31m-       page_args.name = value.name !== undefined ? value.name : "";[m
[31m-       this.props.getGroupsList(page_args);[m
[31m-    }[m
[31m-[m
[31m-    handleGroupCreate = () => {[m
[31m-      const form = this.GroupCreateFormRef.props.form;[m
[31m-      form.validateFields((err, values) => {[m
[31m-        if (err) {[m
[31m-          return;[m
[31m-        }[m
[31m-        this.setState({GroupCreateConfirmLoading: true})[m
[31m-        const _that = this;[m
[31m-        console.log(values);[m
[31m-        instance.post('/v1/api/slow/query/groups', qs.stringify(values))[m
[31m-          .then(function(res){[m
[31m-            if(res.data.code == 0){[m
[31m-                message.success("创建成功") [m
[31m-                _that.setState({GroupCreateConfirmLoading: false})[m
[31m-                form.resetFields();[m
[31m-                _that.setState({ GroupCreateVisible: false });[m
[31m-                _that.handleGroupListWithArgs(1, 10);[m
[31m-            }else{[m
[31m-                message.error(res.data.message) [m
[31m-                _that.setState({GroupCreateConfirmLoading: false})[m
[31m-            }[m
[31m-        })[m
[31m-      });[m
[31m-    }[m
[31m-[m
[31m-    handleGroupUpdate = (group_obj) => {[m
[31m-      const form = this.GroupUpdateFormRef.props.form;[m
[31m-      form.validateFields((err, values) => {[m
[31m-        if (err) {[m
[31m-          return;[m
[31m-        }[m
[31m-        this.setState({GroupUpdateConfirmLoading: true})[m
[31m-        const _that = this;[m
[31m-        console.log(values);[m
[31m-        // values.pk = group_id[m
[31m-        instance.put('/v1/api/slow/query/groups/' +  group_obj.pk, qs.stringify(values))[m
[31m-          .then(function(res){[m
[31m-            if(res.data.code == 0){[m
[31m-                console.log(values)[m
[31m-                message.success("更新成功") [m
[31m-                _that.setState({GroupUpdateConfirmLoading: false})[m
[31m-                form.resetFields();[m
[31m-                _that.setState({ GroupUpdateVisible: false });[m
[31m-                _that.setState({ GroupCreateVisible: false });[m
[31m-                _that.handleGroupListWithArgs(1, 10);[m
[31m-            }else{[m
[31m-                message.error(res.data.message) [m
[31m-                _that.setState({GroupUpdateConfirmLoading: false})[m
[31m-            }[m
[31m-        })[m
[31m-      });[m
[31m-    }[m
[31m-[m
[31m-    handleGroupMemberUpdate = (group_obj) => {[m
[31m-      console.log(group_obj)[m
[31m-      const form = this.GroupMemberUpdateFormRef.props.form;[m
[31m-      form.validateFields((err, values) => {[m
[31m-        if (err) {[m
[31m-          return;[m
[32m+[m[32m        this.state = {[m
[32m+[m[32m            deviceList: [],[m
[32m+[m[32m            currentPage: 1,[m
[32m+[m[32m            pageSize: 10,[m
[32m+[m[32m            total: 0[m
         }[m
[31m-        this.setState({GroupMemberUpdateConfirmLoading: true})[m
[31m-        const _that = this;[m
[31m-        console.log(values);[m
[31m-        instance.put('/v1/api/slow/query/group/user/relationships/' +  group_obj.pk, qs.stringify(values))[m
[31m-          .then(function(res){[m
[31m-            if(res.data.code == 0){[m
[31m-                console.log(values)[m
[31m-                message.success("更新成功") [m
[31m-                _that.setState({GroupMemberUpdateConfirmLoading: false})[m
[31m-                form.resetFields();[m
[31m-                _that.setState({ GroupMemberUpdateVisible: false });[m
[31m-                _that.handleGroupListWithArgs(1, 10);[m
[31m-            }else{[m
[31m-                message.error(res.data.message) [m
[31m-                _that.setState({GroupMemberUpdateConfirmLoading: false})[m
[31m-            }[m
[31m-        })[m
[31m-      });[m
     }[m
[32m+[m[41m    [m
 [m
[31m-[m
[31m-    saveGroupCreateFormRef = (formRef) => {[m
[31m-      this.GroupCreateFormRef = formRef;[m
[32m+[m[32m    componentDidMount () {[m
[32m+[m[32m        this.props.slowQueryGroupFetch();[m
     }[m
 [m
[31m-    saveGroupUpdateFormRef = (formRef) => {[m
[31m-      this.GroupUpdateFormRef = formRef;[m
[31m-    } [m
[31m-[m
[31m-    saveGroupMemberUpdateFormRef = (formRef) => {[m
[31m-      this.GroupMemberUpdateFormRef = formRef;[m
[32m+[m[32m    handleReset = () => {[m
[32m+[m[32m        this.props.form.resetFields();[m
[32m+[m[32m        this.props.slowQueryGroupFetch();[m
     }[m
 [m
[31m-    handleGroupsQuery = () => {[m
[31m-        let value = this.props.form.getFieldsValue()[m
[31m-        this.setState({[m
[31m-            currentPage: 1,[m
[31m-            pageSize: 10 [m
[31m-        })[m
[31m-        let page_args = {page: 1, pagesize: 10}[m
[31m-        page_args.name = value.name !== undefined  ? value.name : "";[m
[31m-        this.props.getGroupsList(page_args);[m
[32m+[m[32m    handleSubmit = (value) => {[m
[32m+[m[32m        // this.props.history.push({pathname:'/slowquery/add-user', data:value});[m
[32m+[m[32m        // console.log(this.props.form.getFieldsValue());[m
[32m+[m[32m        // this.props.slowQueryInstatncesFetch(this.props.form.getFieldsValue());[m
[32m+[m[32m        console.log(this.props);[m
     }[m
 [m
   render() {[m
     const { getFieldDecorator } = this.props.form;[m
[31m-    let _that = this;[m
[31m-    const pagination = {[m
[31m-          current: this.state.currentPage,[m
[31m-          total: this.props.total,[m
[31m-          pageSize: this.state.pageSize,[m
[31m-          showSizeChanger: true,[m
[31m-          showTotal:(total, range) => `${range[0]}-${range[1]} of ${total} items`,[m
[31m-          showQuickJumper: true,[m
[31m-          //当表格有变化时，如：点击分页  current是当前页面页码[m
[31m-          onChange(page, pageSize) {[m
[31m-              let value = _that.props.form.getFieldsValue()[m
[31m-              _that.setState({[m
[31m-                  currentPage: page,[m
[31m-                  pageSize: pageSize[m
[31m-              })[m
[31m-              let page_args = {page, page_size: pageSize}[m
[31m-              page_args.name = value.name !== undefined  ? value.name : "";[m
[31m-              _that.props.getGroupsList({page_args});[m
[31m-          },[m
[31m-[m
[31m-          onShowSizeChange(current, size) {[m
[31m-              let value = _that.props.form.getFieldsValue()[m
[31m-              _that.setState({[m
[31m-                  currentPage: 1,[m
[31m-                  pageSize: size [m
[31m-              })[m
[31m-              let page_args = {page: 1, page_size: size}[m
[31m-              page_args.name = value.name !== undefined  ? value.name : "";[m
[31m-              _that.props.getGroupsList({page_args});[m
[31m-          }[m
[31m-    };[m
 [m
     return ([m
       <Layout className="config">[m
[36m@@ -242,53 +51,28 @@[m [mclass DaasGroupManageForm extends Component {[m
             <Daassider/>[m
         </Sider>[m
         <Content style={{ padding: 0, margin:10, marginBottom: 0, minHeight: window.innerHeight-84 }}>[m
[31m-            <BreadcrumbCustom first="关系型数据库" second="慢日志查询组列表" />[m
[32m+[m[32m            <BreadcrumbCustom first="首页" second="慢日志查询组列表" />[m
             <div className="form-search-box" style={{ background:'#fff',padding:10, }}>[m
[31m-                <Form layout="inline" onSubmit={this.handleSubmit}>[m
[32m+[m[32m                <Form layout="inline">[m
                     <FormItem>[m
[31m-                        <Button type="primary" onClick={this.showGroupCreateModel}>创建邮件组</Button>[m
[31m-                        {/*<Button type="primary" onClick={(e) => this.openAddDevicePage('add',e)}>创建邮件组</Button>*/}[m
[31m-                		<GroupCreateForm[m
[31m-        				  wrappedComponentRef={this.saveGroupCreateFormRef}[m
[31m-        				  visible={this.state.GroupCreateVisible}[m
[31m-                          confirmLoading={this.state.GroupCreateConfirmLoading}[m
[31m-        				  onCancel={this.handleGroupCreateCancel}[m
[31m-        				  onCreate={this.handleGroupCreate}[m
[31m-        				/>[m
[31m-                        <GroupUpdateForm[m
[31m-                          wrappedComponentRef={this.saveGroupUpdateFormRef}[m
[31m-                          visible={this.state.GroupUpdateVisible}[m
[31m-                          groupinfo={this.state.updateRecord}[m
[31m-                          confirmLoading={this.state.GroupUpdateConfirmLoading}[m
[31m-                          onCancel={this.handleGroupUpdateCancel}[m
[31m-                          onCreate={() => this.handleGroupUpdate(this.state.updateRecord)}[m
[31m-                        />       [m
[31m-                        <GroupMemberUpdateForm[m
[31m-                          wrappedComponentRef={this.saveGroupMemberUpdateFormRef}[m
[31m-                          visible={this.state.GroupMemberUpdateVisible}[m
[31m-                          groupinfo={this.state.updateRecord}[m
[31m-                          confirmLoading={this.state.GroupMemberUpdateConfirmLoading}[m
[31m-                          onCancel={this.handleGroupMemberUpdateCancel}[m
[31m-                          onCreate={() => this.handleGroupMemberUpdate(this.state.updateRecord)}[m
[31m-                        />[m
[32m+[m[32m                        <DaasSlowQueryGroupCreateModel />[m
                     </FormItem>[m
                     <div style={{ float:'right'}}>[m
[31m-[m
                         <FormItem label="">[m
                             {getFieldDecorator('name')([m
[31m-                                <Input placeholder="组名" />[m
[32m+[m[32m                                <Input placeholder="用户名" />[m
                             )}[m
                         </FormItem>[m
[31m-                    <FormItem>[m
[31m-                        <Button type="primary" className="btn-search" style={{marginRight: 10}} onClick={this.handleGroupsQuery}>查询</Button>[m
[31m-                        <Button className="btn-search" onClick={this.handleReset}>重置</Button>[m
[31m-                    </FormItem>[m
[32m+[m[32m                        <FormItem>[m
[32m+[m[32m                            <Button type="primary" className="btn-search" onClick={this.handleSubmit} style={{marginRight: 10}}>查询</Button>[m
[32m+[m[32m                            <Button className="btn-search" onClick={ this.handleReset }>重置</Button>[m
[32m+[m[32m                        </FormItem>[m
                     </div>[m
                 </Form>[m
             </div>[m
 [m
             <div style={{ background:'#fff' }}>[m
[31m-                <Table bordered loading={this.props.loading} rowKey={record => record.pk} columns={this.columns} dataSource={this.props.groupsList} pagination={pagination} />[m
[32m+[m[32m                <Table bordered rowKey={record => record.pk} columns={this.columns} dataSource={this.props.groupsList.data} />[m
             </div>[m
             <div style={{margin: 20}}>[m
                 <span className='num'>共找到 { this.props.total }条结果， 每页显示10条</span>[m
[36m@@ -299,7 +83,5 @@[m [mclass DaasGroupManageForm extends Component {[m
   }[m
 }[m
 [m
[31m-const DaasGroupManage = Form.create()(DaasGroupManageForm);[m
[31m-export default connect([m
[31m-  state => state.daasGroups,[m
[31m-  { getGroupsList })(DaasGroupManage);[m
[32m+[m[32mconst DassSlowQueryGroup = Form.create()(SlowQueryGroupManager);[m
[32m+[m[32mexport default connect(state=>state.daasSlowQueryGroup,{ slowQueryGroupFetch })(DassSlowQueryGroup);[m
[1mdiff --git a/src/components/daas/slowquery/instance.jsx b/src/components/daas/slowquery/instance.jsx[m
[1mindex 05eb60f..d24dd51 100644[m
[1m--- a/src/components/daas/slowquery/instance.jsx[m
[1m+++ b/src/components/daas/slowquery/instance.jsx[m
[36m@@ -51,7 +51,7 @@[m [mclass SlowQueryInstatnceManager extends Component {[m
             <Daassider/>[m
         </Sider>[m
         <Content style={{ padding: 0, margin:10, marginBottom: 0, minHeight: window.innerHeight-84 }}>[m
[31m-            <BreadcrumbCustom first="首页" second="慢日志查询用户列表" />[m
[32m+[m[32m            <BreadcrumbCustom first="首页" second="慢日志查询实例列表" />[m
             <div className="form-search-box" style={{ background:'#fff',padding:10, }}>[m
                 <Form layout="inline">[m
                     <FormItem>[m
[1mdiff --git a/src/containers/Daas/constants/index.js b/src/containers/Daas/constants/index.js[m
[1mindex 69f04cf..ae64ea6 100644[m
[1m--- a/src/containers/Daas/constants/index.js[m
[1m+++ b/src/containers/Daas/constants/index.js[m
[36m@@ -26,4 +26,8 @@[m [mexport const SLOWQUERYINSTANCEUPDATE = "SLOWQUERYINSTANCEUPDATE"; //实例更新[m
 export const SLOWQUERYINSTANCEDELETE = "SLOWQUERYINSTANCEDELETE"; //实例删除[m
 [m
 //慢查询邮件发送操作[m
[31m-export const SLOWQEURYEMAILFETCH = "SLOWQEURYEMAILFETCH"; //邮件获取[m
\ No newline at end of file[m
[32m+[m[32mexport const SLOWQEURYEMAILFETCH = "SLOWQEURYEMAILFETCH"; //邮件获取[m
[32m+[m
[32m+[m[32m//慢查询用户组操作[m
[32m+[m[32mexport const SLOWQUERYGROUPFETCH = "SLOWQUERYGROUPFETCH"; //组获取[m
[32m+[m[32mexport const SLOWQUERYGROUPCREATE = "SLOWQUERYGROUPCREATE"; //组创建[m
\ No newline at end of file[m
[1mdiff --git a/src/redux/reducers.js b/src/redux/reducers.js[m
[1mindex caa98f7..2648cf3 100644[m
[1m--- a/src/redux/reducers.js[m
[1m+++ b/src/redux/reducers.js[m
[36m@@ -53,7 +53,9 @@[m [mimport {[m
 import {[m
     daasSlowQueryEmail[m
 } from '../containers/Daas/reducers/slow_query_email';[m
[31m-[m
[32m+[m[32mimport {[m
[32m+[m[32m    daasSlowQueryGroup[m
[32m+[m[32m} from '../containers/Daas/reducers/slow_query_group';[m
 const App = combineReducers({[m
     todos,[m
     setCounter,[m
[36m@@ -73,6 +75,7 @@[m [mconst App = combineReducers({[m
     daasSlowQueryUser,[m
     daasSlowQueryInstance,[m
     daasSlowQueryEmail,[m
[32m+[m[32m    daasSlowQueryGroup,[m
 });[m
 [m
 export default App[m
\ No newline at end of file[m
[1mdiff --git a/src/router/daas.js b/src/router/daas.js[m
[1mindex ea4ed39..a5de967 100644[m
[1m--- a/src/router/daas.js[m
[1m+++ b/src/router/daas.js[m
[36m@@ -16,6 +16,7 @@[m [mimport Daas_Machine from '../components/daas/sql/machine';[m
 import Daas_SlowQuery_User from '../components/daas/slowquery/user';[m
 import Daas_SlowQuery_Instance from '../components/daas/slowquery/instance';[m
 import Daas_SlowQuery_Email from '../components/daas/slowquery/email';[m
[32m+[m[32mimport Daas_SlowQuery_Group from '../components/daas/slowquery/group';[m
 [m
 const daas_routes =[m
     [{[m
[36m@@ -70,5 +71,9 @@[m [mconst daas_routes =[m
         exact: true,[m
         path: '/daas/slowquery/email',[m
         component: Daas_SlowQuery_Email,[m
[32m+[m[32m    }, {[m
[32m+[m[32m        exact: true,[m
[32m+[m[32m        path: '/daas/slowquery/group',[m
[32m+[m[32m        component: Daas_SlowQuery_Group,[m
     }][m
 export default daas_routes;[m
\ No newline at end of file[m
