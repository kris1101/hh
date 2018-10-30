import React from 'react'
import {  Table, Form, Modal} from 'antd';
import { connect } from 'react-redux';
import { getLabelInfo } from '../../../../../../containers/Paas/k8s/k8snodemanagement.redux';
import { getNodeLabel } from './TableTpl/tabletpl';

const NodeLabelForm = Form.create()(
  class extends React.Component {
    constructor(props) {
        super(props);
        this.columns = getNodeLabel.call(this);
    }
    state = {
      nodename: null,
      clusterid:null
    }

    handleshow = (nodename, clusterid) => {
        this.setState({nodename});    
        this.setState({clusterid});    
        this.props.getLabelInfo({name: nodename}, {'Cluster-Id': clusterid});
    }

    handlegetupdate = () => {
        this.props.getLabelInfo({name: this.state.nodename}, {'Cluster-Id': this.state.clusterid});
    }

    render() {
      const { handlecreate, handleCancel, visible } = this.props;

      return (
             <div>
                <Modal
                  visible={visible}
                  title={`标签管理: ${this.state.nodename}`}
                  centered
                  okText="新增标签"
                  onOk={handlecreate}
                  onCancel={handleCancel}
                  bodyStyle={{padding:0}}
                >
                    <div style={{ background:'#fff' }}>
                        <Table bordered pagination={false} loading={this.props.nodeLabelLoading} rowKey={record => record.key} columns={this.columns} dataSource={this.props.nodeLabelList} />
                    </div>
                </Modal>
             </div>
            );
    }
  }
);


export default connect(
  state => state.k8sNode,
  {getLabelInfo})(NodeLabelForm);
