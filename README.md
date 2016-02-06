# 概述

> 14年参加机试时写的一个简单的摇奖DEMO

### 项目展示

> 直接访问项目中的html/index.html即可，已经在android2.3/4.0，及IOS6测试通过。当然还有些BUG，留些坑。

### 项目技术点

- 生成的index.html页采用inline css/ inline js方式展现代码
- 部分图片直接BASE64
- SASS项目使用该开发库：http://www.w3cplus.com/sasscore/index.html

### 项目工程化安装

> 一般情况

`npm install`

> 有时候安装会失败，主要是因为SASS/BrowserSync/gulp-imagemin安装问题，所以建议分开安装

- npm install gulp-imagemin
- npm install gulp-sass
- npm install browser-sync
- npm install 最后以此再度安装，理论上应该会成功。

> 注意事项：window环境安装imagemin因为图形库等等需要安装，有时会无法成功，建议停止使用



## 项目结构

```
├── gulpfile.js  gulp配置文件，可应用用于简单的项目活动页
├── html
│   ├── base64
│   │   ├── images
│   │   │   ├── ad.jpg
│   │   │   ├── icon-trumpet.png
│   │   │   ├── lottery-disc-bg.png
│   │   │   └── lottery-start-button.png
│   │   ├── style.css
│   │   └── style.min.css
│   ├── css
│   │   ├── style.css
│   │   └── style.min.css
│   ├── images
│   │   ├── ad.jpg
│   │   ├── ad22.jpg
│   │   ├── fast.jpg
│   │   ├── icon-trumpet.png
│   │   ├── lottery-disc-bg.png
│   │   └── lottery-start-button.png
│   ├── index.html  // 最终生成的页面，可直接访问
│   ├── js
│   │   └── app.min.js
│   └── src
│       ├── images
│       │   ├── ad22.jpg
│       │   ├── icon-trumpet.png
│       │   ├── lottery-disc-bg.png
│       │   └── lottery-start-button.png
│       ├── js  
│       │   └── app.js   // 抽奖JS代码
│       ├── sass   // 该sass项目使用了w3cplus提供的通用项目库  
│       │   ├── _base.scss
│       │   ├── _components.scss
│       │   ├── _function.scss
│       │   ├── _layout.scss
│       │   ├── _module.scss
│       │   ├── components
│       │   ├── core
│       │   ├── ext
│       │   ├── module
│       │   └── style.scss
│       └── template  //模板文件
│           └── index.html

```



