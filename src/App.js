import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Routes from './router';

import Head from './components/common/Head';
import { Layout } from 'antd';

import "./App.css";
const { Header, Content } = Layout;

class App extends Component {
    render() {
        const routers = Routes.map((item, index) => {
            return item.exact ? <Route key={index} exact path={item.path} component={item.component} /> : <Route key={index} path={item.path} component={item.component} />
        })
        console.log(routers)
        return (
            <Router>
                <div className="App">
                <Layout>
                    <Header className="indexHeader">
                        <Head />
                    </Header>
                    <Content>

                        { routers }
                    </Content>
                </Layout>
                </div>
            </Router>
        );
    }
}

export default App;
