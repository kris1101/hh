import React from 'react'
import {Card, Switch, Form, Input, Drawer, Row, Col, Select, Button, Checkbox, Icon, Divider } from 'antd';
import { connect  } from 'react-redux';
import './chartdeployform.less'
import { getClusterNamespaceList } from '../../../../../../../containers/Paas/common/paascommon.redux'
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/addon/display/autorefresh';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/night.css';

const FormItem = Form.Item;

let uuid = 1;
const HelmChartDeployForm = Form.create()(
  class extends React.Component {
    state = { 
      chartinfo:{versions:[]},
      values: false,
      valuesfile:false,
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
                  title="部署chart"
                  width="800px"
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
                    <Card 
                      title="基础配置"
                      headStyle={{
                                    background: '#F5F5F5'
                                }}
                    >
                        <Form.Item className="formitem" label="chart名称" labelCol={{ span: 4}} wrapperCol={{span: 20}}>
                              <span style={{fontSize: 15}}>{this.state.chartinfo.chart_name}</span>
                        </Form.Item>
                        <Form.Item className="formitem" label="部署选项" labelCol={{ span: 4}} wrapperCol={{span: 20}}>
                                 <Row>
                                   <Col span={12}><Checkbox onChange={this.handlevalueschange} disabled={confirmLoading} value="values">values替换</Checkbox></Col>
                                   <Col span={12}><Checkbox onChange={this.handlevaluesfilechange} disabled={confirmLoading} value="valuesfile">valuesfile替换</Checkbox></Col>
                                 </Row>
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
                        <Form.Item className="formitem" label="reuse_name" labelCol={{ span: 4}} disabled={confirmLoading} wrapperCol={{span: 20}}>
							{getFieldDecorator('reuse_name',{initialValue: false})(
                                   <Switch />
                             )}
                        </Form.Item>
                        <Form.Item className="formitem" label="disable_crd_hook" labelCol={{ span: 4}} disabled={confirmLoading} wrapperCol={{span: 20}}>
							{getFieldDecorator('disable_crd_hook',{initialValue: false})(
                                   <Switch />
                             )}
                        </Form.Item>
                        <Form.Item className="formitem" label="release名称" labelCol={{ span: 4}} disabled={confirmLoading} wrapperCol={{span: 20}}>
							{getFieldDecorator('release_name')(
									<Input placeholder="留空为随机名称"/>
                             )}
                        </Form.Item>
                        <Form.Item className="formitem" label="repo名称" labelCol={{ span: 4}} disabled={confirmLoading} wrapperCol={{span: 20}}>
							{getFieldDecorator('repo_id',{initialValue: this.state.chartinfo.repo_id, rules: [{required: true, message:"该项不能为空"}]})(
									<Select style={{ width: "100%" }}>
										 <Option value={this.state.chartinfo.repo_id}>{this.state.chartinfo.repo_name}</Option>
                                    </Select>
                             )}
                        </Form.Item>
                        <Form.Item className="formitem" label="chart名称" labelCol={{ span: 4}} disabled={confirmLoading} wrapperCol={{span: 20}}>
							{getFieldDecorator('chart_name',{initialValue: this.state.chartinfo.chart_name, rules: [{required: true, message:"该项不能为空"}]})(
									<Select style={{ width: "100%" }}>
										 <Option value={this.state.chartinfo.chart_name}>{this.state.chartinfo.chart_name}</Option>
                                    </Select>
                             )}
                        </Form.Item>
                        <Form.Item className="formitem" label="chart版本" labelCol={{ span: 4}} disabled={confirmLoading} wrapperCol={{span: 20}}>
							{getFieldDecorator('version',{initialValue: this.state.chartinfo.versions[0], rules: [{required: true, message:"该项不能为空"}]})(
									<Select style={{ width: "100%" }}>
										{this.state.chartinfo.versions.map(function(value){return (<Option key={value} value={value}>{value}</Option>)})}
                                    </Select>
                             )}
                        </Form.Item>
                        <Form.Item className="formitem" label="集群名称" labelCol={{ span: 4}} disabled={confirmLoading} wrapperCol={{span: 20}}>
							{getFieldDecorator('cluster', {rules: [{required: true, message:"该项不能为空"}]})(
                            <Select 
                              style={{ width: "100%" }} 
                              onSelect={this.handleClusterSelect}
                              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                              getPopupContainer={() => document.getElementById("deployform")}
                              showSearch
                            >
										{this.props.clusterList.map(function(value){return (<Option key={value.id} value={value.id}>{value.name}</Option>)})}
                                    </Select>
                             )}
                        </Form.Item>
                        <Form.Item className="formitem" label="命名空间" labelCol={{ span: 4}} disabled={confirmLoading} wrapperCol={{span: 20}}>
							{getFieldDecorator('namespace',{rules: [{required: true, message:"该项不能为空"}]})(
                            <Select 
                              style={{ width: "100%" }}
                              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                              getPopupContainer={() => document.getElementById("deployform")}
                              showSearch
                            >
										{this.props.namespaceList.map(function(value){return (<Option key={value.id} value={value.text}>{value.text}</Option>)})}
                                    </Select>
                             )}
                        </Form.Item>
                    </Card> 
                        {this.state.values ? (
                        <div>
                        <Divider />
                         <Card 
                           title="values替换"
                           headStyle={{
                                         background: '#F5F5F5'
                              }}>
       						  {formItems}
                            </Card>
                          </div>) : null}
                        {this.state.valuesfile ? (
                        <div>
                        <Divider />
                         <Card 
                           title="valuefile替换"
                           headStyle={{
                                         background: '#F5F5F5'
                              }}>
							 <CodeMirror 
							   value="" 
							   ref={this.getInstance} 
							   options={{ 
							     theme: "night", 
							     keyMap: 'sublime', 
							     fullScreen: true, 
							     mode: "yaml", 
							   }}
							/> 
                          </Card>
                      </div>) : null}
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
  state => state.PaasCommon,
  {getClusterNamespaceList}
)(HelmChartDeployForm)
