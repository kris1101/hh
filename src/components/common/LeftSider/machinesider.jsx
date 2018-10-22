import React ,{Component}from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { Menu,Icon } from 'antd';
import './index.less';

class MachineSider extends Component{
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
            <Menu.Item key="sub1"><Link to="/config/device"><Icon type="desktop" />概述</Link></Menu.Item>
            <Menu.Item key="/machine/machine"><Link to="/machine/machine"><Icon type="database" />机器列表</Link></Menu.Item>
            <Menu.Item key="sub3"><Link to="/config/area"><Icon type="switcher" />机柜列表</Link></Menu.Item>
        </Menu>
      </div>
    );
  }


}

/*export default withRouter(connect((state) => {
    return { ...state };
})(LeftSider));*/
export default withRouter(MachineSider);
