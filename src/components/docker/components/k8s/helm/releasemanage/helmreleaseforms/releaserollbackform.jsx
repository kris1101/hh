import React from 'react'
import {Switch, message, Form, Drawer, Row, Col, Select, Button, Icon } from 'antd';
import { connect  } from 'react-redux';
import './releaseform.less'
import { getHelmReleaseVersionList } from '../../../../../../../containers/Paas/k8s/k8shelmrelease.redux'

const FormItem = Form.Item;

const HelmReleaseRollBackForm = Form.create()(
  class extends React.Component {
    state = { 
      releaseversion:"",
      releasename:"",
    }   

    render() {
      const { confirmLoading, visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      const Option = Select.Option;

      return (
                <div>
                <Drawer
                  title="回滚release"
                  width="800px"
                  placement="right"
                  onClose={onCancel}
                  maskClosable={false}
                  visible={visible}
                  destroyOnClose={true}
                  style={{
                    height: 'calc(100%- 55px)',
                    overflow: 'auto',
                    paddingBottom: 53,
                  }}
                >
                  <Form  layout="horizontal" hideRequiredMark id="deployform">
                        <Form.Item className="formitem" label="release名称" labelCol={{ span: 4}} wrapperCol={{span: 20}}>
                              <span style={{fontSize: 15}}>{this.state.releasename}</span>
                        </Form.Item>
                        <Form.Item className="formitem" label="当前版本" labelCol={{ span: 4}} wrapperCol={{span: 20}}>
                              <span style={{fontSize: 15}}>{this.state.releaseversion}</span>
                        </Form.Item>
                        <Form.Item className="formitem" label="force" labelCol={{ span: 4}} disabled={confirmLoading} wrapperCol={{span: 20}}>
							{getFieldDecorator('force',{initialValue: false})(
                                   <Switch />
                             )}
                        </Form.Item>
                        <Form.Item className="formitem" label="dry_run" labelCol={{ span: 4}} disabled={confirmLoading} wrapperCol={{span: 20}}>
							{getFieldDecorator('dry_run',{initialValue: false})(
                                   <Switch />
                             )}
                        </Form.Item>
                        <Form.Item className="formitem" label="disable_hooks" labelCol={{ span: 4}} disabled={confirmLoading} wrapperCol={{span: 20}}>
							{getFieldDecorator('disable_hooks',{initialValue: false})(
                                   <Switch />
                             )}
                        </Form.Item>
                        <Form.Item className="formitem" label="recreate" labelCol={{ span: 4}} disabled={confirmLoading} wrapperCol={{span: 20}}>
							{getFieldDecorator('recreate',{initialValue: false})(
                                   <Switch />
                             )}
                        </Form.Item>
                        <Form.Item className="formitem" label="历史版本" labelCol={{ span: 4}} disabled={confirmLoading} wrapperCol={{span: 20}}>
							{getFieldDecorator('version',{rules: [{required: true, message:"该项不能为空"}]})(
                                     <Select 
                                        style={{ width: "100%" }} 
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        getPopupContainer={() => document.getElementById("deployform")}
                                        showSearch
                                      >
										{this.props.helmReleaseVersionList.map(function(value){return (<Option key={value} value={value}>{value}</Option>)})}
                                    </Select>
                             )}
                        </Form.Item>
                  </Form>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      width: '100%',
                      borderTop: '1px solid #e8e8e8',
                      padding: '10px 16px',
                      textAlign: 'right',
                      left: 0,
                      background: '#fff',
                      borderRadius: '0 0 4px 4px',
                    }}
                  >
                    <Button
                      style={{
                        marginRight: 8,
                      }}
                      onClick={onCancel}
                    >
                      取消
                    </Button>
                    <Button onClick={onCreate} loading={confirmLoading} type="primary">提交</Button>
                  </div>
                </Drawer>
              </div>
            );
    }
  }
);

export default  connect(
  state => state.helmRelease,
  {getHelmReleaseVersionList}
)(HelmReleaseRollBackForm)
