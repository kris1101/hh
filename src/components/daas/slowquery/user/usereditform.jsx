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
import { Form, Input, Tooltip, Icon, Select, AutoComplete } from 'antd';
import { connect } from 'react-redux';
import { getAjax } from '../../../../utils/daas/axios';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const AutoCompleteOption = AutoComplete.Option;


class SlowQueryUserEditManager extends Component {
  constructor(props){
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      userObj:[]
    };
  }
  
  componentDidMount(){
    const _that=this;
    const userId=_that.props.userId;
    console.log(userId);
    getAjax('/slow/query/users' + '/' + userId, {}, function(response){
      _that.setState({
        userObj: response.data.data[0],
      });
      let resDat=response.data.data[0].fields;
      delete resDat.create_time;
      delete resDat.update_time;
      _that.props.form.setFieldsValue(resDat);
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

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
      </Select>
    );

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              名称&nbsp;
              <Tooltip title="登陆用户名?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入您的名称!', whitespace: true }],
            initialValue: this.state.userObj.fields ? this.state.userObj.fields.name : '',
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="邮箱"
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: '输入邮箱无效!',
            }, {
              required: true, message: '请输入您的邮箱!',
            }],
            initialValue: this.state.userObj.fields ? this.state.userObj.fields.email : '',
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="电话"
        >
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: '请输入您的联系电话!' }],
            initialValue: this.state.userObj.fields ? this.state.userObj.fields.phone : '',
          })(
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="描述"
        >
          {getFieldDecorator('description', {
            rules: [{
              required: false, message: '请输入描述...',
              initialValue: this.state.userObj.fields ? this.state.userObj.fields.description : '',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <TextArea rows={4} />
          )}
        </FormItem>
      </Form>
    );
  }
}

const DaasSlowQueryUserEditForm = Form.create()(SlowQueryUserEditManager);
export default connect(state=>state.daasSlowQueryUser)(DaasSlowQueryUserEditForm);