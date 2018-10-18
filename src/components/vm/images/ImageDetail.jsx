import React, { Component } from 'react';
import { Icon, notification, Table, Tooltip, Modal } from 'antd';


import { getDetailColumes } from './TableTpl/imageTableTpl';
import { imageDetail } from '../../../services/vm/user';
import { humansize, timezoneFormat } from '../../../utils/vm'


class ImageDetail extends Component {
  constructor(props) {
    super(props);
    this.columns = getDetailColumes.call(this);
  }
  state = {
    loading: false,
    visible: false,
    confirmLoading: false,
    data: [],
  };
  // componentDidMount() {
  //   this.start();
  // }
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.visible === false || this.state.data.length !== 0){
  //     return;
  //   }
  //   this.start();
  // }
  start = () => {
    this.setState({ loading: true });
    imageDetail(this.props.record.id).then(res => {
      if(res.code === -2){
        notification['warning']({message: res.msg});
        this.setState({loading: false});
        return
      } else if(res.code === -1){
        notification['warning']({message: res.msg});
        this.setState({loading: false});
        return
      }
      this.setState({
        data: [
          {'title': '镜像名', 'key': 'name', 'value': this.props.record.name},
          {'title': '镜像ID', 'key': 'id', 'value': this.props.record.id},
          {'title': '大小', 'key': 'size', 'value': humansize(this.props.record.size, 'B')},
          {'title': '类型', 'key': 'image_type_display', 'value': this.props.record.image_type_display},
          {'title': '磁盘格式', 'key': 'disk_format', 'value': this.props.record.disk_format},
          {'title': '可见性', 'key': 'visibility_display', 'value': this.props.record.visibility_display},
          {'title': '受保护的', 'key': 'protected', 'value': this.props.record['protected'] ? '是' : '否'},
          {'title': '创建日期', 'key': 'create_time', 'value': timezoneFormat(this.props.record.create_time)},
          {'title': '最小内存', 'key': 'min_ram', 'value': res.data.min_ram},
          {'title': '最小磁盘大小', 'key': 'min_disk', 'value': res.data.min_disk},
          {'title': '拥有的项目ID', 'key': 'project_id', 'value': res.data.project_id},
          {'title': '快照实例', 'key': 'instance_id', 'value': res.data.instance_id},
          {'title': '创建人', 'key': 'create_user', 'value': res.data.create_user},
          {'title': '父镜像', 'key': 'base_image_ref', 'value': res.data.base_image_ref},
        ],
        loading: false,
      });
    });

  };
  showModal = () => {
    this.setState({ visible: true });
    this.start();
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };
  handleOk = () => {
    this.setState({ visible: false });
  };

  render() {
    return (
      <span>
        <Tooltip title="详情">
          <a onClick={this.showModal}><Icon type="bars" /></a>
        </Tooltip>
        <Modal title="镜像详情"
               visible={this.state.visible}
               onOk={this.handleOk}
               confirmLoading={this.state.confirmLoading}
               onCancel={this.handleCancel}
               footer={null}
        >
          <Table columns={this.columns} dataSource={this.state.data}
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


export default ImageDetail;
