### Airwallex test

##### Preview: https://airwallex-test.vercel.app/

#### ZH：

项目基于 react ，组件方面0依赖。[因为页面比较简单，就不引入ts和css module了]

本机环境： node: 15.2.1

>  启动方式

yarn start

> 构建

yarn build

> 目录结构

主要分为三个文件 App.js , InviteModal.js, tool.js

- App.js: 主页面UI，分为头、身体、脚
- InviteModal.js: 核心modal和form ， 包含了fetch请求，以及一个简单异常提示
- tool.js: validate的部分抽出来做校验

---

#### EN：
The project is based on react and has zero dependencies on components. [Because the page is relatively simple, ts and css modules are not imported]

Mainly divided into three files App.js, InviteModal.js, tool.js

- App.js: Main page UI, divided into head, body, and foot
- InviteModal.js: core modal and form, including fetch request, and a simple exception prompt
- tool.js: The validate part is extracted for verification