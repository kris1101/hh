/*
#=========================================================
# 作者：韩望、秦海荣
# 时间：2018-10-15
# 功能：instance 编辑项目组件
# 版本: v 0.0.0.1.base
# 公司：中化能源互联科技组
# 更新：无
# 备注：无
#=========================================================
*/

import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Select } from 'antd';
import { connect } from 'react-redux';
import { getAjax } from '../../../../utils/daas/newaxios';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;


class DaasRdbInstanceUpdateFormManager extends Component {
  constructor(props){
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      projectsOption: [],
      hostsOption: [],
      high_avail: 0,
    };
  }
  
  componentDidMount(){
    const _that=this;
    const instanceId=_that.props.instanceId;
    const base_project_url='/v1/api/rdb/projects';
    const base_instance_url='/v1/api/rdb/instances';
    const base_host_url='/v1/api/rdb/hosts';
    getAjax(base_project_url,{},function(response){
        if (response.data.data.length) {
            const projectOptions = response.data.data.map((item,index)=>{
                return <Option key={index} value={item.pk}>{item.fields.name}</Option>
            });
            _that.setState({
                projectsOption: projectOptions,
            });
        }
        getAjax(base_host_url,{},function(response){
          const hostsOption = response.data.data.map((item,index)=>{
            return <Option key={index} value={item.fields.host_ip}>{item.fields.name}</Option>
          });
          _that.setState({
            hostsOption: hostsOption,
          });
          getAjax(base_instance_url + '/' + instanceId, {}, function(response){
            let resDat=response.data.data[0].fields;
            delete resDat.create_time;
            delete resDat.update_time;
            delete resDat.run_status;
            resDat.high_avail=Number(resDat.high_avail).toString();
            delete resDat.high_avail;
            _that.props.form.setFieldsValue(resDat);
          });
        });
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              名称&nbsp;
              <Tooltip title="实例名称">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入实例名称!', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              IP&nbsp;
            </span>
          )}
        >
          {getFieldDecorator('host', {
            rules: [{ required: true, message: '请输入实例IP!', whitespace: true }],
            initialValue: '0',
          },)(
            <Select>
                <Option value='0'>请选择一台主机</Option>
                { this.state.hostsOption }
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              CPU&nbsp;
              <Tooltip title="CPU是以个数为单位，必须整数">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('cpu', {
            rules: [{
                    type: 'string', message: '输入CPU个数必须为整数!',
                }, {
                    required: true, message: '请输入CPU个数!', whitespace: false 
                }],
          })(
            <Input disabled />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              内存&nbsp;
              <Tooltip title="内存是以M为单位，必须整数">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('memory', {
            rules: [{
                    type: 'string', message: '输入内存个数必须为整数，单位M!',
                }, {
                    required: true, message: '请输入内存容量!', whitespace: false 
                }],
          })(
            <Input disabled />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              硬盘&nbsp;
              <Tooltip title="硬盘是以G为单位，必须整数">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('capacity', {
            rules: [{
                    type: 'string', message: '输入硬盘容量必须为整数，单位G!',
                }, {
                    required: true, message: '请输入硬盘容量,单位G!', whitespace: false 
                }],
          })(
            <Input disabled />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              端口&nbsp;
              <Tooltip title="端口必须整数">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('port', {
            rules: [{
                    type: 'string', message: '输入端口!',
                }, {
                    required: true, message: '请输入端口!', whitespace: false 
                }],
          })(
            <Input disabled />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="项目"
        >
          {getFieldDecorator('project_name', {
            initialValue: '0',
          })(
            <Select>
                <Option value='0'>请选择一个项目</Option>
                { this.state.projectsOption }
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="高可用"
        >
          {getFieldDecorator('high_avail', {
            initialValue: '0',
          })(
            <Select>
              <Option value='0' >是</Option>
              <Option value='1' >否</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              版本&nbsp;
            </span>
          )}
        >
          {getFieldDecorator('db_version', {
            rules: [{ required: true, message: '请输入数据库版本!', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="描述"
        >
          {getFieldDecorator('description', {
            rules: [{
              required: false, message: '请输入描述...',
            }],
          })(
            <TextArea rows={4} />
          )}
        </FormItem>
      </Form>
    );
  }
}

const DaasRdbInstanceUpdateForm = Form.create()(DaasRdbInstanceUpdateFormManager);
export default connect(state=>state.daasRdbProject,{})(DaasRdbInstanceUpdateForm);