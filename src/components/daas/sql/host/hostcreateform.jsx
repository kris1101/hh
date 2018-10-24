/*
#=========================================================
# 作者：韩望、秦海荣
# 时间：2018-10-16
# 功能：reducer rdb host 创建表单组件
# 版本: v 0.0.0.1.base
# 公司：中化能源互联科技组
# 更新：无
# 备注：无
#=========================================================
*/

import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Select } from 'antd';
import { connect } from 'react-redux';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;


class DaasRdbHostCreateFormManager extends Component {
  constructor(props){
    super(props);
    this.state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };
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
              <Tooltip title="主机名称?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入主机名称!', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              IP&nbsp;
              <Tooltip title="主机IP地址?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('host_ip', {
            rules: [{ required: true, message: '请输入主机IP地址!', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              cpu&nbsp;
              <Tooltip title="主机CPU个数,单位(个)?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('cpu', {
            rules: [{ required: true, message: '请输入主机CPU个数!', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              内存&nbsp;
              <Tooltip title="主机内存大小，整数，单位(M)?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('memory', {
            rules: [{ required: true, message: '请输入内存大小，单位(M)!', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              硬盘&nbsp;
              <Tooltip title="主机硬盘大小,单位(G)?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('capacity', {
            rules: [{ required: true, message: '请输入主机硬盘大小，单位(G)!', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              类型&nbsp;
              <Tooltip title="主机类型，实例还是备份机?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('host_type', {
            rules: [{ required: true, message: '请输入主机类型!', whitespace: true }],
          })(
            <Select>
                <Option value="0">实例机器</Option>
                <Option value="1">备份机器</Option>
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

const DaasRdbHostCreateForm = Form.create()(DaasRdbHostCreateFormManager);
export default connect(state=>state.daasRdbHost) (DaasRdbHostCreateForm);