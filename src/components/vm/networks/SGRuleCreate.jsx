import React, { Component } from 'react';
import { notification, Select, InputNumber, Checkbox, Button, Modal, Form, Input, Radio } from 'antd';

import { sgRuleCreate, getSGRuleRemoteGroup } from '../../../services/vm/user';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};
const protocol_choices = [
  {'name': 'tcp', 'value': 'tcp', 'display_name': '定制TCP规则', },
  {'name': 'udp', 'value': 'udp', 'display_name': '定制UDP规则', },
  {'name': 'icmp', 'value': 'icmp', 'display_name': '定制ICMP规则', },
  {'name': 'custom', 'value': 'custom', 'display_name': '其他协议', },
  {'name': 'all_tcp', 'value': 'all_tcp', 'display_name': '所有TCP协议', },
  {'name': 'all_udp', 'value': 'all_udp', 'display_name': '所有UDP协议', },
  {'name': 'all_icmp', 'value': 'all_icmp', 'display_name': '所有ICMP协议', },
  {'name': 'ssh', 'value': 'ssh', 'display_name': 'SSH', },
  {'name': 'dns', 'value': 'dns', 'display_name': 'DNS', },
  {'name': 'http', 'value': 'http', 'display_name': 'HTTP', },
  {'name': 'https', 'value': 'https', 'display_name': 'HTTPS', },
  {'name': 'ms_sql', 'value': 'ms_sql', 'display_name': 'MS SQL', },
  {'name': 'mysql', 'value': 'mysql', 'display_name': 'MySQL', },
  {'name': 'imap', 'value': 'imap', 'display_name': 'imap', },
  {'name': 'imaps', 'value': 'imaps', 'display_name': 'imaps', },
  {'name': 'pop3', 'value': 'pop3', 'display_name': 'pop3', },
  {'name': 'pop3s', 'value': 'pop3s', 'display_name': 'pop3s', },
  {'name': 'smtp', 'value': 'smtp', 'display_name': 'SMTP', },
  {'name': 'smtps', 'value': 'smtps', 'display_name': 'SMTPS', },
  {'name': 'rdp', 'value': 'rdp', 'display_name': 'rdp', },
  {'name': 'ldap', 'value': 'ldap', 'display_name': 'ldap', },
]
const protocol_children = protocol_choices.map(row => <Option key={row.value}>{row.display_name}</Option>);
const direction_choices = [
  {'value': 'egress', 'display_name': '出口', },
  {'value': 'ingress', 'display_name': '入口', },
]
const direction_children = direction_choices.map(row => <Option key={row.value}>{row.display_name}</Option>);
const port_type_choices = [
  {'value': 'port', 'display_name': '端口'},
  {'value': 'port_range', 'display_name': '端口范围'},
  {'value': 'all_port', 'display_name': '所有端口'},
]
const port_type_children = port_type_choices.map(row => <Option key={row.value}>{row.display_name}</Option>);
const remote_choices = [
  {'value': 'cidr', 'display_name': 'CIDR'},
  {'value': 'sg', 'display_name': '安全组'},
]
const remote_children = remote_choices.map(row => <Option key={row.value}>{row.display_name}</Option>);



class CreateForm extends React.Component {
  state = {
    remote_group_data: [],
    direction_show: true,
    port_type_show: true,
    port_range_min_show: true,
    port_range_min_text: '端口',
    port_range_max_show: false,
    icmp_type_show: false,
    icmp_code_show: false,
    remote_ip_prefix_show: true,
    remote_group_show: false,
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.visible === false || this.state.remote_group_data.length !== 0){
      return;
    }

    getSGRuleRemoteGroup(this.props.sg_id).then(res => {
      if(res.code === -2){
        notification['warning']({message: res.msg});
      }
      this.setState({
        remote_group_data: [...res.data.map(val => {
            val.key = val.id;
            return val;
        })],
      });
    });

  };
  handleProtocolChange = (value) => {
    if (['tcp', 'udp'].includes(value)) {
      const { form } = this.props;
      const port_type = form.getFieldValue('port_type');
      this.setState({
        port_type_show: true,
        port_range_min_show: port_type === 'all_port' ? false : true,
        port_range_min_text: port_type === 'port' ? '端口' : '起始端口',
        port_range_max_show: port_type === 'port_range' ? true : false,
      });
    } else {
      this.setState({
        port_type_show: false,
        port_range_min_show: false,
        port_range_max_show: false,
      });
    }

    if (['tcp', 'udp', 'icmp', 'custom', 'all_tcp', 'all_udp', 'all_icmp'].includes(value)) {
      this.setState({
        direction_show: true,
      });
    } else {
      this.setState({
        direction_show: false,
      });
    }

    if ('icmp' === value) {
      this.setState({
        icmp_type_show: true,
        icmp_code_show: true,
      });
    } else {
      this.setState({
        icmp_type_show: false,
        icmp_code_show: false,
      });
    }
  };
  handlePortTypeChange = (value) => {
    this.setState({
      port_type_show: true,
      port_range_min_show: value === 'all_port' ? false : true,
      port_range_min_text: value === 'port' ? '端口' : '起始端口',
      port_range_max_show: value === 'port_range' ? true : false,
    });
  };
  handleRemoteChange = (value) => {
    this.setState({
      remote_ip_prefix_show: value === 'cidr' ? true : false,
      remote_group_show: value === 'cidr' ? false : true,
    });
  };

  render() {
    const { visible, onCancel, onCreate, form, confirmLoading } = this.props;
    const { getFieldDecorator } = form;

    const remote_group_children = [];
    for (var u of this.state.remote_group_data){
      remote_group_children.push(<Option key={u.id}>{u.name}</Option>);
    }

    return (
      <Modal
          visible={visible}
          title="新增安全组规则"
          okText="创建"
          onCancel={onCancel}
          onOk={onCreate}
          confirmLoading={confirmLoading}
      >
        <Form>
          <FormItem {...formItemLayout} label="IP协议">
            {getFieldDecorator('protocol', {
              rules: [{ required: true, message: '请输入IP协议!' }],
              initialValue: 'tcp',
            })(
              <Select placeholder="选择IP协议" onChange={this.handleProtocolChange}>
                {protocol_children}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="方向" style={{ display: this.state.direction_show ? 'block' : 'none' }}>
            {getFieldDecorator('direction', {
              rules: [{ required: true, message: '请输入方向!' }],
              initialValue: 'egress',
            })(
              <Select placeholder="选择方向" >
                {direction_children}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="端口类型" style={{ display: this.state.port_type_show ? 'block' : 'none' }}>
            {getFieldDecorator('port_type', {
              rules: [{ required: true, message: '请输入!' }],
              initialValue: 'port',
            })(
              <Select placeholder="选择端口类型" onChange={this.handlePortTypeChange} >
                {port_type_children}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label={this.state.port_range_min_text} style={{ display: this.state.port_range_min_show ? 'block' : 'none' }}>
            {getFieldDecorator('port_range_min', {
              rules: [{ required: false, message: '请输入!' }],
            })(
              <InputNumber min={1} max={65534} placeholder={this.state.port_range_min_text} />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="终止端口" style={{ display: this.state.port_range_max_show ? 'block' : 'none' }}>
            {getFieldDecorator('port_range_max', {
              rules: [{ required: false, message: '请输入!' }],
            })(
              <InputNumber min={1} max={65534} placeholder="终止端口" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="ICMP类型" extra="-1~255" style={{ display: this.state.icmp_type_show ? 'block' : 'none' }}>
            {getFieldDecorator('icmp_type', {
              rules: [{ required: false, message: '请输入ICMP类型!' }],
            })(
              <InputNumber min={-1} max={255} placeholder="ICMP类型" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="ICMP编码" extra="-1~255" style={{ display: this.state.icmp_code_show ? 'block' : 'none' }}>
            {getFieldDecorator('icmp_code', {
              rules: [{ required: false, message: '请输入ICMP编码!' }],
            })(
              <InputNumber min={-1} max={255} placeholder="ICMP编码" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="远程">
            {getFieldDecorator('remote', {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{ required: true, message: '请输入远程!' }, ],
              initialValue: 'cidr',
            })(
              <Select placeholder="选择端口类型" onChange={this.handleRemoteChange} >
                {remote_children}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="远端IP前缀" style={{ display: this.state.remote_ip_prefix_show ? 'block' : 'none' }}>
            {getFieldDecorator('remote_ip_prefix', {
              rules: [{ required: false, message: '请输入!' }],
            })(
              <Input placeholder="远端IP前缀" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="远端安全组" style={{ display: this.state.remote_group_show ? 'block' : 'none' }}>
            {getFieldDecorator('remote_group', {
              rules: [{ required: false, message: '请输入!' }],
            })(
              <Select placeholder="选择安全组" >
                {remote_group_children}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="描述">
            {getFieldDecorator('description', {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{ required: false, message: '请输入描述!' }, ],
            })(
              <TextArea placeholder="描述" autosize={{ minRows: 4, }} />
            )}
          </FormItem>

        </Form>
      </Modal>
    );
  }
}
const CollectionCreateForm = Form.create()(CreateForm);


class SGRuleCreate extends Component {
  state = {
    visible: false,
    confirmLoading: false,
  };
  showModal = () => {
    this.setState({ visible: true });
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      this.setState({ confirmLoading: true });
      sgRuleCreate(this.props.sg_id, {
        protocol: values.protocol, direction: values.direction,
        port_type: values.port_type, port_range_min: values.port_range_min,
        port_range_max: values.port_range_max || '', icmp_type: values.icmp_type,
        icmp_code: values.icmp_code, remote: values.remote,
        remote_group: values.remote_group, remote_ip_prefix: values.remote_ip_prefix,
        description: values.description,
      }).then(res => {
        if (res.code === 0) {
          notification['success']({message: res.msg});
          form.resetFields();
          this.setState({ visible: false });
          this.props.refresh();
        }else{
          notification['warning']({message: res.msg});
        }
      }).catch(function (error) {
        console.log(error);
        notification['error']({message: error});
      });
      this.setState({ confirmLoading: false });
    });
  };
  saveFormRef = (form) => {
    this.form = form;
  };
  render() {
    return (
      <span>
        <Button type="primary" onClick={this.showModal} style={{ marginBottom: 16 }}>新增安全组规则</Button>
        <CollectionCreateForm
            ref={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
            confirmLoading={this.state.confirmLoading}
            sg_id={this.props.sg_id}
            refresh={this.props.refresh}
        />
      </span>
    );
  }
}


export default SGRuleCreate;
