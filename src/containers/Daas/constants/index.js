/*
#=========================================================
# 作者：韩望、秦海荣
# 时间：2018-09-17
# 功能：reducer action 动作常量
# 版本: v 0.0.0.1.base
# 公司：中化能源互联科技组
# 更新：无
# 备注：所有动作常量共用此文件
#=========================================================
*/


//后台地址
export const BASE_URL = "http://127.0.0.1:8000";

//慢查询用户操作
export const FETCHSLOWQUERYUSERS = "FETCHSLOWQUERYUSERS"; //获取用户
export const SLOWQUERYUSERCREATE = "SLOWQUERYUSERCREATE"; //用户创建
export const SLOWQUERYUSERDETAIL = "SLOWQUERYUSERDETAIL"; //用户详情
export const SLOWQUERYUSERUPDATE = "SLOWQUERYUSERUPDATE"; //用户更新

//慢查询实例操作
export const SLOWQUERYINSTATNCESFETCH = "SLOWQUERYINSTATNCESFETCH"; //实例获取
export const SLOWQUERYINSTANCEUPDATE = "SLOWQUERYINSTANCEUPDATE"; //实例更新
export const SLOWQUERYINSTANCEDELETE = "SLOWQUERYINSTANCEDELETE"; //实例删除

//慢查询邮件发送操作
export const SLOWQEURYEMAILFETCH = "SLOWQEURYEMAILFETCH"; //邮件获取

//慢查询用户组操作
export const SLOWQUERYGROUPFETCH = "SLOWQUERYGROUPFETCH"; //组获取
export const SLOWQUERYGROUPCREATE = "SLOWQUERYGROUPCREATE"; //组创建

//慢查询组与用户关系操作
export const SLOWQUERYGROUPUSERRELATIONSHIPUPDATE = 'SLOWQUERYGROUPUSERRELATIONSHIPUPDATE'; //组与用户关系列表更新
export const SLOWQUERYGROUPUSERRELATIONSHIPFETCH = 'SLOWQUERYGROUPUSERRELATIONSHIPFETCH'; //读取目标数据到store

//慢查询实例与组关系操作
export const SLOWQUERYINSTANCEGROUPRELATIONSHIPUPDATE = 'SLOWQUERYINSTANCEGROUPRELATIONSHIPUPDATE'; //实例与组关系列表更新
export const SLOWQUERYINSTANCEGROUPRELATIONSHIPFETCH = 'SLOWQUERYINSTANCEGROUPRELATIONSHIPFETCH'; //读取目标数据存到store

//关系型数据库实例备份信息获取操作
export const RDBINSTANCEBACKUPFETCH = 'RDBINSTANCEBACKUPFETCH'
