import React, { Component } from 'react';
import Dockersider from '../../../../../common/LeftSider/dockersider';
import { message, Layout, Form, Input, Button, Select, Table } from 'antd';
import { connect } from 'react-redux';
import BreadcrumbCustom from '../../../../../../components/BreadcrumbCustom';
import { getTillerConfig } from './TableTpl/tabletpl';
import './tillerconfig.less';
import { getK8sTillerList } from '../../../../../../containers/Paas/k8s/k8stiller.redux'
import { TillerCreateForm } from './tillerconfigforms/tillerconfigcreate'
import { postAjax } from '../../../../utils/axios'
import { putAjax } from '../../../../utils/axios'
import { generateformdata  } from '../../../../utils/tools_helper'

const { Sider, Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;

class K8sTillerForm extends Component {
    constructor(props) {
        super(props);
        this.columns = getTillerConfig.call(this);
    }
    state = {
        TillerCreateVisible: false,
        TillerCreateConfirmLoading: false,
        TillerUpdateVisible: false,
        TillerUpdateConfirmLoading: false,
    }

    componentDidMount () {
        this.props.getK8sTillerList({});
    }

    //重置表单
    handleReset = () => {
        this.props.form.resetFields();
    }

    showTillerCreateModel = () => {
        this.setState({TillerCreateVisible: true}) 
    }

    showTillerUpdateModel = () => {
        this.setState({TillerUpdateVisible: true}) 
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

    handleTillerCreate = () => {
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
                message.success(res.data.data) 
                _that.setState({TillerCreateConfirmLoading: false})
                form.resetFields();
                _that.TillerCreateFormRef.resetfilelist();
                _that.setState({ TillerCreateVisible: false });
                _that.handleTillerQuery();
            }else{
                message.error(res.data.msg) 
                _that.setState({TillerCreateConfirmLoading: false})
            }
        })
      });
    }

    handleTillerUpdate = (tiller_config_id) => {
      const form = this.TillerUpdateFormRef.props.form;
      console.log(form.getFieldsValue())
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        this.setState({TillerUpdateConfirmLoading: true})
        const _that = this;
        values.tiller_config_id = tiller_config_id;
        putAjax('/k8s/tillerconfig/', generateformdata(values), function(res){
            if(res.data.code == 0){
                message.success("更新成功") 
                _that.setState({TillerUpdateConfirmLoading: false})
                form.resetFields();
                _that.setState({ TillerUpdateVisible: false });
                _that.TillerUpdateFormRef.resetfilelist();
                _that.setState({ TillerCreateVisible: false });
                _that.handleTillerQuery();
            }else{
                message.error(res.data.msg) 
                _that.setState({TillerUpdateConfirmLoading: false})
            }
        })
      });
    }

    saveTillerCreateFormRef = (formRef) => {
      this.TillerCreateFormRef = formRef;
    } 

    saveTillerUpdateFormRef = (formRef) => {
      this.TillerUpdateFormRef = formRef;
    } 

    handleTillerQuery = () => {
      this.props.getK8sTillerList();
    }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout className="config">
        <Sider>
            <Dockersider/>
        </Sider>
        <Content style={{ padding: 0, margin:10, marginBottom: 0, minHeight: window.innerHeight-84 }}>
            <BreadcrumbCustom first="镜像仓库" second="Tiller配置" />
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
                    </FormItem>
                    <div style={{ float:'right'}}>
                    <FormItem>
                        <Button type="primary" icon="reload" style={{marginRight: 10}} onClick={this.handleTillerQuery}>刷新</Button>
                    </FormItem>
                    </div>
                </Form>
            </div>

            <div style={{ background:'#fff' }}>
                <Table bordered loading={this.props.loading} rowKey={record => record.id} columns={this.columns} dataSource={this.props.clusterList} />
            </div>
        </Content>
      </Layout>
    );
  }
}


const K8sTillerManage = Form.create()(K8sTillerForm);
export default connect(
  state => state.k8sTiller,
  { getK8sTillerList })(K8sTillerManage);
