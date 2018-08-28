import React, { Component } from 'react';
import Dockersider from '../../../common/LeftSider/dockersider';
import { Layout } from 'antd';

const { Sider, Content } = Layout;

class NotFoundPage extends Component {

  render() {

    return (
      <Layout className="config">
        <Sider>
            <Dockersider/>
        </Sider>
        <Content style={{ padding: 0, margin:10, marginBottom: 0, minHeight: window.innerHeight-84 }}>
          404页面
        </Content>
      </Layout>
    );
  }

}

export default NotFoundPage 
