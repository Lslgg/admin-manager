/**
 * Parse server Manager
 * 
 */
export class ParserManager implements ParserServer {

    public Parse: any;

    public pages: pageList = new pageList();

    constructor() {
        let parse = require("parse");
        parse.initialize("xxxxx");
        parse.serverURL = 'http://xxx.xxx.xxx/parse';
        this.Parse = parse; 
    }

    /*
    * 添加与修改
    */
    public add(table: any): Promise<boolean> {
        let promise = new Promise<boolean>((resolve, reject) => {
            table.save(null, {
                success: (menu) => resolve(true),
                error: (menu, error) => {
                    console.log(error);
                    reject(false)
                }
            });
        });

        return promise;
    }

    /*
    * 批量添加与修改
    */
    public addAll(list: any): Promise<boolean> {
        let promise = new Promise<boolean>((resolve, reject) => {
            this.Parse.Object.saveAll(list, {
                success: (list) => resolve(true),
                error: (error) => reject(false)
            })
        });
        return promise;
    }

    /*
    * 根据ID删除
    */
    public delete(id: string, tableName: string): Promise<boolean> {
        let promise = new Promise<boolean>((resolve, reject) => {
            var table = this.Parse.Object.extend(tableName);
            var query = new this.Parse.Query(table);
            query.get(id, {
                success: (myObject) => {
                    myObject.destroy({
                        success: (myObject) => resolve(true),
                        error: (myObject, error) => reject(false)
                    });
                }
            })
        });
        return promise;
    }

     /*
    * 根据条件删除
    */
    public deleteAll(tableName: string, conditions?: ConditionList): Promise<boolean> {
        var query = this.setQuery(tableName);
        let promise = new Promise<boolean>((resolve, reject) => {
            if(conditions){
                query = this.setCondition(query, conditions);
            }
            query.find({
                success: (result) => {
                    this.Parse.Object.destroyAll(result, {
                        success: ()=> { resolve(true) },
                        error: (error)=> {reject(error) }})
                },
                error: (error) => { console.log(error); reject(error) }
            });
        });
        return promise;
    }

    /*
    * 根据ID查找
    */
    public getInfo<T>(id: string, tableName: string, tClass?: Tclass<T>): Promise<T> {
        var query = this.setQuery(tableName);
        let promise = new Promise<any>((resolve, reject) => {
            query.get(id, {
                success: (val) => {
                    var info = this.setInfo(val);
                    resolve(info);
                },
                error: (error) => reject(error)
            });
        });

        return promise;
    }

    private setInfo<T>(result: T, tClass?: Tclass<T>) {
        let info: T = {} as T;
        info = tClass != undefined ? new tClass() : info;
        Object.assign(info, result['attributes']);
        info["id"] = result["id"];
        return info;
    }

    /**
     * 分页查找
     * @param pageInfo 分页条件 
     * @param tClass 是否使用泛型实例可以为空不写
     */
    getPageList<T>(pageInfo: pageList, tClass?: Tclass<T>): Promise<{ list: Array<{}>, count: number }> {

        var query = this.setQuery(pageInfo.name);
        let promise = new Promise<{ list: Array<T>, count: number }>((resolve, reject) => {
            query = this.setCondition(query, pageInfo.coditions);
            query = this.setOrder(query, pageInfo.orders);
            query.count({ //查找总数
                success: (count: number) => {
                    query.skip((pageInfo.index - 1) * pageInfo.size);
                    query.limit(pageInfo.size);
                    query.find({ //查找分页数据
                        success: (result: Array<any>) => {
                            let list = this.setList(result, tClass);
                            resolve({ list: list, count: count });
                        },
                        error: (error) => { console.log(error); reject(error) }
                    });
                },
                error: (error) => { reject(error) }
            });
        });

        return promise;
    }

    /**
     * 
     * @param query 查询对象
     * @param conditionList 要过滤的条件
     */
    public setCondition(query: any, conditionList: ConditionList) {
        let mapList = this.conditionStr();
        conditionList.forEach(info => {
            if (info.value != "") {
                let condition = mapList.get(info.condition);
                query[condition](info.field, info.value)
            }
        });

        return query;
    }

    /**
     * 设置排序
     * @param query 设置排序
     * @param orders 排序的字段
     */
    public setOrder(query: any, orders: OrderList) {
        orders.forEach(info => {
            if (info.orderType == "desc") {
                query.descending(info.field)
            } else {
                query.ascending(info.field)
            }
        })
        if (orders.length <= 0) {
            query.descending('createdAt');
        }
        return query;
    }

    /**
     * 
     */
    private conditionStr(): Map<string, string> {
        var list: Map<string, string> = new Map<string, string>();
        list.set("=", "equalTo");
        list.set("!=", "notEqualTo");
        list.set("<", "lessThan");
        list.set("<=", "lessThanOrEqualTo");
        list.set(">", "greaterThan");
        list.set(">=", "greaterThanOrEqualTo");
        list.set("in", "containedIn");
        list.set("notIn", "notContainedIn");
        list.set("exists", "exits");
        list.set("notExits", "doesNotExist");
        list.set("like", "startsWith");
        return list;
    }

    /*
     * 条件查找
     */
    public getList<T>(query: any, tClass?: Tclass<T>): Promise<Array<T>> {
        let promise = new Promise<Array<T>>((resolve, reject) => {
            query.find({
                success: (result: Array<T>) => {
                    let list = this.setList(result, tClass);
                    resolve(list);
                },
                error: (error) => { console.log(error); reject(error) }
            });
        });

        return promise;
    }

    /*
     * 条件查找
     */
    public getLists<T>(tableName: string, conditions?: ConditionList,orders?:OrderList,tClass?: Tclass<T>): Promise<Array<T>>{
        var query = this.setQuery(tableName);
        let promise = new Promise<Array<T>>((resolve, reject) => {
            if(conditions){
                query = this.setCondition(query, conditions);
            }
            if(orders){
                query = this.setOrder(query,orders);
            }
            //默认只返回100条数据,所以先查找有多少数据
             query.count({
                success: (count: number) => {
                     query.limit(count);
                     query.find({
                        success: (result: Array<any>) => {
                            let list = this.setList(result, tClass);
                            resolve(list);
                        },
                        error: (error) => { console.log(error); reject(error) }
                    });
                 },
                error: (error) => { return reject(error) }
            });
           
        });

        return promise;
    }
    /*
    * 查找总数
    */
    getCount(tableName: string, conditionList: ConditionList): Promise<number> {
        var query = this.setQuery(tableName);
        query = this.setCondition(query, conditionList);

        let promise = new Promise<number>((resolve, reject) => {
            query.count({
                success: (count: number) => { return resolve(count); },
                error: (error) => { return reject(error) }
            });
        });

        return promise;
    }

    private setList<T>(result: Array<T>, tClass?: Tclass<T>): Array<T> {
        let list: Array<T> = new Array<T>();
        for (let i = 0; i < result.length; i++) {
            var info: T = {} as T;
            info = tClass != undefined ? new tClass() : info;
            Object.assign(info, result[i]["attributes"]);
            info["id"] = result[i]['id'];
            list[i] = info;
        }
        return list;
    }

    /** 
     * 当前登录ID
     */
    public getCurrentUserId(): string {
        var currentUser = this.Parse.User.current();
        return currentUser["id"];
    }

    /**    
     * 设置 parse 实列
     */
    public setParseObj(tableName: string): any {
        var DBInfo = this.Parse.Object.extend(tableName);
        var dbInfo = new DBInfo();
        return dbInfo;
    }

    /**    
     * 设置 parse 查询对象
     */
    public setQuery(tableName: string): any {
        var query: any;
        if (tableName == "User") {
            query = new this.Parse.Query(this.Parse.User);
        } else if (tableName == "Role") {
            query = new this.Parse.Query(this.Parse.Role);
        }else{
            query = new this.Parse.Query(tableName);
        }
        return query;
    }
}

class pageList implements Pages {
    index = 1;
    size = 10;
    name = "";
    orders = [];
    coditions = [];
}