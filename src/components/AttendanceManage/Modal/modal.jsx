import React, { Component } from 'react';
import { Form, Input, Modal, Select} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class ModalForm extends Component {
    state = {
        comfirmLoading: false
    }
    componentDidMount () {
        const data = this.props.areaData;
        if(data){
            this.props.form.setFieldsValue({
                userName: data.roleName,
                userEmail: data.id,
                name: data.remarks
            })
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                title={this.props.modalType === 'add' ? '添加用户' : '编辑用户'}
                visible={this.props.isOpen}
                onOk={this.commitInfo}
                onCancel={this.props.hideModal}
                confirmLoading={this.state.confirmLoading}
                okText="保存"
                cancelText="取消"
            >
                <div className="info-box">
                    <Form className="modal-form" layout="inline" onSubmit={this.commitInfo}>
                        <FormItem label="账号">
                            {getFieldDecorator('userName',{ rules:[{required: true, message:'请输入账号'}] })(
                                <Input placeholder="请输入账号"/>
                            )}
                        </FormItem>
                        <FormItem label="邮箱">
                            {getFieldDecorator('userEmail',{ rules:[{required: true, message:'请输入邮箱'}] })(
                                <Input placeholder="用于找回密码"/>
                            )}
                        </FormItem>
                        <FormItem label="姓名">
                            {getFieldDecorator('name',{rules:[{required: true, message:'请输入姓名'}] })(
                                <Input placeholder="请输入真实姓名"/>
                            )}
                        </FormItem>
                        <FormItem label="密码">
                            {getFieldDecorator('password',{rules:[{required: true, message:'请输入密码'}] })(
                                <Input placeholder="6~18位英文字母、数字组合"/>
                            )}
                        </FormItem>
                        <FormItem label="角色">
                            {getFieldDecorator('rodeType',{initialValue:''})(
                                <Select style={{ width:120 }}>
                                    <Option value="">超级管理</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Form>
                </div>
            </Modal>
        )
    }
}

const UserModal = Form.create()(ModalForm);
export default UserModal;