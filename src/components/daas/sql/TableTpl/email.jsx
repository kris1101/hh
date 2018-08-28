import React, { Component } from 'react';
import chart from '../../../../static/icons/area_chart.png'

export function getemails() {
    return [{
        title: '组名',
        dataIndex: 'name',
    }, {
        title: '发送时间',
        dataIndex: 'date'
    }, {
        title: '描述',
        dataIndex: 'ps',
    }];
}