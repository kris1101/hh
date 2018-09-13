import React, {Component}from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { Menu,Icon } from 'antd';
import './index.less';


const SubMenu = Menu.SubMenu;

class DockerSider extends Component{

  rootSubmenuKeys = ['dockerregistry'];

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
      if (current == "paasregistrylog" || current == "paasregistryproject" || current == "paasregistryprojectdetails" || current == "paasregistryprojectrepositories"){
            openKeys = ["dockerregistry"]
      }else if(current == "paasregistryuser" || current == "paasregistryconfig"){
            openKeys = ["dockerregistry", "registrysystem"]
      }
    if (current == "paasregistryprojectdetails" || current == "paasregistryprojectrepositories"){
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
               key="/paas/workload"
               title={<span><Icon type="bank" /><span>平台管理</span></span>}
            >
                <SubMenu
                   key="paasworkload"
                   title="Workload"
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
               title={<span><Icon type="codepen" /><span>镜像仓库</span></span>}
            >
              <Menu.Item key="paasregistryproject"><Link to="/paas/registryproject"><span>项目</span></Link></Menu.Item>
              <Menu.Item key="paasregistrylog"><Link to="/paas/registrylog"><span>日志</span></Link></Menu.Item>
                <SubMenu
                   key="registrysystem"
                   title="系统管理"
                >
                  <Menu.Item key="paasregistryuser"><Link to="/paas/registryuser"><span>用户管理</span></Link></Menu.Item>
                  <Menu.Item key="paasregistryconfig"><Link to="/paas/registryconfig"><span>配置管理</span></Link></Menu.Item>
                </SubMenu>
            </SubMenu>
            <Menu.Item key="paascicd"><Link to="/paas/cicd"><Icon type="dropbox" />CI/CD</Link></Menu.Item>

        </Menu>
      </div>
    );
  }


}

/*export default withRouter(connect((state) => {
    return { ...state };
})(LeftSider));*/
export default withRouter(DockerSider);
