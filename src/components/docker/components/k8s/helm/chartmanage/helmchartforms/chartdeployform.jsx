import React from 'react'
import { message, Form, Input, Drawer, Row, Col, Select, DatePicker, Button, Tag } from 'antd';
import { getAjax  } from '../../../../../utils/axios'

const FormItem = Form.Item;

const HelmChartDeployForm = Form.create()(
  class extends React.Component {
     state = { 
            chartinfo:{}
         }   


    render() {
      const { confirmLoading, visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      const Option = Select.Option;
      return (
                <div>
                <Drawer
                  title="部署chart"
                  width="60%"
                  placement="right"
                  onClose={onCancel}
                  maskClosable={false}
                  visible={visible}
                  destroyOnClose={true}
                  style={{
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    paddingBottom: 53,
                  }}
                >
                  <Form  layout="horizontal" hideRequiredMark>
                        <Form.Item label="chart名称" labelCol={{ span: 3}} wrapperCol={{span: 21}}>
                              <span>{this.state.chartinfo.chart_name}</span>
                        </Form.Item>
                        <Form.Item label="chart名称" labelCol={{ span: 3}} wrapperCol={{span: 21}}>
                              <span>{this.state.chartinfo.chart_name}</span>
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
                      Cancel
                    </Button>
                    <Button onClick={this.onClose} type="primary">Submit</Button>
                  </div>
                </Drawer>
              </div>
            );
    }
  }
);

export { HelmChartDeployForm }
