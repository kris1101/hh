import React, { Component } from 'react';
import Dockersider from '../../../../../common/LeftSider/dockersider';
import { message, Layout, Form, Input, Button, Select, Table } from 'antd';
import { connect } from 'react-redux';
import BreadcrumbCustom from '../../../../../../components/BreadcrumbCustom';
import { getTillerConfig } from './TableTpl/tabletpl';
import './tillerconfig.less';
import { getK8sTillerList } from '../../../../../../containers/Paas/k8s/k8stiller.redux'
import { clearTillerData } from '../../../../../../containers/Paas/k8s/k8stiller.redux'
import { TillerCreateForm } from './tillerconfigforms/tillerconfigcreate'
import { TillerUpdateForm } from './tillerconfigforms/tillerconfigupdate'
import { postAjax } from '../../../../utils/axios'
import { putAjax } from '../../../../utils/axios'
import { generateformdata  } from '../../../../utils/tools_helper'
import K8sClusterSelectForm from '../../../common/k8sclusterselect'

const { Sider, Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;

class K8sTillerForm extends Component {
    constructor(props) {
        super(props);
        this.columns = getTillerConfig.call(this);
    }
    state = {
        updateRecord: {},
        TillerCreateVisible: false,
        TillerCreateConfirmLoading: false,
        TillerUpdateVisible: false,
        TillerUpdateConfirmLoading: false,
    }

    componentDidMount () {
        this.showinitmessage();
        this.props.clearTillerData(); 
        
    }

    //重置表单
    handleReset = () => {
      this.props.form.resetFields(); 
    }

    showinitmessage = () => {
        message.info("请在右上角选择集群查看!")
    }

    showTillerCreateModel = () => {
        this.setState({TillerCreateVisible: true}) 
    }

    showTillerUpdateModel = (record) => {
        this.setState({TillerUpdateVisible: true}) 
        this.TillerUpdateFormRef.updateState(record.is_ssl);
        this.setState({updateRecord: record});

    }

    handleTillerCreateCancel = () => {
        this.setState({TillerCreateVisible: false}) 
        this.setState({TillerCreateConfirmLoading: false})
        const form = this.TillerCreateFormRef.props.form;
        this.TillerCreateFormRef.reset();
        form.resetFields();
    }

    handleTillerUpdateCancel = () => {
        this.setState({TillerUpdateVisible: false}) 
        this.setState({TillerUpdateConfirmLoading: false})
        const form = this.TillerUpdateFormRef.props.form;
        this.TillerUpdateFormRef.reset();
        form.resetFields();
    }

    handleClusterSelect = (value) => {
        console.log(value);
        this.props.getK8sTillerList({'Cluster-Id': value})
    }

    handleTillerCreate = () => {
      if(!this.ClusterSelectFormRef.props.form.getFieldsValue().clustername){
          message.warn("请选择集群");
          return;
      }
      const form = this.TillerCreateFormRef.props.form;
      console.log(form.getFieldsValue())
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        this.setState({TillerCreateConfirmLoading: true})
        const _that = this;
        postAjax('/k8s/tillerconfig/', generateformdata(values), function(res){
            if(res.data.code == 0){
                message.success("创建成功") 
                _that.setState({TillerCreateConfirmLoading: false})
                form.resetFields();
                _that.TillerCreateFormRef.reset();
                _that.setState({ TillerCreateVisible: false });
                _that.handleTillerQuery();
            }else{
                message.error(res.data.msg) 
                _that.setState({TillerCreateConfirmLoading: false})
            }
        }, {'Cluster-Id': this.ClusterSelectFormRef.props.form.getFieldsValue().clustername})
      });
    }

    handleTillerUpdate = (tiller_config_id) => {
      if(!this.ClusterSelectFormRef.props.form.getFieldsValue().clustername){
          message.warn("请选择集群");
          return;
      }
      const form = this.TillerUpdateFormRef.props.form;
      console.log(form.getFieldsValue())
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        this.setState({TillerUpdateConfirmLoading: true})
        const _that = this;
        values.id = tiller_config_id;
        putAjax('/k8s/tillerconfig/', generateformdata(values), function(res){
            if(res.data.code == 0){
                message.success("更新成功") 
                _that.setState({TillerUpdateConfirmLoading: false})
                form.resetFields();
                _that.setState({ TillerUpdateVisible: false });
                _that.TillerUpdateFormRef.reset();
                _that.setState({ TillerCreateVisible: false });
                _that.handleTillerQuery();
            }else{
                message.error(res.data.msg) 
                _that.setState({TillerUpdateConfirmLoading: false})
            }
        }, {'Cluster-Id': this.ClusterSelectFormRef.props.form.getFieldsValue().clustername})
      });
    }

    saveTillerCreateFormRef = (formRef) => {
      this.TillerCreateFormRef = formRef;
    } 

    saveclusterselectFormRef = (formRef) => {
      this.ClusterSelectFormRef = formRef;
    } 

    saveTillerUpdateFormRef = (formRef) => {
      this.TillerUpdateFormRef = formRef;
    } 

    handleTillerQuery = () => {
      if(!this.ClusterSelectFormRef.props.form.getFieldsValue().clustername){
          message.warn("请选择集群");
          return;
      }
      this.props.getK8sTillerList({'Cluster-Id': this.ClusterSelectFormRef.props.form.getFieldsValue().clustername});
    }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout className="config">
        <Sider>
            <Dockersider/>
        </Sider>
        <Content style={{ padding: 0, margin:10, marginBottom: 0, minHeight: window.innerHeight-84 }}>
            <BreadcrumbCustom first="helm管理" second="Tiller配置" />
            <K8sClusterSelectForm 
              handleSelctEvent={this.handleClusterSelect}
        	  wrappedComponentRef={this.saveclusterselectFormRef}
            />
            <div className="form-search-box" style={{ background:'#fff',padding:10, }}>
                <Form layout="inline">
                    <FormItem>
                        <Button type="primary" onClick={this.showTillerCreateModel}>增加配置</Button>
        				<TillerCreateForm
        				  wrappedComponentRef={this.saveTillerCreateFormRef}
        				  visible={this.state.TillerCreateVisible}
                          confirmLoading={this.state.TillerCreateConfirmLoading}
        				  onCancel={this.handleTillerCreateCancel}
        				  onCreate={this.handleTillerCreate}
        				/>
                        <TillerUpdateForm
                          wrappedComponentRef={this.saveTillerUpdateFormRef}
                          visible={this.state.TillerUpdateVisible}
                          confirmLoading={this.state.TillerUpdateConfirmLoading}
                          onCancel={this.handleTillerUpdateCancel}
                          onCreate={() => this.handleTillerUpdate(this.state.updateRecord.id)}
                        />  
                    </FormItem>
                    <div style={{ float:'right'}}>
                    <FormItem style={{marginRight: 0}}>
                        <Button icon="reload" onClick={this.handleTillerQuery}>刷新</Button>
                    </FormItem>
                    </div>
                </Form>
            </div>

            <div style={{ background:'#fff' }}>
                <Table className="table-margin"  bordered loading={this.props.loading} rowKey={record => record.id} columns={this.columns} dataSource={this.props.tillerConfigList} />
            </div>
        </Content>
      </Layout>
    );
  }
}


const K8sTillerManage = Form.create()(K8sTillerForm);
export default connect(
  state => state.k8sTiller,
  { getK8sTillerList, clearTillerData})(K8sTillerManage);
