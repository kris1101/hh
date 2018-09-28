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
// import { getSlowQueryUserDetail } from '../../../../containers/Daas/actions/slow_qyery_user';
import { BASE_URL } from '../../../../containers/Daas/constants';
// import { slowQueryUsersUpdate, getSlowQueryUsersList } from '../../../../containers/Daas/actions/slow_qyery_user';
import axios from 'axios';
import { getAjax } from '../../../../utils/daas/axios';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const AutoCompleteOption = AutoComplete.Option;


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
    console.log(groupId);
    getAjax('/slow/query/groups' + '/' + groupId, {}, function(response){
      _that.setState({
        groupObj: response.data.data[0],
      });
      let resDat=response.data.data[0].fields;
      delete resDat.create_time;
      delete resDat.update_time;
      _that.props.form.setFieldsValue(resDat);
    });
    // axios.get(BASE_URL + '/v1/api/slow/query/users' + "/" + userId )
    //   .then(function (response) {
    //       console.log(response.data.data);
    //       _that.setState({
    //         userObj: response.data.data[0],
    //       });
    //   })
    //   .catch(function (error) {
    //       console.log(error);
    // });
  }

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   this.props.form.validateFieldsAndScroll((err, values) => {
  //     if (!err) {
  //       console.log('Received values of form: ', values);
  //     }
  //   });
  // }

  // handleConfirmBlur = (e) => {
  //   const value = e.target.value;
  //   this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  // }

  // compareToFirstPassword = (rule, value, callback) => {
  //   const form = this.props.form;
  //   if (value && value !== form.getFieldValue('password')) {
  //     callback('Two passwords that you enter is inconsistent!');
  //   } else {
  //     callback();
  //   }
  // }

  // validateToNextPassword = (rule, value, callback) => {
  //   const form = this.props.form;
  //   if (value && this.state.confirmDirty) {
  //     form.validateFields(['confirm'], { force: true });
  //   }
  //   callback();
  // }

  // handleWebsiteChange = (value) => {
  //   let autoCompleteResult;
  //   if (!value) {
  //     autoCompleteResult = [];
  //   } else {
  //     autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
  //   }
  //   this.setState({ autoCompleteResult });
  // }

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

    // const prefixSelector = getFieldDecorator('prefix', {
    //   initialValue: '86',
    // })(
    //   <Select style={{ width: 70 }}>
    //     <Option value="86">+86</Option>
    //   </Select>
    // );

    // const websiteOptions = autoCompleteResult.map(website => (
    //   <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    // ));

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