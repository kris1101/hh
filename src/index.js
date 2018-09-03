import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

import store from './redux/index';
// console.log(store.getState())

ReactDOM.render(<Provider store={store}><LocaleProvider locale={zh_CN}><App /></LocaleProvider></Provider>, document.getElementById('root'));
