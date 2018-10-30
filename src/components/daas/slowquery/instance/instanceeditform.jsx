/*
#=========================================================
# 作者：韩望、秦海荣
# 时间：2018-09-17
# 功能：reducer instance 编辑表单组件
# 版本: v 0.0.0.1.base
# 公司：中化能源互联科技组
# 更新：无
# 备注：无
#=========================================================
*/

import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon } from 'antd';
import { connect } from 'react-redux';
import { getAjax } from '../../../../utils/daas/axios';

const FormItem = Form.Item;
const { TextArea } = Input;
const ipPatten = /^((25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(25[0-5]|2[0-4]\d|1?\d?\d)$/

class SlowQueryInstanceEditManager extends Component {
  constructor(props){
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      instanceObj:[]
    };
  }
  
  componentDidMount(){
    const _that=this;
    const instanceId=_that.props.instanceId;
    getAjax('/slow/query/instances/' + instanceId, {}, function(response){
      _that.setState({
        instanceObj: response.data.data[0],
      });
      // _that.props.form.setFieldsValue(response.data.data[0].fields);
      let resDat=response.data.data[0].fields
      delete resDat.create_time;
      delete resDat.update_time;
      _that.props.form.setFieldsValue(resDat);
    });
  }

    checkip = (rule, value, callback) => {
      if(!value.length){
          callback("IP不能为空")
      }
      if(!ipPatten.test(value)){
          callback("请用正确的IP地址格式填写")
      }
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
              <Tooltip title="实例名称?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入实例名称!', whitespace: true }],
            initialValue: this.state.instanceObj.fields ? this.state.instanceObj.fields.name : '',
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="实例ip"
        >
          {getFieldDecorator('host_ip', {
            rules: [{
            type: 'string', },
            { required: true, validator: this.checkip }],
            initialValue: this.state.instanceObj.fields ? this.state.instanceObj.fields.host_ip : '',
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="端口号"
        >
          {getFieldDecorator('port', {
            rules: [{ required: true, message: '请输入实例端口号!' }],
            initialValue: this.state.instanceObj.fields ? this.state.instanceObj.fields.port : '',
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
            },{
              initialValue: '3306',
            }],
          })(
            <TextArea rows={4} />
          )}
        </FormItem>
      </Form>
    );
  }
}

const DaasSlowQueryInstanceEditForm = Form.create()(SlowQueryInstanceEditManager);
export default connect()(DaasSlowQueryInstanceEditForm);
