/**
 * 对后台请求的地址的封装，URL格式如下：
 * 模块名_实体名_操作
 */
export default {
  'SERVER': 'http://localhost:8080/LcccSSM', //服务器
  'SYSTEM_GETSTORAGE': '/lccc/lcccStorageAction_getStorage',//产品库存
	
	'LCCCSSM_ADDUSER': '/addUser',//用户注册
	'LCCCSSM_YZM': '/YZM',//手机短信
	

   'getFullPath': k => { //获得请求的完整地址，用于mockjs测试时使用
    return this.SERVER + this[k];
  }
}
