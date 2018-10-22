import React, { Component } from 'react';
import Dockersider from '../../../../../../components/common/LeftSider/dockersider';
import { connect  } from 'react-redux';
import {Redirect} from 'react-router-dom'
import { Tabs, Icon, Layout} from 'antd';
import BreadcrumbCustom from '../../../../../BreadcrumbCustom';
import {getQueryString} from '../../../../utils/searchparse_helper'
import './detailscommon.less';
import HarborRepositoriesTagsForm from '../tags/tags'
import { getRepositoriesTagsList } from '../../../../../../containers/Paas/harbor/projectdetails.redux';

const { Sider, Content } = Layout;
const TabPane = Tabs.TabPane;

class repositoriesDetailsCommon extends Component {
    constructor(props) {
        super(props);
        this.repo_name = getQueryString(this.props.location.search).repo_name;
    }
    state = {
    }
    componentDidMount () {
    }
    handleChangeTab = (activekey) => {

      switch (activekey){
          case "tags":
              if(this.tagsform){
                 this.tagsform.handleReset()
              }
              this.props.getRepositoriesTagsList({repo_name: this.repo_name});
              break;
          default:
              console.log("unkown activekey");
      }

    }

  render() {
    return this.repo_name ? (
      <Layout className="config">
        <Sider>
            <Dockersider/>
        </Sider>
        <Content style={{ padding: 0, margin:10, marginBottom: 0, minHeight: window.innerHeight-84 }}>
            <BreadcrumbCustom first="镜像仓库" second="项目" third={`镜像[${this.repo_name}]`}/>
            <div style={{ background:'#fff', padding:10 }}>
            <Tabs defaultActiveKey="repositories" onChange={this.handleChangeTab}>
              <TabPane tab={<span><Icon type="appstore" theme="outlined"/>镜像</span>} key="repositories">
                <HarborRepositoriesTagsForm  wrappedComponentRef={(form) => this.tagsform = form} repo_name={getQueryString(this.props.location.search).repo_name} />
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
  { getRepositoriesTagsList })(repositoriesDetailsCommon);
