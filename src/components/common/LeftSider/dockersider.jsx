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
            <Menu.Item key="sub1"><Link to="/config/device"><i className="dasktop"></i>概述</Link></Menu.Item>
            <Menu.Item key="sub2"><Link to="/config/area"><i className="docker_app"></i>应用</Link></Menu.Item>
            <Menu.Item key="/docker/server"><Link to="/docker/server"><i className="docker_server"></i>服务</Link></Menu.Item>
            <Menu.Item key="sub4"><Link to="/config/area"><i className="docker_docker"></i>容器</Link></Menu.Item>
            <Menu.Item key="sub5"><Link to="/config/area"><i className="docker_house"></i>镜像仓库</Link></Menu.Item>
            <Menu.Item key="sub6"><Link to="/config/area"><i className="docker_ci"></i>CI/CD</Link></Menu.Item>

        </Menu>
      </div>
    );
  }


}

/*export default withRouter(connect((state) => {
    return { ...state };
})(LeftSider));*/
export default withRouter(DockerSider);
