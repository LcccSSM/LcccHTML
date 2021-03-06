/**
 * 对后台请求的地址的封装，URL格式如下：
 * 模块名_实体名_操作
 */
export default {
  'SERVER': 'http://localhost:8080/LcccSSM', //服务器

  //字典系列(SysDict)
  'SYSTEM_DICT_BY_DTYPE': '/Dict_bydtype', //根据类型获取字典信息
  'SYSTEM_DICT_LISTALL': '/Dict_listAll', //获取字典全部信息
  'SYSTEM_DICT_BYPAGEBEAN': '/Dict_byPageBean', //获取字典全部信息
  'SYSTEM_DICT_BYTYPEMAXID': '/Dict_ByTypeMAXID', //获取字典类型的最大序列
  'SYSTEM_DICT_ADD': '/Dict_Add', //添加字典信息
  'SYSTEM_DICT_DEL': '/Dict_Del', //删除字典信息
  'SYSTEM_DICT_UPDATE': '/Dict_Update', //修改字典信息
  'SYSTEM_DICT_MERGE': '/Dict_Merge', //添加修改合体版
  'SYSTEM_DICT_BYDTYPE': '/Dict_ByDtype', //根据类型以及序号返回详细数据

  //借款系列
  'SYSTEM_LOAN_BYPAGEALL': '/Loan_ByPageAll', //借款全部信息及分页
  'SYSTEM_LOAN_BYUPDATE': '/loan_ByUpdate', //修改借款信息
  'SYSTEM_LOAN_BYDEL': '/loan_ByDel', //删除借款信息
  'SYSTEM_LOAN_BYADD': '/loan_ByAdd', //添加借款信息

  //用户账号系列
  'SYSTEM_TUSER_GETBYA': '/tUser_getBya', //添加借款信息
  'SYSTEM_UACONUT_GETBYNAME': '/uAconut_getByName', //添加借款信息

  //还款
  'SYSTEM_FINREPAY_REPAYMENT': '/finRepay_repayment', //还款

  //充值
  'SYSTEM_BANK_RECHARGE': '/Bank_Recharge', //充值


	//用户系列
	'LCCCSSM_ADDUSER': '/addUser',//用户注册
	'LCCCSSM_YZM': '/YZM',//手机短信
	'LCCCSSM_SELECTNAMEJS': '/selectNameJS',//根据用户名查询用户信息 JSON格式
	'LCCCSSM_SELECTNAME': '/selectName',//根据用户名查询用户信息 对象格式
	'LCCCSSM_SELECTPHONEJS': '/selectPhoneJS',//用户注册验证手机是否已注册接口
	'LCCCSSM_SELECTPHONE': '/selectPhone',//用户使用手机登录接口
	'LCCCSSM_SELECTNAMEPASS': '/selectNamePass',//用户登录，账号密码登录接口
	'LCCCSSM_SELECTEMAIL': '/selectEmail',//查询邮箱是否已注册接口
	'LCCCSSM_ADDUSEREMAIL': '/addUserEmail',//用户绑定邮箱接口
	'LCCCSSM_EMAILYZM': '/EmailYZM',//邮箱验证码 
	'LCCCSSM_GETSFZ': '/getSFZ',//身份证
	'LCCCSSM_INSERTSFZ': '/insertSFZ',//增加身份证
	'LCCCSSM_GETFACE': '/getFace',//人脸识别 
	'LCCCSSM_UPDATEPHONE': '/updatePhone',//修改身份证已认证
	'LCCCSSM_UPDATAUSER': '/UpdataUser',//用户修改手机号码 
	'LCCCSSM_UPDATAUSERPASS': '/UpdataUserPass',//用户修改手机号码
	'LCCCSSM_GETBANK': '/getBank',//获取银行卡
	'LCCCSSM_SELECTSTATE': '/selectState',//获取身份证信息
	'LCCCSSM_INSERBANK': '/inserBank',// 银行卡
	'LCCCSSM_SELECTBANK': '/selectBank',// 查询银行卡
	


	//树菜单系列
	'SYSTEM_MENU':'/listByFunction',
  'SYSTEM_GETSTORAGE': '/lccc/lcccStorageAction_getStorage', //产品库存


  'getFullPath': k => { //获得请求的完整地址，用于mockjs测试时使用
    return this.SERVER + this[k];
  }
}
