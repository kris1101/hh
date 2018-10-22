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
import { Form, Input, Tooltip, Icon, Select } from 'antd';
import { connect } from 'react-redux';
import { getAjax } from '../../../../utils/daas/axios';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;


class SlowQueryGroupEditManager extends Component {
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
    const groupId=_that.props.groupId;
    getAjax('/slow/query/groups' + '/' + groupId, {}, function(response){
      _that.setState({
        groupObj: response.data.data[0],
      });
      let resDat=response.data.data[0].fields;
      delete resDat.create_time;
      delete resDat.update_time;
      _that.props.form.setFieldsValue(resDat);
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
      <Form>
         <FormItem
          {...formItemLayout}
          label={(
            <span>
              名称&nbsp;
              <Tooltip title="用户组的名称?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入组名!', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="类型"
        >
          {getFieldDecorator('type', {
            initialValue: '0',
          })(
            <Select>
              <Option value="0">DBA组</Option>
              <Option value="1">其它组</Option>
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

const DaasSlowQueryGroupEditForm = Form.create()(SlowQueryGroupEditManager);
export default connect(state=>state.daasSlowQueryGroup)(DaasSlowQueryGroupEditForm);