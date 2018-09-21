/*
#=========================================================
# 作者：韩望、秦海荣
# 时间：2018-09-17
# 功能：reducer user 创建表单组件
# 版本: v 0.0.0.1.base
# 公司：中化能源互联科技组
# 更新：无
# 备注：无
#=========================================================
*/

import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import { connect } from 'react-redux';
import { createForm } from 'rc-form';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const AutoCompleteOption = AutoComplete.Option;


class SlowQueryInstanceCreateManager extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

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
    const { autoCompleteResult } = this.state;

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
              <Tooltip title="实例名称?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入数据库实例名称!', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="实例IP"
        >
          {getFieldDecorator('host_ip', {
            rules: [{
              type: 'string', message: '输入实例IP!',
            }, {
              required: true, message: '请输入实例IP地址!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="端口号"
        >
          {getFieldDecorator('port', {
            rules: [{
              type:'string', message: '输入实例端口必须为数字!',
            }, { 
              required: true, message: '请输入实例端口!',
            }],
          })(
            <Input style={{ width: '100%' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="描述"
        >
          {getFieldDecorator('description', {
            rules: [{
              required: false, message: '请输入描述...',
            }, {
            }],
          })(
            <TextArea rows={4} />
          )}
        </FormItem>
      </Form>
    );
  }
}

const DaasSlowQueryInstanceCreateForm = Form.create()(SlowQueryInstanceCreateManager);
export default DaasSlowQueryInstanceCreateForm;