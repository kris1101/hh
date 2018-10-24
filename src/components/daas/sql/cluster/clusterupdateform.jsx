/*
#=========================================================
# 作者：韩望、秦海荣
# 时间：2018-10-15
# 功能：cluster 编辑项目组件
# 版本: v 0.0.0.1.base
# 公司：中化能源互联科技组
# 更新：无
# 备注：无
#=========================================================
*/

import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon } from 'antd';
import { connect } from 'react-redux';
import { getAjax } from '../../../../utils/daas/newaxios';

const FormItem = Form.Item;
const { TextArea } = Input;


class DaasRdbClusterUpdateFormManager extends Component {
  constructor(props){
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      projectsOption: [],
      high_avail: 0,
    };
  }
  
  componentDidMount(){
    const _that=this;
    const clusterId=_that.props.clusterId;
    const base_url='/v1/api/rdb/clusters/' + clusterId;
    getAjax(base_url, {}, function(response){
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
        <Form onSubmit={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              label={(
                <span>
                  名称&nbsp;
                  <Tooltip title="集群名称?">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              )}
            >
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入集群名称!', whitespace: true }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={(
                <span>
                  端口&nbsp;
                  <Tooltip title="集群端口?">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              )}
            >
              {getFieldDecorator('port', {
                rules: [{ required: true, message: '请输入集群端口!', whitespace: true }],
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

const DaasRdbClusterUpdateForm = Form.create()(DaasRdbClusterUpdateFormManager);
export default connect(state=>state.daasRdbCluster,{})(DaasRdbClusterUpdateForm);