import React, {Component}from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { Menu } from 'antd';
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
      this.setState({ current });

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
            <Menu.Item key="paasdashboard"><Link to="/paas/dashboard"><i className="dasktop"></i>概述</Link></Menu.Item>
            <Menu.Item key="paasapplication"><Link to="/paas/application"><i className="docker_app"></i>应用</Link></Menu.Item>
            <Menu.Item key="/paas/servce"><Link to="/paas/service"><i className="docker_server"></i>服务</Link></Menu.Item>
            <Menu.Item key="paascontainer"><Link to="/paas/container"><i className="docker_docker"></i>容器</Link></Menu.Item>
            <SubMenu
               key="dockerregistry"
               title={<span><i className="docker_house"></i><span>镜像仓库</span></span>}
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
            <Menu.Item key="paascicd"><Link to="/paas/cicd"><i className="docker_ci"></i>CI/CD</Link></Menu.Item>

        </Menu>
      </div>
    );
  }


}

/*export default withRouter(connect((state) => {
    return { ...state };
})(LeftSider));*/
export default withRouter(DockerSider);
