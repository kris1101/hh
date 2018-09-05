import React, { Component } from 'react';
import { Icon, Table, Tooltip, Modal } from 'antd';


class KeyDetail extends Component {
    state = {
      loading: false,
      visible: false,
      confirmLoading: false,
      data: [],
    };
    componentDidMount() {
      this.start();
    };
    componentWillReceiveProps(nextProps) {
      // if (nextProps.visible === false){
      //   return;
      // }
      this.start();
    }
    start = () => {
      this.setState({ loading: true });
      this.setState({
        data: [
          {'title': '名称', 'key': 'name', 'value': this.props.record.name},
          {'title': '用户ID', 'key': 'user_id', 'value': this.props.record.user_id},
          {'title': '指纹', 'key': 'fingerprint', 'value': this.props.record.fingerprint},
          {'title': '创建日期', 'key': 'created_at', 'value': this.props.record.created_at},
          {'title': '公钥', 'key': 'public_key', 'value': this.props.record.public_key},
        ],
        loading: false,
      });

    };
    showModal = () => {
        this.setState({ visible: true });
    };
    handleCancel = () => {
        this.setState({ visible: false });
    };
    handleOk = () => {
        this.setState({ visible: false });
    };

    render() {
        const columns = [{
          dataIndex: 'title',
          width: '30%',
        }, {
          dataIndex: 'value',
          render: (text, record) => <span className="display-linebreak"> {text} </span>
        }];

        return (
            <span>
              <Tooltip title="详情">
                <a onClick={this.showModal}><Icon type="bars" /></a>
              </Tooltip>
              <Modal title="密钥详情"
                     visible={this.state.visible}
                     onOk={this.handleOk}
                     confirmLoading={this.state.confirmLoading}
                     onCancel={this.handleCancel}
                     footer={null}
              >
                <Table columns={columns} dataSource={this.state.data}
                  size="middle"
                  loading={this.state.loading}
                  pagination={false}
                  showHeader={false}
                />
              </Modal>
            </span>
        );
    }
}


export default KeyDetail;
