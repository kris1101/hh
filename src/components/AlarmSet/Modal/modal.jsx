import React, { Component } from 'react';
import { Form, Modal, List} from 'antd';

const FormItem = Form.Item;

class ModalForm extends Component {
    state = {
        data: []
    }
    componentDidMount () {
        const data = this.props.emailData;
        if(data){
            this.setState({
                data:data
            })
        }
    }
    render() {
        return (
            <Modal
                title="告警邮件列表"
                visible={this.props.isOpen}
                onOk={this.props.hideModal}
                onCancel={this.props.hideModal}
                okText="确认"
                cancelText="取消"
            >
                <div className="info-box">
                    <List
                        dataSource={this.state.data}
                        renderItem={item => (
                            <List.Item>
                                <a>{item.address}</a>
                            </List.Item>
                        )} />
                </div>
            </Modal>
        )
    }
}

const AlarmModal = Form.create()(ModalForm);
export default AlarmModal;