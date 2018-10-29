/*
#=========================================================
# 作者：韩望、秦海荣
# 时间：2018-09-17
# 功能：reducer rdb instance 创建表单组件
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


class RdbInstanceCreateFormManager extends Component {
    constructor(props){
        super(props);
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
            projectsOption: [],
            hostsOption: [],
        };
    }

    componentDidMount (){
        const _that = this;
        const base_url='/v1/api/rdb/projects';
        getAjax(base_url,{},function(response){
            console.log(response);
            if (response.data.data.length) {
                const projectOptions = response.data.data.map((item,index)=>{
                    return <Option key={index} value={item.pk}>{item.fields.name}</Option>
                });
                _that.setState({
                    projectsOption: projectOptions,
                });
            }
        });
        getAjax('/v1/api/rdb/hosts',{},function(response){
            console.log(response);
            if (response.data.data.length) {
                const hostOptions = response.data.data.map((item,index)=>{
                    return <Option key={index} value={item.fields.host_ip}>{item.fields.name}</Option>
                });
                _that.setState({
                    hostsOption: hostOptions,
                });
            }
        });
    }

    handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
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
          label="IP"
        >
          {getFieldDecorator('host', {
            initialValue: '0',
          })(
            <Select>
                <Option value='0'>请选择一台机器执行:</Option>
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
            rules: [
                    {
                        type: 'string', message: '输入CPU个数必须为整数!',
                    },
                    {
                        required: true, message: '请输入CPU个数!', whitespace: false
                    },
                ],
            initialValue: '4',
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
            initialValue: '2048',
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
            initialValue: '100',
          })(
            <Input disabled />
          )}
        </FormItem>
        {/*<FormItem
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
            <Input min={1} />
          )}
        </FormItem>*/}
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
              <Option value="0">是</Option>
              <Option value="1">否</Option>
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
          label="运行状态"
        >
          {getFieldDecorator('run_status', {
            initialValue: '3',
          })(
            <Select>
              <Option value="0">waiting</Option>
              <Option value="1">initializing</Option>
              <Option value="2">starting</Option>
              <Option value="3">running</Option>
              <Option value="4">stopping</Option>
              <Option value="5">stopped</Option>
              <Option value="6">rebooting</Option>
              <Option value="7">paused</Option>
              <Option value="8">suspended</Option>
              <Option value="9">unknow</Option>
            </Select>
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

const RdbInstanceCreateForm = Form.create()(RdbInstanceCreateFormManager);
export default connect() (RdbInstanceCreateForm);
