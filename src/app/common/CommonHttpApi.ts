export class CommonHttpApi implements CommonApi{

  /**
  * 总共用户
  * 参数:void
  * 返回:num int 用户数
  */
  public USER_TOTAL = "total";

  /**
   * 在线用户
   * 参数:void
   * 返回:num int 在线用户 
   */
  public ONLINE_USER = "online";

  /**
   * 新用户
   * 参数:void
   * 返回: num	int	新用户数
   */
  public USER_NEW = "new";

  /**
   * 用户信息
   * 参数:userId	是	int	用户id 必需
   * 返回: 用户 Json
   */
  public USER_INFO = "info";

  /**
   * 封号
   * 参数:userId	是	int	用户id
   * flag	是	bool	禁号和解禁,true禁号，false解禁
   * 返回: 用户 Json
   */
  public USER_FORBID = "forbid";

  /**
   * 用户列表
   * 参数:page	是	int	页数
   *  pageSize	是	int	每页用户数 默认15，最大100
   * 返回: 用户列表 Json
   */
  public USER_LIST = "list";

  /**
   * 充卡
   * 参数:userId	是	int	用户id
   *      change	是	int	改变数，正的充卡，负的扣卡
   * 返回: 用户 Json
   */
  public CARD_CHANGE = "change";

  /**
   * 今天使用量
   * 参数:void
   * 返回: Json
   */
  public CARD_TOTLE_USE = "today_use";

  /**
   * 免房卡
   * 参数:flag	是	bool	true 免房卡，false 需要房卡
   * 返回: Json
   */
  public CARD_FREE = "free";

  /**
   * 是否需要房卡
   * 参数:void
   * 返回: Json
   */
  public CARD_IS_FREE = "if_free";

  /**
   * 审核
   * 参数:flag	是	bool	true 审核，false 不审核
   * 返回: Json
   */
  public CARD_CHECK = "check";

  /**
   * 是否审核
   * 参数:flag	是	bool	true 审核，false 非审核
   * 返回: Json
   */
  public CARD_IS_CHECK = "if_check";

  /**
   * 获取公告信息
   * 参数:msg
   * 返回: Json
   */
  public GM_NEWS = "news";

 /**
   * 公告信息
   * 参数:msg
   * 返回: Json
   */
  public GM_SET_NEWS = "set_news";

  /**
   * 获取走马灯信息
   * 参数:msg
   * 返回: Json
   */
  public GM_NOTICE = "notice";

    /**
   * 走马灯信息
   * 参数:msg
   * 返回: Json
   */
  public GM_SET_NOTICE = "set_notice";

  /**
   * 获取微信代理
   * 参数:msg
   * 返回: Json
   */
  public GM_TIP = "tip";

  /**
   * 微信代理
   * 参数:msg
   * 返回: Json
   */
  public GM_SET_TIP = "set_tip";

  /**
   * 获取版本号
   * 参数:msg
   * 返回: Json
   */
  public GM_VERSION = "version";

  /**
   * 版本号
   * 参数:msg
   * 返回: Json
   */
  public GM_SET_VERSION = "set_version";

  public GMAPI = "gmApi"; 

}