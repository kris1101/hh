import React, { Component } from 'react';
import Dockersider from '../../../common/LeftSider/dockersider';
import { Layout, Form, Alert, notification, message } from 'antd';
import Iframe from 'react-iframe'
import BreadcrumbCustom from '../../../BreadcrumbCustom';
import K8sClusterSelectForm from '../common/k8sclusterselect'
import { getAjax } from '../../utils/axios' 
import { randomchoice } from '../../utils/tools_helper' 

const { Sider, Content } = Layout;

class MonitorCenterForm extends Component {
    state = {
        grafana_url: "", 
    }

    saveclusterselectFormRef = (formRef) => {
       this.ClusterSelectFormRef = formRef;
    }

    handleClusterSelect = (value) => { 
        let _that = this;
        getAjax("/monitorcenter/servicelist/", {}, function(res){
          if(res.data.code === 0){
                    if(res.data.data.length){
                        _that.setState({grafana_url: `http://${randomchoice(res.data.data).host}:${randomchoice(res.data.data).port}`});
                    }else{
                        message.error("未发现相关地址");
                    }
          }else{
            notification.error(
              {
                message: "请求监控地址出错",
                description: res.data.msg 
              }
            )

          }
        }, {"Cluster-Id": value})
    }

  render() {
    return (
      <Layout className="config">
        <Sider>
            <Dockersider/>
        </Sider>
        <Content style={{ padding: 0, margin:10, marginBottom: 0, minHeight: window.innerHeight-84 }}>
            <BreadcrumbCustom first="Paas" second="监控中心" />
            <K8sClusterSelectForm 
              handleSelctEvent={this.handleClusterSelect}
              wrappedComponentRef={this.saveclusterselectFormRef}
            />
            <div style={{ background:'#fff' }}>
        {
          !this.state.grafana_url ? (
            <Alert
              message="请选择集群查看"
              type="warning"
              showIcon
            />
          ) : null
        }
                <Iframe url={this.state.grafana_url}
                        display="block"
                        styles={{minHeight: 1700}}
                        id="monitorcenterifame"
                        scrolling="no"
                        position="relative"/>
            </div>
        </Content>
      </Layout>
    );
  }
}


const MonitorCenterManage = Form.create()(MonitorCenterForm);
export default MonitorCenterManage 
