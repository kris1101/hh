import React, { Component } from 'react';
import { Form, Input, Modal, Select, Checkbox} from 'antd';

const FormItem = Form.Item;

class ModalForm2 extends Component {
    state = {
        comfirmLoading: false,
    }
    componentDidMount () {
        const data = this.props.dataList;
        if(data){
            this.props.form.setFieldsValue({
                partmentName: data.partmentName,
                groupName1: data.groupName1,
                groupName2: data.groupName2,
                groupNum: data.groupNum
            })
        }
    }

    onChange = (checkedList) => {
        this.setState({
            checkedList,
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                title={this.props.modalType === "edit" ? "编辑信息" : "部门详情"}
                visible={this.props.isOpen}
                onOk={this.commitInfo}
                onCancel={this.props.hideModal}
                confirmLoading={this.state.confirmLoading}
                okText="确定"
                cancelText="取消"
            >
                <div className="info-box">
                    <Form className="modal-form" layout="inline" onSubmit={this.commitInfo}>

                        <FormItem label="部门名称">
                            {getFieldDecorator('partmentName',{})(
                                <Input  disabled={this.props.modalType === "view"}/>
                            )}
                        </FormItem>
                        {
                            this.props.modalType === "view" &&
                            <FormItem label="分组数量">
                                {getFieldDecorator('groupNum',{})(
                                    <Input disabled={this.props.modalType === "view"}/>
                                )}
                            </FormItem>
                        }
                        <FormItem label="组一名称">
                            {getFieldDecorator('groupName1',{})(
                                <Input  disabled={this.props.modalType === "view"}/>
                            )}
                        </FormItem>
                        <FormItem label="组二名称">
                            {getFieldDecorator('groupName2',{})(
                                <Input  disabled={this.props.modalType === "view"}/>
                            )}
                        </FormItem>
                        <FormItem label="组三名称">
                            {getFieldDecorator('groupName3',{})(
                                <Input  disabled={this.props.modalType === "view"}/>
                            )}
                        </FormItem>
                    </Form>
                </div>
            </Modal>
        )
    }
}

const EmployeesModal2 = Form.create()(ModalForm2);
export default EmployeesModal2;