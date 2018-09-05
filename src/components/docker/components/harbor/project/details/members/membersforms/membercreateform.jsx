import React from 'react'
import { message, Modal, Form, Input, Radio, Select } from 'antd';
import { getAjax  } from '../../../../../../utils/axios'

const FormItem = Form.Item;
const Option = Select.Option

const MemberCreateForm = Form.create()(
  class extends React.Component {

    render() {
      const { validMemberData, confirmLoading, visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="新增成员"
          okText="提交"
          onCancel={onCancel}
          onOk={onCreate}
          confirmLoading={confirmLoading}
        >
          <Form>
            <FormItem label="成员名称"  labelCol={{span: 4}}  wrapperCol={{ span: 20 }}>
              {getFieldDecorator('username', {
              rules: [{ required: true }],
              })(
                <Select
                   showSearch
                   style={{ width: '100%' }}
                   placeholder="Select a member"
                   optionFilterProp="children"
                   filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                 >
                   {validMemberData.map(d => <Option key={d}>{d}</Option>)}
                 </Select>
              )}
            </FormItem>
            <FormItem label="角色权限"  labelCol={{span: 4}}  wrapperCol={{ span: 20  }}>
              {getFieldDecorator('role_id', {
                initialValue: '1', rules: [{required: true}],
              })(
                <Radio.Group disabled={confirmLoading}>
                  <Radio value="1">项目管理员</Radio>
                  <Radio value="2">开发人员</Radio>
                  <Radio value="3">访客</Radio>
                </Radio.Group>
              )}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

export { MemberCreateForm }
