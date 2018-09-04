import React, { Component } from 'react';
import Dockersider from '../../../../../../common/LeftSider/dockersider';
import {Redirect} from 'react-router-dom'
import { Tabs, Icon, message, Layout} from 'antd';
import BreadcrumbCustom from '../../../../../../BreadcrumbCustom';
import {getQueryString} from '../../../../../utils/searchparse_helper'
import './detailscommon.less';
import HarborRepositoriesForm from '../repositories/repositories'

const { Sider, Content } = Layout;
const TabPane = Tabs.TabPane;

class projectDetailsCommon extends Component {
    constructor(props) {
        super(props);
    }
    state = {
    }

  render() {
    return getQueryString(this.props.location.search).project_id ? (
      <Layout className="config">
        <Sider>
            <Dockersider/>
        </Sider>
        <Content style={{ padding: 0, margin:10, marginBottom: 0, minHeight: window.innerHeight-84 }}>
            <BreadcrumbCustom first="镜像仓库" second="项目" />
            <div style={{ background:'#fff', padding:10 }}>
            <Tabs defaultActiveKey="repositories">
              <TabPane tab={<span><Icon type="appstore" theme="outlined"/>镜像仓库</span>} key="repositories">
                <HarborRepositoriesForm  project_id={getQueryString(this.props.location.search).project_id} />
              </TabPane>
              <TabPane tab={<span><Icon type="user" theme="outlined" />成员</span>} key="members">
                Tab 2
              </TabPane>
              <TabPane tab={<span><Icon type="file-text" theme="outlined" />日志</span>} key="logging">
                Tab 2
              </TabPane>
              <TabPane tab={<span><Icon type="setting" theme="outlined" />配置管理</span>} key="settings">
                Tab 2
              </TabPane>
            </Tabs>
            </div>
        </Content>
      </Layout>
      ): <Redirect to="/paas/registryproject" /> 
  }
}


export default projectDetailsCommon 
