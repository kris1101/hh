import React from 'react'
import { Switch, Form, Input, Drawer, Row, Col, Select, Button, Checkbox, Icon, message, Steps } from 'antd';
import { connect  } from 'react-redux';
import './appcreateform.less'
import { getClusterNamespaceList } from '../../../../../../containers/Paas/common/paascommon.redux'

const FormItem = Form.Item;
const Step = Steps.Step;

const steps = [{
  title: '集群选择',
  content: 'First-content',
}, {
  title: '基本设置',
  content: 'Second-content',
}, {
  title: '网络设置',
  content: 'Second-content',
}, {
  title: '高级设置',
  content: 'Last-content',
}];

let uuid = 1;
const AppCreateForm = Form.create()(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        current: 0,
      };
    }

    next() {
      const current = this.state.current + 1;
      this.setState({ current });
    }

    prev() {
      const current = this.state.current - 1;
      this.setState({ current });
    }

    handleClusterSelect = (value) => {
      console.log(value);
      this.props.getClusterNamespaceList({"Cluster-Id": value});
    }

    handlevalueschange = (e) => {
      console.log(e.target.checked);
      this.setState({values:e.target.checked})
    }

    handlevaluesfilechange = (e) => {
      console.log(e.target.checked);
      this.setState({valuesfile:e.target.checked})
    }
    getInstance = (instance) => {
        if (instance) {
          this.codemirror = instance.codemirror;
          this.editor = instance.editor;
        }
    }

    remove = (k) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
          return;
        } 
        form.setFieldsValue({
          keys: keys.filter(key => key !== k),
        });
    }

    add = () => {
      const { form } = this.props;
      // can use data-binding to get
      const keys = form.getFieldValue('keys');
      const nextKeys = keys.concat(uuid);
      uuid++;
      // can use data-binding to set
      // important! notify form to detect changes
      form.setFieldsValue({
        keys: nextKeys,
      });
    }

    render() {
      const { confirmLoading, visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator, getFieldValue } = form;
      const Option = Select.Option;
      const { current } = this.state;
      getFieldDecorator('keys', { initialValue: [0] });
      const formItemLayout = {
        labelCol: {
          span: 4
        },
        wrapperCol: {
          span: 20 
        },
      };
      const formItemLayoutWithOutLabel = {
        wrapperCol: {
           span: 20, offset: 4 
        },
      }; 
      const keys = getFieldValue('keys');
      const formItems = keys.map((k, index) => {
        return (
          <FormItem className="formitem" 
            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
            label={index === 0 ? 'values键值对' : ''}
            required={false}
            key={k}
          >
          <Col span={11}>
          <FormItem className="formitem" >
            {getFieldDecorator(`chartkeys[${k}]`)(
              <Input placeholder="key" style={{width: "90%", marginRight: 2 }} />
            )}
          </FormItem>
        </Col>
          <Col span={11}>
            <FormItem className="formitem"> 
            {getFieldDecorator(`chartvalues[${k}]`)(
              <Input placeholder="value" style={{ width: "90%", marginRight: 2 }} />
            )}
          </FormItem>
        </Col>
          <Col span={2}>
            <FormItem className="formitem"> 
            {keys.length >= 1 ? (
            <span>
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                disabled={keys.length === 1}
                onClick={() => this.remove(k)}
              />
              <Icon
                className="dynamic-add-button"
                type="plus-circle-o"
                onClick={this.add}
              />
            </span>
            ) : null}
         </FormItem>
        </Col>
         </FormItem>
        );
      });
      
      return (
                <div>
                <Drawer
                  title="应用配置"
                  width="60%"
                  placement="right"
                  onClose={onCancel}
                  maskClosable={false}
                  visible={visible}
                  destroyOnClose={true}
                  style={{
                    padding: 10,
                    height: 'calc(100%- 55px)',
                    overflow: 'auto',
                    paddingBottom: 53,
                  }}
                >
                  <Form  layout="horizontal" hideRequiredMark id="deployform">
                      <div>
                        <Steps current={current}>
                          {steps.map(item => <Step key={item.title} title={item.title} />)}
                        </Steps>
                        <div className="steps-content">{steps[current].content}</div>
                      </div>
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
                          {
                            current > 0
                            && (
                            <Button onClick={() => this.prev()}>
                              上一步
                            </Button>
                            )
                          }
                          {
                            current < steps.length - 1
                            && <Button style={{ marginLeft: 20 }} type="primary" onClick={() => this.next()}>下一步</Button>
                          }
                          {
                            current === steps.length - 1
                            && <Button style={{ marginLeft: 20 }} type="primary" onClick={() => message.success('Processing complete!')}>提交</Button>
                          }
                  </div>
                </Drawer>
              </div>
            );
    }
  }
);

export default  connect(
  state => state.PaasCommon,
  {getClusterNamespaceList}
)(AppCreateForm)
