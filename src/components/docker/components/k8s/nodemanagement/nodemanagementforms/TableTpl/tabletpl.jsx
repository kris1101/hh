import React from 'react';
import { message, Icon, Modal  } from 'antd';
import { deleteAjax } from '../../../../../utils/axios'

const confirm = Modal.confirm;

function deletelabel(record, _that){

    deleteAjax('/k8s/node/label/', 'name=' + _that.state.nodename + '&key=' + record.key, function(res){
        if(res.data.code === 0){
            message.success("删除成功") 
            _that.handlegetupdate();
        }else{
            message.error(res.data.msg) 
        }
    }, {"Cluster-Id": _that.state.clusterid})
}

function shwodeletelabel(record, _that){
    confirm({
        title: `确定节点(${_that.state.nodename})的标签(${record.key})吗`,
        okText: '是',
        okType: 'danger',
        cancelText: '否',
        onOk() {
           deletelabel(record, _that);
        },
      });
    
}

export function getNodeLabel() {
    return [{
        title: 'key',
        dataIndex: 'key'
    }, {
        title: 'value',
        dataIndex: 'value'
    },{
        title: '操作',
        render: (data, record, index) => {
            return (
            <div>
              <Icon type="delete" style={{cursor: "pointer"}} onClick={() => (shwodeletelabel(record, this)) }/> 
            </div>
        )}
    }];
}
