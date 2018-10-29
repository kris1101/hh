/*
#=========================================================
# 作者：韩望、秦海荣
# 时间：2018-10-29
# 功能： rdb 公共组件
# 版本: v 0.0.0.1.base
# 公司：中化能源互联科技组
# 更新：无
# 备注：无
#=========================================================
*/
export function uploadStatus(uploadstatus){
      if (uploadstatus === 0){
          return '上传成功'
      }else{
          return '上传失败'
      }
}

export function instanceRunStatus(statuscode){
    const status_choices = ['等待创建','初始化中','启动中','运行中','关机中','已关机','重启中','暂停','挂起','未知']
    return status_choices[statuscode];
}
