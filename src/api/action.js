/**
 * 对后台请求的地址的封装，URL格式如下：
 * 模块名_实体名_操作
 */
export default {
  'SERVER': 'http://localhost:8080/LcccSSM', //服务器
  'SYSTEM_GETSTORAGE': '/lccc/lcccStorageAction_getStorage',//产品库存
	
	'LCCCSSM_ADDUSER': '/addUser',//用户注册
	'LCCCSSM_YZM': '/YZM',//手机短信
	'LCCCSSM_SELECTNAMEJS': '/selectNameJS',//根据用户名查询用户信息 JSON格式
	'LCCCSSM_SELECTNAME': '/selectName',//根据用户名查询用户信息 对象格式
	'LCCCSSM_SELECTPHONEJS': '/selectPhoneJS',//用户注册验证手机是否已注册接口
	'LCCCSSM_SELECTPHONE': '/selectPhone',//用户使用手机登录接口
	'LCCCSSM_SELECTNAMEPASS': '/selectNamePass',//用户登录，账号密码登录接口

   'getFullPath': k => { //获得请求的完整地址，用于mockjs测试时使用
    return this.SERVER + this[k];
  }
}
