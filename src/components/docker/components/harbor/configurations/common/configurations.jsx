import React, { Component } from 'react';
import Dockersider from '../../../../../../components/common/LeftSider/dockersider';
import { connect  } from 'react-redux';
import { Tabs, Icon, Layout} from 'antd';
import BreadcrumbCustom from '../../../../../BreadcrumbCustom';
import './configurations.less';
import HarborPermissionForm from '../permission/permission'
import HarborSysconfigForm from '../sysconfig/sysconfig'
import { getHarborConfigurations  } from '../../../../../../containers/Paas/harbor/configurations.redux'

const { Sider, Content } = Layout;
const TabPane = Tabs.TabPane;

class harborConfigurationsCommon extends Component {

    componentDidMount () {
      this.props.getHarborConfigurations();
    }
    handleChangeTab = (activekey) => {
      this.props.getHarborConfigurations();
    }

  render() {
    return (
      <Layout className="config">
        <Sider>
            <Dockersider/>
        </Sider>
        <Content style={{ padding: 0, margin:10, marginBottom: 0, minHeight: window.innerHeight-84 }}>
            <BreadcrumbCustom first="镜像仓库" second="配置管理" />
            <div style={{ background:'#fff', padding:10 }}>
            <Tabs defaultActiveKey="repositories" onChange={this.handleChangeTab}>
              <TabPane tab={<span><Icon type="select" theme="outlined"/>权限配置</span>} key="permission">
                <HarborPermissionForm />
              </TabPane>
              <TabPane tab={<span><Icon type="setting" theme="outlined" />系统设置</span>} key="setting">
                <HarborSysconfigForm />
              </TabPane>
            </Tabs>
            </div>
        </Content>
      </Layout>
      )
  }
}


export default connect(
  "",
  { getHarborConfigurations })(harborConfigurationsCommon);
