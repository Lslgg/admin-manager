// Typings reference file, see links for more information
// https://github.com/typings/typings
// https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html

declare var System: any;

declare var Parse: any;

type Tclass<T> = { new (): T };

type ConditionList = Array<{ 
    field: string, 
    value: string | number | boolean | Array<any>, 
    condition: string }>

type OrderList = Array<{ field: string, orderType: string }>;

//Output事件参数
type IdType = { id: string, type: string };
type IdTypeObject = { id: string, type: string, info: object };

type CheckboxList = { value: string, name: string, isCheck: boolean };


/**
 * 分页条件
 */
interface Pages {
    index: number,
    size: number,
    name: string,
    orders: OrderList,
    coditions: ConditionList,
}

/**
 * Parse server Manager
 * 官方网址 http://docs.parseplatform.org/js/guide/
 */
interface ParserServer {

    /**
     * Parse初始对象
     */
    Parse: any;

    /**
     * 分页信息
     */
    pages: Pages;

    /**
     * 添加
     * @param table paser 对象
     * @return ture or false 
     */
    add(table: any): Promise<boolean>;

    /**
     * 批量添加与修改
     * @param list paser 对象列表
     * @return ture or false 
     */
    addAll(list: any): Promise<boolean>;

    /**
     * 删除
     * @param id paser 对象ID
     * @param tableName 集合名字
     * @return ture or false     
     */
    delete(id: string, tableName: string): Promise<boolean>;

    /**
     * 批理删除
     * @param tableName 集合名字
     * @param conditions 查询条件
     * @return ture or false     
     */
    deleteAll(tableName: string, conditions?: ConditionList): Promise<boolean>

    /**
     * 根据ID查找对象
     * @param id paser 对象ID
     * @param tableName 集合名字
     * @param tClass 实例对象可选参数
     * @return 实例对象
     */
    getInfo<T>(id: string, tablename: string, tClass?: Tclass<T>): Promise<T>;

    /**
    * 分页查找
    * @param pageInfo 分页条件 
    * @param tClass 是否使用泛型实例
    * @return 实例对象列表，总数
    */
    getPageList<T>(pageInfo: Pages, tClass?: Tclass<T>): Promise<{ list: Array<T>, count: number }>;
    /**
     * 查找总数
     * @param tableName 集合名字 
     * @param conditionList 条件
     * @return 总数     
     */
    getCount(tableName: string, conditionList: ConditionList): Promise<number>;

    /**
     * 条件查找
     * @param query paser 查询对象
     * @param tClass 是否使用泛型实例
     * @return 实例对象列表          
     */
    getList<T>(query: any, tClass?: Tclass<T>): Promise<Array<T>>;


     /**
     * 条件查找
     * @param query paser 查询对象
     * @param tClass 是否使用泛型实例
     * @return 实例对象列表          
     */
    getLists<T>(tableName: string, conditions?: ConditionList,
            orders?:OrderList,tClass?: Tclass<T>): Promise<Array<T>>;

    /** 
    * 当前登录ID
    */
    getCurrentUserId(): string;

    /** 
     * 设置查询对象
     * @param tableName 集合名字 
     * @return parse Query 对象
     */
    setQuery(tableName: string): any;

    /**
     * 设置 parse server 对象
     * @param tableName 集合名字 
     * @return parse 对象
     */
    setParseObj(tableName: string): any;

    /**
     * 设置 查询 条件
     * @param query 集合名字 
     * @return conditionList查询条件
     */
    setCondition(query: any, conditionList: ConditionList);

    /**
     * 设置 排序 条件
     * @param query 集合名字 
     * @return orders 条件
     */
    setOrder(query: any, orders: OrderList)
}

/**
 * Parse server Manager
 * 对应parser cloud 里面的js
 */
interface CommonApi {
    /**
  * 总共用户
  * 参数:void
  * 返回:num int 用户数
  */
    USER_TOTAL: string;

    /**
     * 在线用户
     * 参数:void
     * 返回:num int 在线用户 
     */
    ONLINE_USER: string;

    /**
     * 新用户
     * 参数:void
     * 返回: num	int	新用户数
     */
    USER_NEW: string;

    /**
     * 用户信息
     * 参数:userId	是	int	用户id 必需
     * 返回: 用户 Json
     */
    USER_INFO: string;

    /**
     * 封号
     * 参数:userId	是	int	用户id
     * flag	是	bool	禁号和解禁,true禁号，false解禁
     * 返回: 用户 Json
     */
    USER_FORBID: string;

    /**
     * 用户列表
     * 参数:page	是	int	页数
     *  pageSize	是	int	每页用户数 默认15，最大100
     * 返回: 用户列表 Json
     */
    USER_LIST: string;

    /**
     * 充卡
     * 参数:userId	是	int	用户id
     *      change	是	int	改变数，正的充卡，负的扣卡
     * 返回: 用户 Json
     */
    CARD_CHANGE: string;

    /**
     * 今天使用量
     * 参数:void
     * 返回: Json
     */
    CARD_TOTLE_USE: string;

    /**
     * 免房卡
     * 参数:flag	是	bool	true 免房卡，false 需要房卡
     * 返回: Json
     */
    CARD_FREE: string;

    /**
     * 是否需要房卡
     * 参数:void
     * 返回: Json
     */
    CARD_IS_FREE: string;

    /**
     * 审核
     * 参数:flag	是	bool	true 审核，false 不审核
     * 返回: Json
     */
    CARD_CHECK: string;

    /**
     * 是否审核
     * 参数:flag	是	bool	true 审核，false 非审核
     * 返回: Json
     */
    CARD_IS_CHECK: string;

    /**
     * 获取公告信息
     * 参数:msg
     * 返回: Json
     */
    GM_NEWS: string;

    /**
      * 公告信息
      * 参数:msg
      * 返回: Json
      */
    GM_SET_NEWS: string;

    /**
     * 获取走马灯信息
     * 参数:msg
     * 返回: Json
     */
    GM_NOTICE: string;

    /**
   * 走马灯信息
   * 参数:msg
   * 返回: Json
   */
    GM_SET_NOTICE: string;

    /**
     * 获取微信代理
     * 参数:msg
     * 返回: Json
     */
    GM_TIP: string;

    /**
     * 微信代理
     * 参数:msg
     * 返回: Json
     */
    GM_SET_TIP: string;

    /**
     * 获取版本号
     * 参数:msg
     * 返回: Json
     */
    GM_VERSION: string;

    /**
     * 版本号
     * 参数:msg
     * 返回: Json
     */
    GM_SET_VERSION: string;

     /**
     * 获取用户统计
     * 参数:msg
     * 返回: Json
     */
    GM_STATSTIC: string;

     /**
     * 获取房卡统计
     * 参数:msg
     * 返回: Json
     */
    GM_STATSTIC_CARD: string;

    GMAPI: string;
}

