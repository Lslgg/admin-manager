// Typings reference file, see links for more information
// https://github.com/typings/typings
// https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html

declare var System: any;

declare var Parse: any;

type Tclass<T> = { new (): T };

type ConditionList = Array<{ field: string, value: string|number|boolean, condition: string }>

type OrderList = Array<{ field: string, orderType: string }>;

//Output事件参数
type IdType = { id: string, type: string };

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
}


