import React from 'react'
import {Switch, Form, Modal, Radio	 } from 'antd';
import './releaseform.less'

const FormItem = Form.Item;

const HelmReleaseDeleteForm = Form.create()(

  class extends React.Component {
    state = { 
        releasename:""
    }   

    render() {
      const { confirmLoading, visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
                  <Modal
                    title="删除release"
                    visible={visible}
                    onOk={onCreate}
                    onCancel={onCancel}
                    confirmLoading={confirmLoading}
                    destroyOnClose={true}
                    okText="确认"
                    cancelText="取消"
                  >
                      <Form  layout="horizontal" >
                           <FormItem
                             className="formitem"
                             label="release名称"
                             labelCol={{ span: 4}} 
                             wrapperCol={{span: 20}}
                           >
                             <span>{this.state.releasename}</span>
                           </FormItem>
                            <FormItem label="彻底删除" className="formitem" labelCol={{ span: 4}} wrapperCol={{span: 20}}>
                              {getFieldDecorator('purge',{initialValue: "false"})(
                              <Radio.Group
                                disabled={confirmLoading}
                              >
                                                  <Radio value="true">是</Radio>
                                                  <Radio value="false">否</Radio>
                                                </Radio.Group> 
                              )}
                            </FormItem>
                      </Form>

                  </Modal>
            );
    }
  }
);

export default  HelmReleaseDeleteForm
