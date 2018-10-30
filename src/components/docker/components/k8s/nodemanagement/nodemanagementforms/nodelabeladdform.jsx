import React from 'react'
import { Col, Input, Form, Modal} from 'antd';

const FormItem = Form.Item;

const NodeLabelAddForm = Form.create()(
  class extends React.Component {

    state = {
      nodename: null,
      clusterid:null
    }

    handleshow = (nodename, clusterid) => {
        this.setState({nodename});    
        this.setState({clusterid});    
    }

    render() {
      const { handleok, handleCancel, visible, confirmloading } = this.props;
      const { getFieldDecorator } = this.props.form;

      return (
             <div>
                <Modal
                  visible={visible}
                  title={`新增标签: ${this.state.nodename}`}
                  centered
                  okText="提交"
                  confirmLoading={confirmloading}
                  onOk={handleok}
                  onCancel={handleCancel}
                  bodyStyle={{padding:0}}
                >
                    <div style={{ background:'#fff' }}>
                      <FormItem
                        label=""
                        style={{margin: 24}}
                      >
                        <Col span={11}>
                          <FormItem>
                          {getFieldDecorator('key', {'rules': [{
                                                   required: true,
                                                   message: 'key不能为空',
                                                 }]})( 
                            <Input placeholder="key"/>
                          )}
                          </FormItem>
                        </Col>
                        <Col span={2}>
                          <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                            :
                          </span>
                        </Col>
                        <Col span={11}>
                          <FormItem>
                          {getFieldDecorator('value', {'rules': [{
                                                             required: true,
                                                             message: 'value不能为空',
                                                           }]})( 
                            <Input placeholder="value"/>
                          )}
                          </FormItem>
                        </Col>
                      </FormItem>
                    </div>
                </Modal>
             </div>
            );
    }
  }
);


export default  NodeLabelAddForm;
