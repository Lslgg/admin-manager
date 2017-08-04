如何快速更新当前项目到最新的Angular稳定版本



这里要介绍一个命令行工具：[npm-check-updates](https://github.com/tjunnone/npm-check-updates)

它可以更新package.json和bowser.json文件到最新的包版本



安装：npm install -g npm-check-updates



使用：

假设当前项目路径为:~/GF_Work/webapp/mobile

切换至项目根目录，使用如下命令如下：

```
$ ncu # 查看当前项目的可更新的依赖(或最新依赖)

使用 -u 参数可以更新升级根目录下package.json包的依赖

$ ncu -u
Using /Users/mac/app/ng2/webapp/package.json
⸨░░░░░░░░░░░░░░░░░░⸩ ⠋ :
 @angular/common                            2.2.3  →    4.3.1
 @angular/compiler                          2.2.3  →    4.3.1
 @angular/core                              2.2.3  →    4.3.1
 @angular/forms                             2.2.3  →    4.3.1
 @angular/http                              2.2.3  →    4.3.1
 @angular/platform-browser                  2.2.3  →    4.3.1
 @angular/platform-browser-dynamic          2.2.3  →    4.3.1
 @angular/router                            3.2.3  →    4.3.1
 rxjs                               5.0.0-beta.12  →    5.4.2
 ...
 
 使用 -a 参数可以更新package.json当前所有包的依赖
 $ ncu -a
 ...
```

更新完package.json文件后，在项目根目录执行```npm install```安装包依赖



同时也可以更新Docker下的package.json包依赖

```
docker run -it --rm -v $(pwd)/package.json:/app/package.json creack/ncu -u -a

 -i 表示docker会进入一个可交互的环境
 --rm 表示不保存运行在前台环境行产生的数据，这个选项与 -d(守护进程或后台进程)互斥
 -t 表示docker会开启一个伪终端
 -v 表示把项目下面的package.json挂载到docker下面的/app/package.json文件
 
 creack/ncu docker镜像
 
 
```

详细说明参见官方文档：https://github.com/tjunnone/npm-check-updates



日期：2017.7.26 星期三 睛