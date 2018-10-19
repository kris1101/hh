/**
 * Created by hao.cheng on 2017/4/22.
 */
import React from 'react';
import { Breadcrumb } from 'antd';

class BreadcrumbCustom extends React.Component {

    render() {
        const first = <Breadcrumb.Item>{this.props.first}</Breadcrumb.Item> || '';
        const second = <Breadcrumb.Item>{this.props.second}</Breadcrumb.Item> || '';
        const third = <Breadcrumb.Item>{this.props.third}</Breadcrumb.Item> || '';
        return (
            <span style={{display: 'inline-block'}}>
                <Breadcrumb style={{ margin: '12px 0' }}>
                    {first}
                    {second}
                    {third}
                </Breadcrumb>
            </span>
        )
    }
}

export default BreadcrumbCustom;
