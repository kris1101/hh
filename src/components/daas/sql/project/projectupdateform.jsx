/*
#=========================================================
# 作者：韩望、秦海荣
# 时间：2018-10-11
# 功能：reducer project 编辑项目组件
# 版本: v 0.0.0.1.base
# 公司：中化能源互联科技组
# 更新：无
# 备注：无
#=========================================================
*/

import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Select,  } from 'antd';
import { connect } from 'react-redux';
import { getAjax } from '../../../../utils/daas/newaxios';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;


class DaasRdbProjectUpdateFormManager extends Component {
  constructor(props){
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      ProjectObj:[],
      projectParent: '0',
    };
  }
  
  componentDidMount(){
    const _that=this;
    const projectId=_that.props.projectId;
    getAjax('v1/api/rdb/projects/'+ projectId, {isdispach: true}, function(response){
      _that.setState({
        projectObj: response.data.data[0],
        projectParent: response.data.data[0].fields.parent,
      });
      let resDat=response.data.data[0].fields
      delete resDat.create_time;
      delete resDat.update_time;
      delete resDat.parent;
      _that.props.form.setFieldsValue(resDat);
    });
    console.log(_that);
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
    const projectsOption = this.props.projectsList.map((item,index)=>{
    	return <Option key={index} value={item.pk}>{item.fields.name}</Option>
    });
    return (
      <Form>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              名称&nbsp;
              <Tooltip title="项目名称?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入项目名称!', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="上级项目"
        >
          {getFieldDecorator('parent', {
            initialValue: this.state.projectParent,
          })(
            <Select>
              <Option value="0">顶层项目</Option>
              { projectsOption }
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
            },{
            }],
          })(
            <TextArea rows={4} />
          )}
        </FormItem>
      </Form>
    );
  }
}

const DaasRdbProjectUpdateForm = Form.create()(DaasRdbProjectUpdateFormManager);
export default connect(state=>state.daasRdbProject,{})(DaasRdbProjectUpdateForm);