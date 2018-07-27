import React, { Component } from 'react';
import { Form, Input, Modal} from 'antd';

const FormItem = Form.Item;

class ModalForm extends Component {
    state = {
        comfirmLoading: false,
    }
    componentDidMount () {
        const data = this.props.dataList;
        if(data){
            this.props.form.setFieldsValue({
                workerTeam: data.workerTeam,
                startTime: data.startTime,
                endTime: data.endTime,
            })
        }
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                title={this.props.modalType === "add" ? "创建队伍":"编辑信息"}
                visible={this.props.isOpen}
                onOk={this.commitInfo}
                onCancel={this.props.hideModal}
                confirmLoading={this.state.confirmLoading}
                okText="确定"
                cancelText="取消"
            >
                <div className="info-box">
                    <Form className="modal-form" layout="inline" onSubmit={this.commitInfo}>
                        <FormItem label="队伍名称">
                            {getFieldDecorator('workerTeam',{})(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="开始时间">
                            {getFieldDecorator('startTime',{})(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="结束时间">
                            {getFieldDecorator('endTime',{})(
                                <Input />
                            )}
                        </FormItem>
                    </Form>
                </div>
            </Modal>
        )
    }
}

const WorkerModal = Form.create()(ModalForm);
export default WorkerModal;