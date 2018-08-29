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
       let current = location.pathname;
      let openKey = [];
      this.setState({current: current,openKeys: openKey});

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
            <Menu.Item key="sub1"><Link to="/config/device"><Icon type="desktop" />概述</Link></Menu.Item>
            <Menu.Item key="sub2"><Link to="/config/area"><Icon type="wallet" />应用</Link></Menu.Item>
            <Menu.Item key="/docker/server"><Link to="/docker/server"><Icon type="customer-service" />服务</Link></Menu.Item>
            <Menu.Item key="sub4"><Link to="/config/area"><Icon type="link" />容器</Link></Menu.Item>
            <Menu.Item key="sub5"><Link to="/config/area"><Icon type="codepen" />镜像仓库</Link></Menu.Item>
            <Menu.Item key="sub6"><Link to="/config/area"><Icon type="dropbox" />CI/CD</Link></Menu.Item>

        </Menu>
      </div>
    );
  }


}

/*export default withRouter(connect((state) => {
    return { ...state };
})(LeftSider));*/
export default withRouter(DockerSider);
