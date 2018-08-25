import React ,{Component}from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { Menu } from 'antd';
import FontAwesome  from 'react-fontawesome';
import './index.less';


const SubMenu = Menu.SubMenu;

class DockerSider extends Component{
    // submenu keys of first level
  rootSubmenuKeys = ['sub1', 'sub2', 'sub3', '4', '5', '6'];
  state = {
    openKeys: [],
    current: 'sub1'
  };
  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }
  handleClick = (e) => {
      console.log(e.key);
      this.setState({
          current: e.key
      })
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
          onOpenChange={this.onOpenChange}
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          style={{ width: 200 }}
        >
            <Menu.Item key="dashboard"><Link to="/config/device"><FontAwesome name='tachometer'  className="fonticonstyle"/>总览</Link></Menu.Item>
            <Menu.Item key="application"><Link to="/config/area"><FontAwesome name='crosshairs' className="fonticonstyle"/>应用</Link></Menu.Item>
            <Menu.Item key="service"><Link to="/docker/server"><FontAwesome name='crosshairs' className="fonticonstyle"/>服务</Link></Menu.Item>
            <Menu.Item key="sub1"><Link to="/config/area"><FontAwesome name='crosshairs' className="fonticonstyle"/>容器</Link></Menu.Item>
            <Menu.Item key="registry"><Link to="/config/area"><FontAwesome name='database' className="fonticonstyle"/>镜像仓库</Link></Menu.Item>
            <Menu.Item key="cicd"><Link to="/config/area"><FontAwesome name='random' className="fonticonstyle"/>CI/CD</Link></Menu.Item>

        </Menu>
      </div>
    );
  }


}

/*export default withRouter(connect((state) => {
    return { ...state };
})(LeftSider));*/
export default withRouter(DockerSider);
