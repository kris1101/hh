import React, { Component } from 'react';
import { Form, Input, Modal, Select, Checkbox} from 'antd';

const FormItem = Form.Item;

class ModalForm extends Component {
    state = {
        comfirmLoading: false,
    }
    commitInfo = (values) => {

    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                title="添加部门"
                visible={this.props.isOpen}
                onOk={this.commitInfo}
                onCancel={this.props.hideModal}
                confirmLoading={this.state.confirmLoading}
                okText="保存"
                cancelText="取消"
            >
                <div className="info-box">
                    <Form className="modal-form" layout="inline" onSubmit={this.commitInfo}>
                        <FormItem label="部门名称">
                            {getFieldDecorator('partName',{ rules:[{required: true, message:'请输入部门名称'}] })(
                                <Input placeholder="请输入部门名称"/>
                            )}
                        </FormItem>
                        <FormItem label="组一名称">
                            {getFieldDecorator('groupName',{ rules:[{required: true, message:'请输入组一名称'}] })(
                                <Input placeholder="请输入组一名称"/>
                            )}
                        </FormItem>
                    </Form>
                </div>
            </Modal>
        )
    }
}

const EmployeesModal = Form.create()(ModalForm);
export default EmployeesModal;