import React, { Component } from 'react';
import Dockersider from '../../../../../../common/LeftSider/dockersider';
import { connect  } from 'react-redux';
import {Redirect} from 'react-router-dom'
import { Tabs, Icon, message, Layout} from 'antd';
import BreadcrumbCustom from '../../../../../../BreadcrumbCustom';
import {getQueryString} from '../../../../../utils/searchparse_helper'
import './detailscommon.less';
import HarborRepositoriesForm from '../repositories/repositories'
import HarborPorjectMemberForm from '../members/members'
import HarborPorjectLogsForm from '../logs/logs'
import ProjectConfigForm from '../configs/projectconfig'
import { getProjectMemberList, getRepositoriesList, getProjectLogsList  } from '../../../../../../../containers/Paas/harbor/projectdetails.redux';

const { Sider, Content } = Layout;
const TabPane = Tabs.TabPane;

class projectDetailsCommon extends Component {
    constructor(props) {
        super(props);
    }
    state = {
    }

    handleChangeTab = (activekey) => {

      switch (activekey){
          case "members":
              this.memberform ? this.memberform.handleReset() : null;
              this.props.getProjectMemberList({project_id: getQueryString(this.props.location.search).project_id});
              break;
          case "logging":
              this.logsform ? this.logsform.handleReset() : null;
              this.props.getProjectLogsList({project_id: getQueryString(this.props.location.search).project_id});
              break;
          case "repositories":
              this.repositoriesform.handleReset();
              this.props.getRepositoriesList({project_id: getQueryString(this.props.location.search).project_id});
              break;
          default:
              console.log("unkown activekey");
      }

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
            <Tabs defaultActiveKey="repositories" onChange={this.handleChangeTab}>
              <TabPane tab={<span><Icon type="appstore" theme="outlined"/>镜像仓库</span>} key="repositories">
                <HarborRepositoriesForm  wrappedComponentRef={(form) => this.repositoriesform = form} project_id={getQueryString(this.props.location.search).project_id} />
              </TabPane>
              <TabPane tab={<span><Icon type="user" theme="outlined" />成员</span>} key="members">
                <HarborPorjectMemberForm wrappedComponentRef={(form) => this.memberform = form} project_id={getQueryString(this.props.location.search).project_id}/>
              </TabPane>
              <TabPane tab={<span><Icon type="file-text" theme="outlined" />日志</span>} key="logging">
                <HarborPorjectLogsForm wrappedComponentRef={(form) => this.logsform = form} project_id={getQueryString(this.props.location.search).project_id}/>
              </TabPane>
              <TabPane tab={<span><Icon type="setting" theme="outlined" />配置管理</span>} key="settings">
                <ProjectConfigForm wrappedComponentRef={(form) => this.configform = form} project_id={getQueryString(this.props.location.search).project_id}/>
              </TabPane>
            </Tabs>
            </div>
        </Content>
      </Layout>
      ): <Redirect to="/paas/registryproject" /> 
  }
}


export default connect(
  state => state.harborProjectDetails,
  { getProjectMemberList, getRepositoriesList, getProjectLogsList })(projectDetailsCommon);
