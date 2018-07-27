import React,{Component} from 'react';
import './index.less';
import { Layout, Menu, Icon, Row, Col, Card } from 'antd';
import SiderList from './SiderList/siderlist';
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';

class Home extends React.Component {
	state = {
        tabList:[
            {
                id:1,
				key:'tab1',
                tab:'滞留人员'
            },{
                id:2,
                key:'tab2',
                tab:'进入人数'
            },{
                id:3,
                key:'tab3',
                tab:'离开人数'
            }
        ]
	}
	render() {
		return (
			<div className="home">
				<Row>
					<Col span={6}>
                        <div className="home-left">
							<div className="title">
								<span className="listIcon"></span>
								<span>设备列表</span>
							</div>
							<div className="device-list">
								<SiderList />
							</div>
						</div>
					</Col>
                    <Col span={12}>
                        <div className="home-content">
							<div className="totalCount">
								<Row>
									<Col span={8}>
										滞留人员：<span style={{color:'#FF3E42',fontWeight:'bold'}}> 276 </span>人
									</Col>
                                    <Col span={8}>
                                        进入人数：<span style={{color:'#E8D63C',fontWeight:'bold'}}> 276 </span>次
									</Col>
                                    <Col span={8}>
                                        离开人数：<span style={{color:'#3AFF6F',fontWeight:'bold'}}> 276 </span>次
									</Col>
								</Row>
							</div>
							<div className="videoContent">
                                <div className="grid_wrapper">
                                    <ul className="grid">
                                        <li>
                                            <Video autoPlay loop muted
                                                   controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                                                   poster="http://sourceposter.jpg"
                                                   onCanPlayThrough={() => {
                                                       // Do stuff
                                                   }}>
                                                <source src="http://sourcefile.webm" type="video/webm" />
                                                <track label="English" kind="subtitles" srcLang="en" src="http://source.vtt" default />
                                            </Video>
										</li>
                                        <li><a href="#" title="2"></a></li>
                                        <li><a href="#" title="3"></a></li>
                                        <li><a href="#" title="4"></a></li>
                                        <li><a href="#" title="5"></a></li>
                                        <li><a href="#" title="6"></a></li>
                                        <li><a href="#" title="7"></a></li>
                                        <li><a href="#" title="8"></a></li>
                                        <li><a href="#" title="9"></a></li>
                                    </ul>
                                </div>
							</div>
							<div className="chartWrap">
                                <div className="title">
                                    <span className="listIcon"></span>
                                    <span>进出情况</span>
									<div id="line-chart"></div>
                                </div>
								<div className="bottomStyle"></div>
							</div>
						</div>
                    </Col>
                    <Col span={6}>
                        <div className="home-right">
                            <div className="title">
                                <span className="listIcon"></span>
                                <span>人数统计</span>
                            </div>
							<div className="tabChart">
								<ul className="tablist clearfix" style={{marginBottom:0}}>
									{
										this.state.tabList.map((item) =>
											<li key={item.id} className={item.key}>{item.tab}</li>
										)
									}
								</ul>
								<div id="chart1" style={{minHeight:280}}></div>
								<div id="chart2"></div>
								<div id="chart3"></div>
							</div>

							<div className="chartWrap" style={{marginTop:10}}>
                                <div className="title2">
                                    <span className="listIcon"></span>
                                    <span>入侵统计</span>
                                </div>
								<div className="bottomStyle"></div>
							</div>
						</div>
                    </Col>
                </Row>
			</div>
		);
	}
}

export default Home;
