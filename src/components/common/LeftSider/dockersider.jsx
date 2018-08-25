import React, {Component}from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { Menu } from 'antd';
import FontAwesome  from 'react-fontawesome';
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
          <Menu.Item key="paasdashboard"><Link to="/paas/dashboard"><FontAwesome name='tachometer'  className="fonticonstyle"/><span>总览</span></Link></Menu.Item>
          <Menu.Item key="paasapplication"><Link to="/paas/application"><FontAwesome name='archive' className="fonticonstyle"/><span>应用</span></Link></Menu.Item>
          <Menu.Item key="paasservice"><Link to="/paas/service"><FontAwesome name='server' className="fonticonstyle"/><span>服务</span></Link></Menu.Item>
          <Menu.Item key="paascontainer"><Link to="/paas/container"><FontAwesome name='snowflake-o' className="fonticonstyle"/><span>容器</span></Link></Menu.Item>
            <SubMenu
               key="dockerregistry"
               title={<span><FontAwesome name='database' className="fonticonstyle"/><span>镜像仓库</span></span>}
            >
              <Menu.Item key="paasregistryproject"><Link to="/paas/registryproject"><span>项目</span></Link></Menu.Item>
              <Menu.Item key="paasregistrylog"><Link to="/paas/paasregistrylog"><span>日志</span></Link></Menu.Item>
                <SubMenu
                   key="registrysystem"
                   title="系统管理"
                >
                  <Menu.Item key="paasregistryuser"><Link to="/paas/paasregistryuser"><span>用户管理</span></Link></Menu.Item>
                  <Menu.Item key="paasregistryconfig"><Link to="/paas/paasregistryconfig"><span>配置管理</span></Link></Menu.Item>
                </SubMenu> 
            </SubMenu> 
            <Menu.Item key="cicd"><Link to="/paas/cicd"><FontAwesome name='random' className="fonticonstyle"/><span>CI/CD</span></Link></Menu.Item>

        </Menu>
      </div>
    );
  }


}

/*export default withRouter(connect((state) => {
    return { ...state };
})(LeftSider));*/
export default withRouter(DockerSider);
