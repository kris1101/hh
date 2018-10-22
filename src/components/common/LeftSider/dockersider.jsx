import React, {Component}from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { Menu,Icon } from 'antd';
import './index.less';


const SubMenu = Menu.SubMenu;

class DockerSider extends Component{

  rootSubmenuKeys = ['dockerregistry', 'paashelmmanage', 'paasworkload', 'paascicd' ];

  constructor(props){
      super(props);
      this.state = {current: 'dashboard', openKeys: []};
  }

  handleClick = (e) => {
      console.log(e.key);
      this.setState({
          current: e.key
      })
  }

  handleOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys }); 
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [], 
      }); 
    }   
  }

  componentWillMount () {
      const { location } = this.props;
      let current = location.pathname.replace(/\//g,'');
      let openKeys = []
      if (current === "paasregistrylog" || current === "paasregistryproject" || current === "paasregistryprojectdetails" || current === "paasregistryprojectrepositories"){
            openKeys = ["dockerregistry"]
      }else if(current === "paasregistryuser" || current === "paasregistryconfig"){
            openKeys = ["dockerregistry", "registrysystem"]
      }

      if (current === "paascodebase" || current === "paascodeimagebuild" || current === "paascodebuildhistory"){
            openKeys = ["paascicd", "ci"]
      }else if(current === "paaspipline" || current === "paaspiplinehistory"){
            openKeys = ["paascicd", "pipline"]
      }

      if (current === "paastillerconfig" || current === "paashelmrepomanage" || current === "paashelmchartmanage" || current === "paashelmreleasemanage" || current === "paashelmtaskstate"){
            openKeys = ["paashelmmanage"]
      }

    if (current === "paasregistryprojectdetails" || current === "paasregistryprojectrepositories"){
          this.setState({ current: "paasregistryproject" , openKeys});
      }else{
          this.setState({ current , openKeys});
      }

  }

  render() {
    return (
      <div>
        <Menu
          theme="dark"
          mode="inline"
          openKeys={this.state.openKeys}
          onClick={this.handleClick}
          onOpenChange={this.handleOpenChange}
          selectedKeys={[this.state.current]}
          style={{ width: 200 }}
        >
            <Menu.Item key="paasdashboard"><Link to="/paas/dashboard"><Icon type="desktop" />概述</Link></Menu.Item>
            <Menu.Item key="paasapplication"><Link to="/paas/application"><Icon type="wallet" />应用</Link></Menu.Item>
            <Menu.Item key="paasservce"><Link to="/paas/service"><Icon type="customer-service" />服务</Link></Menu.Item>
            <Menu.Item key="paascontainer"><Link to="/paas/container"><Icon type="link" />容器</Link></Menu.Item>
            <Menu.Item key="paasclustersettings"><Link to="/paas/clustersettings"><Icon type="folder-add" />集群配置</Link></Menu.Item>
            <SubMenu
               key="paashelmmanage"
               title={<span><Icon type="rocket" /><span>helm管理</span></span>}
            >
                <Menu.Item key="paastillerconfig"><Link to="/paas/tillerconfig">tiller配置</Link></Menu.Item>
                <Menu.Item key="paashelmrepomanage"><Link to="/paas/helmrepomanage">repo管理</Link></Menu.Item>
                <Menu.Item key="paashelmchartmanage"><Link to="/paas/helmchartmanage">chart管理</Link></Menu.Item>
                <Menu.Item key="paashelmreleasemanage"><Link to="/paas/helmreleasemanage">release管理</Link></Menu.Item>
                <Menu.Item key="paashelmtaskstate"><Link to="/paas/helmtaskstate">helm任务状态</Link></Menu.Item>
            </SubMenu>
            <SubMenu
               key="paasworkload"
               title={<span><Icon type="bank" /><span>平台管理</span></span>}
            >
                <SubMenu
                   key="paasworkload"
                   title="workload"
                >
                  <Menu.Item key="paasworkloadpods"><Link to="/paas/workload/podlist"><span>Pods</span></Link></Menu.Item>
                  <Menu.Item key="paasworkloaddeployments"><Link to="/paas/workload/deploylist"><span>Deployments</span></Link></Menu.Item>
                  <Menu.Item key="paasworkloadreplication"><Link to="/paas/workload/replicationlist"><span>Replicationcontrollers</span></Link></Menu.Item>
                  <Menu.Item key="paasworkloadreplica"><Link to="/paas/workload/replicalist"><span>Replicasets</span></Link></Menu.Item>
                  <Menu.Item key="paasworkloaddaemonsets"><Link to="/paas/workload/daemonsetlist"><span>Daemonsets</span></Link></Menu.Item>
                  <Menu.Item key="paasworkloadcronjobs"><Link to="/paas/workload/cronjoblist"><span>Cronjobs</span></Link></Menu.Item>
                  <Menu.Item key="paasworkloadjobs"><Link to="/paas/workload/joblist"><span>Jobs</span></Link></Menu.Item>
                  <Menu.Item key="paasworkloadstatefulsets"><Link to="/paas/workload/statefullist"><span>Statefulsets</span></Link></Menu.Item>
                </SubMenu>
            </SubMenu>

            <SubMenu
               key="dockerregistry"
               title={<span><Icon type="codepen" /><span>镜像中心</span></span>}
            >
              <Menu.Item key="paasregistryproject"><Link to="/paas/registryproject"><span>项目</span></Link></Menu.Item>
              <Menu.Item key="paasregistrylog"><Link to="/paas/registrylog"><span>日志</span></Link></Menu.Item>
                <SubMenu
                   key="registrysystem"
                   title={<span><Icon type="setting" /><span>系统管理</span></span>}
                >
                  <Menu.Item key="paasregistryuser"><Link to="/paas/registryuser"><span>用户管理</span></Link></Menu.Item>
                  <Menu.Item key="paasregistryconfig"><Link to="/paas/registryconfig"><span>配置管理</span></Link></Menu.Item>
                </SubMenu>
            </SubMenu>
            <SubMenu
               key="paascicd"
               title={<span><Icon type="dropbox" /><span>CI/CD</span></span>}
            >
                <SubMenu
                   key="ci"
                   title={<span><Icon type="tool" /><span>持续集成</span></span>}
                >
                  <Menu.Item key="paascodebase"><Link to="/paas/codebase"><span>代码仓库</span></Link></Menu.Item>
                  <Menu.Item key="paascodeimagebuild"><Link to="/paas/codeimagebuild"><span>构建项目</span></Link></Menu.Item>
                  <Menu.Item key="paascodebuildhistory"><Link to="/paas/codebuildhistory"><span>构建历史</span></Link></Menu.Item>
                </SubMenu>
                <SubMenu
                   key="pipline"
                   title={<span><Icon type="retweet" /><span>流水线</span></span>}
                >
                  <Menu.Item key="paaspipline"><Link to="/paas/pipline"><span>流水线项目</span></Link></Menu.Item>
                  <Menu.Item key="paaspiplinehistory"><Link to="/paas/piplinehistory"><span>流水线历史</span></Link></Menu.Item>
                </SubMenu>
            </SubMenu>

        </Menu>
      </div>
    );
  }


}

/*export default withRouter(connect((state) => {
    return { ...state };
})(LeftSider));*/
export default withRouter(DockerSider);
