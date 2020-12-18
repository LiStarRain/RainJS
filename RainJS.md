# 基础知识

## 变量声明

### 命名规则

1. JavaScript中的变量是弱类型的解释型语言，它可以保存所有类型的数据，即变量没有类型而值有类型。
2. 变量名可以以字母、$、下划线开始，后跟字母、数字、下划线

下面都是合法的命名

```javascript
let name = 'lsr';
let $ = 'ninjia';
```

JavaScript语言的关键字、保留字不能用作变量名，比如<code>true</code>、<code>if</code>、<code>while</code>、<code>class</code>等。

```javascript
// 错误示范
let class = 'lsr';
```

### 变量声明

可以使用多种关键字定义变量，比如<code>var</code>、<code>let</code>、<code>const</code>。

```javascript
let name = 'lsr'; 
```

以上的语句是声明和赋值的结合

```javascript
let name;
name = 'lsr';
```

使用<code>,</code>可以同时声明多个变量

```javascript
let n = 2, m = 3;
console.log(f);
```

下面演示了变量可以更换不同类型的数据

```javascript
// 变量可以更换不同类型的数据
let lsr = 'houdunren';
console.log(typeof lsr);
lsr = 100;
console.log(typeof lsr);
```

### 弱类型

在JavaScript中变量类型由所引用的值决定

```JavaScript
var web = 'hdcms';
console.log(typeof web); // string
web = 99;
console.log(typeof web); // number
web = {};
console.log(typeof web); // object
```

### 变量提升

通俗的来说，变量提升就是解析器会先解析代码，然后把声明的变量的变量声明提升到最前面

#### 注册标识符的过程

JavaScript是解释型语言。JavaScript引擎对代码的处理包括解析和执行两个步骤。在解析过程中会创建与代码结构相关联的词法环境（通俗的来讲就是作用域），并且JavaScript引擎会注册词法环境中所声明的变量和函数，具体步骤如下。

注意：词法环境是解析时创建的，是函数或者变量在声明时候的环境，词法环境可以在相应代码执行过程中进行完善或修改。

1. 如果是创建一个函数环境，那么创建形参和函数参数的默认值。如果是非函数环境，则跳过此步骤。
2. 如果是创建全局或函数环境，就扫描当前代码进行函数声明（不会扫描其他函数的函数体），但是不会扫描函数表达式或者箭头函数。对于所找到的函数声明，将创建函数，并绑定到当前词法环境与函数名相同的标识符上。若该标识符已经存在，那么该标识符的值将被重写。如果是块级作用域，则跳过此步骤。
3. 扫描当前的代码进行变量声明。在函数或全局环境中，找到所有在当前环境之内、其他函数之外通过<code>var</code>声明的变量，并找到所有在其他函数和代码块之外通过<code>let</code>或者<code>const</code>定义的变量。在块级环境中，仅查找当前代码块中通过<code>let</code>和<code>const</code>定义的变量，若该标识符不存在，进行注册并将其初始化为<code>undefined</code>。若该标识符已经存在，则保留其原来的值。

<img src="./images/注册标识符的过程取决于环境的类型.png" alt="注册标识符的过程取决于环境的类型" style="zoom:75%;" />

<center>注册标识符的过程取决于环境的类型</center>

注意：由于用<code>let</code>和<code>const</code>关键字定义的变量存在临时性死区（TDZ），要求用<code>let</code>和<code>const</code>声明的变量必须在人为显式声明后才能使用，因此在声明语句之前是无法读取到用<code>let</code>和<code>const</code>声明的变量的值的。这也就是使用<code>var</code>关键字声明的变量具有提升效果的原因。

下面的代码在解析过程中发现<code>class</code>不能作为变量名，因此没有到执行环节就出错了。

```javascript
var web = 'housunren';
console.log(web);
// 解析过程中发现class不能作为变量名，因此没有到执行环节就出错了
let class = 'lsr';
```

使用<code>var</code>声明的变量会被提升到当前作用域的最前面（实际上并没有改变声明语句的位置，提升效果是由于JavaScript引擎注册标识符的机制引起的）

```javascript
// var声明的变量具有提升效果
console.log(lsr); // undefined
var lsr = 'lxy';
```

下面是<code>if(false)</code>中用var声明的变量也会有提升效果（注意：JavaScript引擎不会将用<code>var</code>声明的变量添加到最近的块级作用域中，而是将它添加到最近的全局或者函数作用域中）

```javascript
var web = 'houdunren';

function test() {
    if (false) {
        // 注意 var 声明的变量不会添加到块级作用域中
        var web = '豆花米线';
    }
    console.log(web); // undefined
}
test();
console.log(web); // houdunren
```

使用<code>var</code>定义的变量，变量声明会被提升到当前作用域的最前面，赋值还在原来的位置（并没有真正改变语句位置，只是在第三步注册变量时，将它注册进了当前词法环境并被初始化为<code>undefined</code>，等代码执行时才执行了赋值语句给变量重新赋值）

```javascript
console.log(lsr);
var lsr = 'lxy';

// 为了便于理解，可以将以上代码看成如下解析过程
var lsr;
console.log(lsr);
lsr = 'houdunren';
```

以下的代码既存在了函数提升，也存在变量提升。代码注册标识符的过程如下：

1. 当前代码处于全局环境，因此跳过注册标识符流程的第一步骤。
2. 当前代码处于全局环境。扫描当前代码中的函数声明（不会扫描函数表达式和箭头函数），对于找到的函数声明(<code>rain</code>)，将创建函数（这里<code>rain</code>函数的解析过程同理）并将该绑定到当前词法环境与函数名相同的标识符上，若该标识符已经在词法环境中存在，则覆写该标识符的值。（这里变量（标识符）<code>rain</code>的值为定义的函数）
3. 扫描代码中当前环境之内、其他函数之外通过<code>var</code>声明的变量，接着找到所有在其他函数或代码块之外通过<code>let</code>或<code>const</code>声明的变量，最后将找到的变量注册到当前词法环境中，若该标识符有值，则保留原始值，若标识符在词法环境中不存在，则将其初始化为<code>undefined</code>。（这里<code>rain</code>标识符已经有值了，保留其原始值）

解析过程完成后，代码执行时，第一次读取<code>rain</code>的值自然就是自定义的<code>rain</code>函数，接下来又对<code>rain</code>变量重新赋值，也就覆盖了词法作用域中<code>rain</code>变量的值，第二次读取<code>rain</code>的值就变成了重新赋的新值

```javascript
console.log(rain); // function rain
var rain = 'lsr';
console.log(rain); // lsr
function rain() {
    console.log("Hi,I'm Rain!");
}
```

### TDZ

TDZ又称暂时性死区，指变量在作用域（词法环境）中已经存在，但必须在<code>let/const</code>声明语句之后才能使用。

TDZ可以让程序保持先声明后使用的习惯，可以让程序更稳定。

* 变量要先声明后使用
* 建议使用<code>let/const</code>而少使用<code>var</code>

使用<code>let/const</code>声明的变量存在临时性死区（TDZ），在声明语句之前调用会产生错误。

```javascript
console.log(x); // Cannot access 'x' before initialization
let x = 100;
```

在<code>run</code>函数作用域中产生TDZ，不允许变量在未声明前使用。

```javascript
hd = 'houdunren';
function run() {
    console.log(hd);
    let hd = 'hdcms';
}
run();
```

下面的代码中变量<code>b</code>没有声明赋值不允许直接使用

```javascript
function test(a = b, b = 3) {}
test();
```

因为<code>a</code>已经赋值，所以<code>b</code>可以使用<code>a</code>变量，下面代码访问正常

```javascript
function test(a = 3, b = b) {}
test();
```

## 块作用域

### 共同点

<code>var/let/const</code>共同点是全局作用域中定义的变量，可以在函数中使用

```javascript
var hd = 'hdcms';
function show() {
    return hd;
}
console.log(show()); // hdcms
```

函数中声明的变量，只能在当前函数及其子函数中使用

```javascript
function test() {
    var web = 'hahaha';
    function show() {
        console.log(web);
    }
    show(); // hahaha
    console.log(web); // hahaha
}
test();
console.log(web); // 全局访问：web is not defined
```

函数中声明的变量就像声明了自己的私有领地，在函数外部是无法访问的

```javascript
var web = 'hahaha';
function test() {
    var web = 'web';
    console.log(web); // web
}
test();
console.log(web); // hahaha
```

### var

使用<code>var</code>声明的变量存在于最近的函数作用域或者全局作用域中，不会添加到块级作用域中，因此使用<code>var</code>定义的变量没有块级作用域的机制。

没有块级作用域很容易污染全局环境，下面函数中的变量就污染了全局环境

```javascript
function run() {
    // 不加声明关键字相当于把变量添加进全局环境中
    web = 'haha';
}
run();
console.log(web); // haha
```

用<code>var</code>声明的变量由于没有块级作用域因此会污染全局环境

```javascript
// var没有块级作用域
for (var i = 0; i < 100; i++) {
    console.log(i);
}
console.log(i); // 100
```

  使用<code>let</code>声明时则会将变量添加到最近的函数、全局或者块级作用域中，因此不会污染全局环境

```javascript
// 使用let时则会将变量添加到最近的函数、全局或者块级作用域中
let i = 100;
for (let i = 0; i < 6; i++) {
    console.log(i); // 0 1 2 3 4 5
}
console.log(i); // 100
```

下例中体验到<code>var</code>没有块作用域的概念，<code>do/while</code>定义的变量可以在代码块外部访问到

```javascript
var num = 0;
function show() {
    var step = 10;
    do {
        var res = 0;
        console.log(num = step++);
        res = num;
    } while (step < 20);
    console.log(`结果是：${res}`);
}
show(); // 19
```

<code>var</code>在全局环境中声明的变量也被添加到<code>window</code>全局对象中

```javascript
// var在全局环境中声明的变量也会添加到全局对象window中
var test = 'gagaga';
console.log(window.test);
```

可以使用立即执行函数来模仿块作用域

```javascript
(function () {
    var $ = this.$ = {};
    $.web = 'haha';
}.bind(window))();
console.log($.web); // haha
```

有了块级作用域后实现就简单多了

```javascript
{
    let $ = (window.$ = {});
    $.web = 'haha';
}
console.log($.web); // haha
```

### let

与使用<code>var</code>声明变量的区别是，使用<code>let/const</code>声明的变量会被JavaScript引擎添加到块级作用域中，下面代码演示了块外部是无法访问到<code>let/const</code>声明的变量的。

- 建议将<code>let</code>在代码块前声明
- 用<code>,</code>分隔可以同时定义多个变量
- 不允许重复定义同名变量

<code>let</code>存在块作用域的特性，变量只在块域中有效

```javascript
// let有块作用域特性
if (true) {
    let web = 'haha',
        name = 'gaga';
    console.log(web); // haha
    console.log(name); // gaga
}
console.log(web); // web is not defined
```

在块作用域的内部可以访问到上层作用域的变量（这里涉及词法环境的嵌套和引用，后面再讲）

```javascript
if (true) {
    let user = 'lsr';
    (function () {
        if (true) {
            console.log(`这是块内访问：${user}`);
        }
    })();
}
console.log(user); // user is not defined
```

每一层都是独立的作用域，里层作用域可以声明外层作用域的同名变量，但并不会影响外层作用域变量的值（因为变量所在的词法环境不同）

```javascript
function run() {
    let name = 'lsr';
    if (true) {
        let name = 'haha';
        console.log(name); // haha
    }
    console.log(name); //lsr
}
run();
```

### const

可以使用<code>const</code>关键字来声明常量，比如可以用来声明后台接口的URI地址。

- 常量名建议全部大写
- 不允许重复定义同名常量
- 声明时必须同时赋值
- 不允许再次给常量赋全新的值
- 拥有块、函数以及全局作用域

常量不允许赋全新的值

```javascript
try {
    const URL = 'hahaha.com';
    URL = 'xixixi.com'; // 出错
} catch (error) {
    throw new Error("出错了");
}
```

改变引用类型的常量的属性值

```javascript
// 改变引用类型的常量的属性值
const INFO = {
    url: 'wasser.net.cn',
    port: '8080'
};
INFO.port = '3000';
console.log(INFO);
```

在不同作用域中可以重名定义常量

```javascript
const NAME = 'lsr';
function show() {
    const NAME = 'hahaha';
    return NAME;
}
console.log(show());
console.log(NAME);
```

### 重复定义

 使用<code>var</code>可能造成不小心定义了同名变量

```javascript
// 优惠价
var price = 90;
// 商品价格
var price = 100;
console.log(`商品的优惠价格是：${price}`); // 100
```

使用<code>let</code>可以避免上面的问题，因为<code>let</code>声明后的变量不允许在同一作用域内重新声明

```javascript
let name = 'haha';
let name = 'lsr'; // Identifier 'name' has already been declared
```

不同作用域可以重新声明

```javascript
let name = 'lsr';
if (true) {
    let name = 'haha';
    console.log(name); // haha
}
console.log(name); // lsr
```

与<code>const</code>声明的常量不同的是它可以随时改变变量的值

```javascript
let name = 'lsr';
name = 'haha';
console.log(name); // haha
```

与<code>var</code>声明变量不同，使用<code>let</code>在全局环境中声明变量不会将它添加到<code>window</code>对象中

```javascript
// let 在全局环境中声明的变量不会添加到全局对象window中
let ws = 'wasser';
console.log(window.ws); // undefined
```

### Object.freeze()

冻结引用类型的变量后，变量的属性和方法就不可以修改了，在严格模式下尝试修改冻结的变量属性和方法会抛出错误

```javascript
"use strict";
const INFO = {
    url: "http://wasser.net.cn",
    port: 8080
};
let name = 1;
// 冻结变量
Object.freeze(INFO);
INFO.port = 3000; // Cannot assign to read only property 'port' of object 
console.log(INFO);
```

### 传值与传址

基本数据类型指数值、字符串等简单数据类型，引用数据类型。

基本类型复制是值的复制，互相不受影响。下例中将变量<code>a</code>的值复制给变量<code>b</code>后，因为基本类型变量是独立的所以<code>a</code>的改变不会引起<code>b</code>变量值的改变

```javascript
// 传值
let a = 100;
let b = a;
a = 200;
console.log(b); // 100
```

对于引用类型来讲，变量保存的是引用对象的指针。变量间赋值时其实赋值的是变量的指针，这样多个变量引用的就是同一个对象

```javascript
// 传址
let user1 = {
    name: 'lsr'
};
let user2 = user1;
user1.name = 'lxy';
console.log(user2.name); // lxy
```

## undefined

对声明但未赋值的变量返回类型为<code>undefined</code>的值<code>undefined</code>表示值未定义

```javascript
let name;
console.log(name); // undefined
```

对未声明的变量使用会报错，但判断类型将显示<code>undefined</code>

```javascript
// 变量未声明
console.log(typeof age); // undefined
console.log(age); // age is not defined
```

我们发现未赋值与未定义的变量值都为<code>undefined</code>，建议在声明变量时设置初始值，这样就可以区分出变量状态了。

函数参数的默认值或默认返回值为<code>undefined</code>

```javascript
function test(name) {
    console.log(name); //undefined
}
console.log(test()); // undefined
```

### null

<code>null</code>用于定义一个空对象，即如果变量要用来保存引用类型的数据，可以在初始化时将其设置为<code>null</code>

```javascript
var user = null;
console.log(typeof user); // object
```

## 严格模式

严格模式可以让我们及早发现错误，使得代码更加安全规范，推荐在代码中一直保持严格模式运行。

### 基本差异

关键词不允许作为变量名

```javascript
"use strict";
var public = 'lsr';
```

函数参数不允许重复定义

```javascript
"use strict";   
// 不允许参数重名
function test(name, name) {} //Duplicate parameter name not allowed in this context
```

单独为函数设置严格模式

```javascript
function strict() {
    "use strict";
    return "严格模式";
}
function noStrict() {
    return "正常模式";
}
```

为了在多文件合并时，防止全局设置严格模式对其他没有使用严格模式文件的影响，可以将代码放在一个自执行函数中

```javascript
(function () {
    "use strict";
    let name = 'lsr';
    console.log(name);
})();
```

### 解构差异

非严格模式下可以不使用声明指令，严格模式下必须使用声明。所以建议使用<code>let</code>等关键字声明

```javascript
"use strict";
({name,age} = {name:'lsr',age:22}); // 报错
console.log(name, age);
```

# 运算符与流程控制

## 运算符

下面来讨论常用编程运算符的使用。

### 赋值运算符

使用<code>=</code>进行变量赋值

```javascript
// 使用 = 进行变量赋值
let name = 'lsr';
console.log(name); // lsr
```

### 算数运算符

包括以下几种算数运算符

| 运算符 | 说明   |
| ------ | ------ |
| *      | 乘法   |
| /      | 除法   |
| %      | 取余数 |
| +      | 加法   |
| -      | 减法   |

先来看一些简单的操作

```javascript
let a = 5,b = 3;
console.log(a*b); // 15
console.log(a%b); // 2
```

当操作数的类型为非数值类型时，不同的操作符有可能会触发不同的类型转换机制：

#### 乘法（*）

在处理特殊值的情况下，乘法操作遵循下列特殊的规则：

* 如果操作数都是数值，执行常规的乘法计算，即两个正数或两个负数相乘还是为一个正数，而只有一个操作数有符号，那么结果就是负数。如果乘积的数值超过了ECMAScript数值的表示范围，则返回<code>Infinity</code>或<code>-Infinity</code>
* 如果有一个操作数是<code>NaN</code>，则结果是<code>NaN</code>
* 如果是<code>Infinity</code>与0相乘，则结果是<code>NaN</code>
* 如果是<code>Infinity</code>与非0数值相乘，则结果是<code>Infinity</code>或<code>-Infinity</code>，取决于有符号操作数的符号
* 如果是<code>Infinity</code>与<code>Infinity</code>相乘，则结果是<code>Infinity</code>
* 如果有一个操作数不是数值，则在后台调用<code>Number()</code>将其转换为数值，然后在应用上面的规则

```javascript
console.log(Infinity * 0); // NaN
console.log(Infinity * Infinity); // Infinity
console.log(-1 * Infinity); // -Infinity
console.log(2 * {}); // NaN
```

#### 除法（/）

与乘法操作符类似，除法操作符对特殊的值也有特殊的处理规则。这些规则如下：

- 如果操作数都是数值，执行常规的除法计算，即两个正数或两个负数相除的结果还是正数，而只有一个操作符有符号，那么结果就是负数。如果商超过了ECMAScript数值的表示范围，则返回<code>Infinity</code>或<code>-Infinity</code>
- 如果有一个操作数是<code>NaN</code>，则结果是<code>NaN</code>
- 如果是<code>Infinity</code>被<code>Infinity</code>除，则结果是<code>NaN</code>
- 如果是任何有限数值被<code>Infinity</code>除，则结果为0
- 如果是0被0除，则结果为<code>NaN</code>
- 如果是非0的有限数被0除，则结果是<code>Infinity</code>或<code>-Infinity</code>，取决于有符号操作数的符号
- 如果是<code>Infinity</code>被任何有限数值除，则结果是<code>Infinity</code>或<code>-Infinity</code>，取决于有符号操作数的符号
- 如果有一个操作数不是数值，则在后台调用<code>Number()</code>将其转化为数值，然后再应用上面的规则

```javascript
console.log(100 / NaN); // NaN
console.log(Infinity / Infinity); // NaN
console.log(100 / Infinity); // 0
console.log(0 / 0); // NaN
console.log(100 / 0); // Infinity
console.log(Infinity / -0); // -Infinity
console.log(1 / {}); // NaN
```



#### 求模（%）

与另外两个操作符类似，求模操作符会遵循以下特殊规则来处理特殊的值：

- 如果操作符都是数值，执行常规的除法操作，返回除得的余数
- 如果被除数是无穷大的数值而除数为有限大的数值。则结返回<code>NaN</code>
- 如果被除数是有限大的数值而除数是0，则结果是<code>NaN</code>
- 如果是<code>Infinity</code>被<code>Infinity</code>除，则结果是<code>NaN</code>
- 如果被除数是有限大的而除数是无限大的，则返回被除数
- 如果被除数是0，则结果为0
- 如果有一个操作数不是数值，则在后台调用<code>Number()</code>将其转化为数值，然后再应用上面的规则

```javascript
console.log(Infinity % 100); // NaN
console.log(100 % 0); // NaN
console.log(Infinity % Infinity); // NaN
console.log(100 % Infinity); // 100
console.log(0 % Infinity); // 0
console.log({} % 100); // NaN
```

#### 加法（+）

加法操作符会根据下列规则来处理特殊的值：

- 如果两个操作符都是数值，执行常规的加法计算并返回结果
- 如果有一个操作数是<code>NaN</code>，则结果是<code>NaN</code>
- 如果是<code>Infinity</code>加<code>Infinity</code>，则结果是<code>Infinity</code>
- 如果是<code>-Infinity</code>加<code>-Infinity</code>，则结果是<code>-Infinity</code>
- 如果是<code>Infinity</code>加<code>-Infinity</code>，则结果是<code>NaN</code>
- 如果是+0加+0，则结果是+0
- 如果是-0加-0，则结果是-0
- 如果是+0加-0，则结果是+0
- 如果一个操作数为数值，另一个为对象，则调用对象的`valueOf()`方法并用返回值进行计算，若另一个操作数为布尔值、`null`或`undefined`，则先用`Number()`函数将其转换为数值，然后再进行计算

不过如果有一个操作数为字符串，就要应用如下规则：

- 如果两个操作数都是字符串，则将第二个字符串和第一个连接起来
- 如果只有一个操作数是字符串，则将另一个操作数转化为字符串，然后再将两个字符串连接起来

- 如果另一个操作数是对象、数值或布尔值，则调用他们的<code>toString()</code>方法取得相应的字符串值，然后再应用关于前面的字符串规则。对于<code>undefined</code>和<code>null</code>，则分别调用<code>String()</code>函数并取得字符串<code>"undefined"</code>和<code>"null"</code>。

```javascript
console.log(NaN + 100); // NaN
console.log(Infinity + Infinity); // Infinity
console.log(-Infinity - Infinity); // -Infinity
console.log(Infinity - Infinity); // NaN
console.log(+0 + 0); // +0
console.log(-0 - 0); // -0
console.log(+0 - 0); // +0
console.log("ame" + " haha"); // ame haha
console.log("ame" + true); // ametrue
console.log("ame" + undefined); // ameundefined
console.log("ame" + null); // amenull
```

#### 减法（-）

与加法操作符类似，ECMAScript中的减法操作符再处理各种数据类型转换时，同样要遵循一些特殊规则，如下所示：

- 如果两个操作数都是数值，则执行常规的算数减法操作并返回结果
- 如果有一个操作数是<code>NaN</code>，则结果是<code>NaN</code>
- 如果是<code>Infinity</code>减<code>Infinity</code>，则结果是<code>NaN</code>
- 如果是<code>-Infinity</code>减<code>-Infinity</code>，则结果是<code>NaN</code>
- 如果是<code>Infinity</code>减<code>-Infinity</code>，则结果是<code>Infinity</code>
- 如果是<code>-Infinity</code>减<code>Infinity</code>，则结果是<code>-Infinity</code>
- 如果是+0减+0，结果是+0
- 如果是-0减0，结果是-0
- 如果是-0减-0，结果是+0
- 如果有一个操作数是字符串、布尔值、<code>null</code>或<code>undefined</code>，则先在后台调用<code>Number()</code>函数将其转换为数值，然后在根据前面的规则执行减法计算。如果转换的结果为<code>NaN</code>，则结果为<code>NaN</code>
- 如果有一个操作数是对象，则调用对象的<code>valueOf()</code>方法取得表示该对象的数值。如果得到的值是<code>NaN</code>，则减法返回的结果为<code>NaN</code>。如果对象没有<code>valueOf()</code>方法，则调用其<code>toString()</code>方法并将得到的字符串转换为数值，接着应用上面的规则

```javascript
// 减法
console.log(1 + NaN); // nAn
console.log(Infinity - Infinity); // NaN
console.log(-Infinity - -Infinity); // NaN
console.log(Infinity - -Infinity); // Infinity
console.log(-Infinity - Infinity); // -Infinity
console.log(+0 - +0); // +0
console.log(-0 - 0); // -0
console.log(-0 - -0); // +0
console.log("1" - true); // 0
console.log(null - '1'); // -1
console.log(1 - undefined); // NaN
console.log({} - 0); // NaN
```

### 复合运算符

可以使用<code>*=、/=、+=、-=、%=</code>简写算数运算。

如<code>n *= 2</code>等同于`n *= 2`

```javascript
let n = 2;
n *= 2;
console.log(n); // 4
```

对变量加减相应数值

```javascript
let m = 2;
m += 3;
console.log(m); // 5
m -= 5;
console.log(m); // 0
```

`n += 3`是`n = n+3`简写形式

### 一元运算符

#### 前置操作

前置操作会在执行表达式前先执行，或者可以理解成在读取当前变量的值前先执行

```javascript
let n = 1;
++n;
console.log(n); // 2
--n;
console.log(n); // 1
console.log(1 + ++n); // 1 + 2 = 3
```

`++n`就是`n = n + 1`的简写形式.。

#### 后置操作

后置操作会在表达式执行后再执行，或者可以理解成获取当前变量值后再执行操作

```javascript
let n = 2;
let f = 30 + n++ + n++; // 30 + 2 + 3
console.log(f); // 35
console.log(n); // 4
```

### 比较运算符

| 运算符 | 说明               |
| ------ | ------------------ |
| >      | 大于               |
| <      | 小于               |
| >=     | 大于或等于         |
| <=     | 小于或等于         |
| ==     | 强制类型转换比较   |
| ===    | 不强制类型转换比较 |

#### 关系操作符

小于（<）、大于（>）、小于等于（<=）和大于等于（>=）这几个操作符属于关系操作符，与ECMAScript的其他操作符一样，当关系操作符的操作数使用了非数值时，也要进行数据类型转换或完成某些特殊的操作。以下就是相应的规则：

- 如果两个操作数都是数值，则执行常规的数值比较
- 如果两个操作数都是字符串，则比较两个字符串所对应的字符编码值
- 如果一个操作数是数值，则将另一个操作数转换为数值，然后执行数值比较
- 如果一个操作数是对象，则调用这个对象的`valueOf()`方法，用得到的结果按照前面的规则执行比较。如果对象没有`valueOf()`方法，则调用`toString()`方法，并用得到的结果根据前面的规则执行比较
- 如果有一个操作数是布尔值，则先将其转换为数值，然后再执行比较。
- `NaN`与任何数值比较都返回`false`

```javascript
// 关系操作符
console.log(1 > 2); // false
// 比较两个字符串的每个字符的编码值
console.log("AAa" > "ABA");
console.log(1 < '3'); // true
let test = {
    valueOf() {
        return 100;
    }
};
console.log(99 < test); // true
console.log(true < 2); // true
console.log(NaN > 0); // false
console.log(NaN <= 0); // false
```

#### 相等操作符

##### 相等和不相等

在转换不同的数据时，相等（==）和不相等（!=）操作符会遵循以下基本规则：

- 如果两个操作数为数值，则进行常规的比较
- 如果有一个操作数为布尔值，则在比较之前先将其转化为数值——`false`转化为0，`true`转化为1
- 如果一个操作数为字符串，另一个操作数为数值，则在比较相等性之前先将字符串转化为数值
- 如果一个操作数时对象，另一个操作数不是，则调用对象的`valueOf()`方法，用得到的基本类型值按照前面的规则碱性比较
- `null`和`undefined`是相等的
- 要比较相等性之前，不能将`null`和`undefined`转化为其他任何值
- 如果有一个操作数为`NaN`，则相等操作符返回`false`，而不相等操作符返回`true`。重要提示：即使两个操作数都是`NaN`，则相等操作符返回`false`；因为按照规则，`NaN`不等于`NaN`
- 如果两个操作数都是对象，则比较它们是不是同一个对象。如果两个操作数都指向同一个对象，则返回`true`；否则，返回`false`

```javascript
console.log(1 == 1); // true
console.log(true == 1); // true
console.log('2' == 2); // true
let test = {
    valueOf: () => 100
};
let test2 = test;
console.log(100 == test); // true
console.log(null == undefined); // true
console.log(0 == NaN); // false
console.log(NaN == NaN); // false
console.log(test2 == test); // true
```

##### 全等和不全等

全等操作符除了不会对操作数进行类型转换之外，其他和相等操作符没什么区别

```javascript
console.log(1 === 1); // true
console.log(NaN === undefined); // false
let test = {
    valueOf: () => 100
};
console.log(test === 100); // false
```

#### 例子

以下实例不允许年龄超过90岁

```html
<input type="text" name="age" />
<span id="msg"></span>

<script>
    // 不允许年龄超过90岁
    const span = document.querySelector("#msg");
    const input = document.querySelector("input[name='age']");
    input.addEventListener("keyup", function () {
        span.innerHTML = this.value >= 90 ? '年龄不能超过90岁' : `年龄：${this.value}`;
    });
</script>
```

![年龄不能超过90岁](images/年龄不能超过90岁1.png)

![年龄不能超过90岁](images/年龄不能超过90岁2.png)

### 位运算符

位操作符用于在最基本的层次上，即按内存中表示数值的位来操作数值。ECMAScipt中的所有数值都以IEEE-754 64位格式存储，但位操作符并不直接操作64位的值。而是先将64位的值转换成32位的整数，然后执行操作，最后再将结果转化为64位。

对于有符号整数，32位中的前31位用于表示整数的值。第32位用于表示整数的符号：0表示正数，1表示负数。这个表示符号的位叫作符号位，符号位的值决定了其他位数值的格式。

负数同样以二进制码存储，但是用的格式是二进制的补码。计算一个二进制的补码，需要经过以下三个步骤：

1. 求这个数值绝对值的二进制码
2. 求二进制反码，即将0替换成1，把1替换成0
3. 得到的二进制反码加1

当对数值应用位操作符时，会发生如下转化过程：64位的数值被转化成32位数值，然后执行位操作，最后再将32位的数值转化为64位数值。这样，表面看起来就好像是再操作32位数值，就像再其他语言中以类似方式执行二进制操作一样。但这个转化过程也导致了一个严重的副效应，即在对特殊的`NaN`和`Infinity`值应用位操作时，这两个值都会被当成0来处理。

如果对非数值应用位操作符，会先使用`Number()`函数将该值转化成一个数值（自动完成），然后再应用位操作。得到的结果将会是一个数值。

#### 按位非（NOT）

按位非操作符由一个波浪线（`~`）表示，执行按位非的结果就是返回该数值的反码

按位非操作的本质：操作数的负值减一

```javascript
let num = 2; // 二进制码：10
console.log(~num); // -3
```

#### 按位与（AND）

按位与操作符由一个和号字符（`&`）表示，它有两个操作数。从本质上讲，按位与操作就是将两个数值的每一位对齐，然后根据下表中的规则，对相同位置的两个数执行AND操作

| 第一个数值的位 | 第二个数值的位 | 结果 |
| -------------- | -------------- | ---- |
| 1              | 1              | 1    |
| 1              | 0              | 0    |
| 0              | 1              | 0    |
| 0              | 0              | 0    |

简而言之，按位与操作只在两个数值对应位都是1才返回1，任何一位是0，结果都是0

```javascript
console.log(3 & 2); // 2
```

#### 按位或（OR）

按位或操作符由一个竖线符号（`|`）表示，同样也有两个操作数。按位或遵循下面这个真值表。

| 第一个数值的位 | 第二个数值的位 | 结果 |
| -------------- | -------------- | ---- |
| 1              | 1              | 1    |
| 1              | 0              | 1    |
| 0              | 1              | 1    |
| 0              | 0              | 0    |

由此可见，按位或操作在有一个是1的情况下就返回1，而只有在两个位都是0的情况下才返回0

```javascript
console.log(3 | 2); // 3 
```

#### 按位异或（XOR）

按位异或操作符由一个插入符号（`^`）表示，也有两个操作数。下面是按位异或的真值表

| 第一个数值的位 | 第二个数值的位 | 结果 |
| -------------- | -------------- | ---- |
| 1              | 1              | 0    |
| 1              | 0              | 1    |
| 0              | 1              | 1    |
| 0              | 0              | 0    |

按位异或与按位或的不同之处在于，这个操作只有在两个数值对应位上只有一个1是才返回1，如果对应的两位都是1或者都是0，则返回0

```javascript
console.log(3 ^ 2); // 1
```

#### 左移

左移操作符由两个小于号（`<<`）表示，这个操作符会将数值的所有位向左移动指定的位数，向左移动后，原数值右侧多出来的空位会被0填充，以便得到一个完整的32位二进制数

```javascript
console.log(1 << 1); // 2
```

注意：左移不会影响操作数的符号位。比如将-2向左移5位，结果将是-64，而非64

#### 有符号右移

有符号右移操作符由由两个大于号（`>>`）表示，这个操作符会将数值向右移动，但保留符号位（即正负号标记）。有符号右移与左移操作恰好相反，即如果将64向右移动5位，结果将变为2。

同样，在位移过程中，原数值也会出现空位。只不过这次的空位出现在原数值的左侧，符号位的右侧。而此时ECMAScript会用符号位的值来填充所有空位，以便得到一个完整的值。

```javascript
console.log(-64 >> 5); // -2
```

#### 无符号右移

无符号右移操作符由3个大于号（`>>>`）表示，这个操作符会将数值的所有32位（包括符号位）向右移动。对正数来说，无符号右移的结果与有符号右移相同。对负数来说，情况就不一样了；首先，无符号右移是用0来填充空位，而不是像有符号右移那样以符号位来填充空位；其次，无符号右移操作符会把负数的二进制码当成正数的二进制码；而且，由于负数以其绝对值的二进制补码形式表示，因此就会导致负数的无符号右移结果非常大。

```javascript
console.log(-1 >>> 3); //536870911
```

### 逻辑运算符

#### 逻辑与

使用`&&`符号表示逻辑与，值符号两端的操作数都为`true`时返回`true`。逻辑与操作可以用于任何类型的操作数，而不仅仅是布尔值。在有一个操作数不是布尔值的情况下，逻辑与操作就不一定返回布尔值；此时，它遵循下列规则：

- 如果第一个操作数是对象，则返回第二个操作数
- 如果第二个操作数是对象，则只有在第一个操作数为`true`的情况下才会返回该对象
- 如果第一个操作数为`null`则返回`null`
- 如果第一个操作数为`NaN`则返回`NaN`
- 如果第一个操作数为`undefined`则返回`undefined`

逻辑与操作属于短路操作，即如果第一个操作数能决定结果（为`false`），那么就不会再对第二个操作数求值。

```javascript
// 逻辑与
console.log(true && true); // true
console.log(true && {}); // {}
console.log(null && 1); // null
console.log(undefined && 1); // undefined
```

#### 逻辑或

使用`||`符号表示逻辑或，指符号左右两端有一方为`true`，则返回`true`

与逻辑与操作相似，如果有一个操作数不是布尔值，逻辑或也不一定返回布尔值；此时，它遵循下列规则：

- 如果第一个操作数是对象，则返回第一个操作数
- 如果第一个操作数求值为`false`，则返回第二个操作数
- 如果两个操作数是对象，则返回第一个操作数
- 如果两个操作数为`null`，则返回`null`
- 如果两个操作数是`NaN`，则返回`NaN`
- 如果两个操作数是`undefined`，则返回`undefined`

逻辑或操作也属于短路操作。也就是说，如果第一个操作数为`true`，则不会对第二个操作数求值了。

```javascript
console.log(true || false); // true
console.log(false || {}); // {}
console.log({name:'lsr'} || {}); // {name:'lsr'}
console.log(null || null); // null
console.log(NaN || NaN); // NaN
console.log(undefined || undefined); // undefined
```

#### 逻辑非

使用`!`符号表示逻辑非，可以应用于ECMAScriipt中的任何值。无论这个值属于什么数据类型，这个操作符都必定会返回一个布尔值。逻辑非操作符首先会先将他的操作数转化成一个布尔值，然后再对其求反。逻辑非操作遵循以下规则。

- 如果一个操作数是对象，则返回`false`
- 如果一个操作数是一个空字符串，则返回`true`
- 如果一个操作数是一个非空字符串，则返回`true`
- 如果操作数为数值0，则返回`true`
- 如果操作数为任意非0数值（包括`Infinity`），返回`false`
- 如果操作数是`null`，则返回`true`
- 如果操作数为`NaN`，则返回`true`
- 如果操作数为`undefined`，则返回`true`

逻辑非操作符也可以用于将一个值转换为与其对应的布尔值。而同时使用两个逻辑非操作符，实际上就会模拟`Boolean()`转型函数的行为。

```javascript
// 逻辑非
console.log(!!{}); // true
console.log(!''); // true
console.log(!'1'); // false
console.log(!0); // true
console.log(!1); // false
console.log(!null); //true
console.log(!undefined); // true
console.log(!NaN); // true
```

#### 优先级

下列中因为`&&`的优先级高所以结果为`true`

```javascript
console.log(true || false && false); // true
```

可以使用`()`来提高优先级

```javascript
console.log((true || false) && false); // false
```

#### 密码对比实例

```html
<input type="text" name="password" />
<input type="text" name="confirm_password" />
<br />
<span name="msg"></span>

<script>
    function queryByName(name) {
        return document.querySelector(`[name = '${name}']`);
    }
    const inputs = document.querySelectorAll("[name = 'password'],[name = 'confirm_password']");
    [...inputs].map(item => {
        item.addEventListener("keyup", () => {
            let msg = '';
            if (queryByName('password').value.length < 5 || queryByName('password').value != 					queryByName('confirm_password').value) {
                msg = '两次密码不一致或密码长度小于5';
            }
            queryByName('msg').innerHTML = msg;
        });
    });
</script>
```

![密码对比实例](images/密码对比实例.gif)

#### 短路运算

下例中的`a`为真值，已经知道了结果就不会再判断`b`的值了

```javascript
let a = true,b = false;
console.log(a || b); // true
```

同理当`b`为假值时，就已经可以判断`&&`的结果了，就没有判断`a`的必要了

```javascript
let a = true,b = false;
console.log(b && a); // false
```

使用短路特性赋值

```javascript
let sex = prompt("你的性别是：") || "保密";
console.log(sex);
```

当`opt.url`没有值时，使用短路特性设置`url`的值

```javascript
function getUrl(opt) {
    opt.url = 'wasser.net.cn';
}
opt.url || getUrl(opt);
console.log(opt.url); // wasser.net.cn
```

#### 表单协议实例

下面的例子在用户输入表单并接受协议后才可以提交

```html
<form action="http://wasser.net.cn" id="form">
    <label for="username">用户名：</label>
    <input type="text" name="username" id="username" />
    <hr />
    <input type="checkbox" name="copyright" id="copyright" />
    <label for="copyright">接受协议</label>
    <hr />
    <input type="submit" />
</form>

<script>
    function query(el) {
        return document.querySelector(el);
    }
    query('#form').addEventListener("submit", function (event) {
        let username = query('input[name="username"]').value;
        let copyright = query('input[name="copyright"]').checked;
        if (!username || !copyright) {
            alert("请填写用户名并接受协议！");
            // 阻止默认行为
            event.preventDefault();
        }
    });
</script>
```

![表单协议实例](images/表单协议实例.png)

## 流程控制

### if

当条件为真时执行表达式或代码块。判断条件可以是任意表达式；而且对这个表达式求值的结果不一定是布尔值；ECMAScript会自动调用`Boolean()`转换函数将这个表达式的结果转化为一个布尔值。

```javascript
let state = true;
if (state) {
    console.log("表达式成立");
}
```

如果代码块中只有一条语句，可以不写`{}`

```javascript
let state = true;
if (state) console.log("表达式成立！");
```

将对象转换成了布尔值`true`

```javascript
if ({}) {
    console.log("将对象转换为了布尔值！");
}
```

### if / else

当前一个`if`条件判断不成立时，会执行`else`中的代码

```javascript
let num = parseInt(prompt("请输入一个数字："));
if (num > 25) {
    console.log("Greater than 25"); // num 大于 25，执行这条语句，不会往下判断了
} else if (num < 0) {
    console.log("num less than 0"); // num 不大于 25且 num < 0，执行这条语句
} else {
    console.log("Between 0 and 25"); // 前两个条件都不满足，执行这条语句
}
```

### 例子：判断密码强度

```html
<input type="password" name="password" />
<span></span>

<script>
    const input = document.querySelector("[name='password']");
    const span = document.querySelector("span");
    input.addEventListener("keyup", function () {
        let length = this.value.length;
        let msg;
        if (length > 10) {
            msg = '你的密码牛牛牛！';
        } else if (length > 6) {
            msg = '密码强度高';
        } else {
            msg = '垃圾密码';
        }
        span.innerHTML = msg;
    });
</script>
```

![密码强度实例](images/密码强度实例.gif)

### 三元表达式

三元表达式是针对`if`判断的简写形式。注意三元表达式虽然简便，但不应该过多嵌套，因为这样会使代码易读性大打折扣，得不偿失。

```javascript
let n = true ? 1 : 2;
console.log(n); // 1
let m = true ? (1 == true ? 'yes' : 'no') : 'haha';
console.log(m); // yes
```

下面是创建DIV元素的示例，使用三元表达式赋初始值

```javascript
function appendDiv(options = {}) {
    const div = document.createElement("div");
    div.style.width = options.width ? options.width : "100px";
    div.style.height = options.height ? options.height : "100px";
    div.style.backgroundColor = options.bgColor ? options.bgColor : 'red';
    document.body.append(div);
}
appendDiv();
appendDiv({
    width: '200px',
    height: '200px',
    bgColor: 'blue'
});
```

![三元表达式](images/三元表达式.png)

### switch

可以将`switch`理解为`if`的另一种结构清晰的写法。

- 如果表达式等于`case`中的值，将执行此`case`代码块
- `break`关键字会终止`switch`的执行
- 没有任何`case`匹配时将执行`default`代码块
- 如果`case`执行后缺少`break`将接着执行后面的语句

```javascript
let name = 'lsr';
switch (name) {
    case 'hahaha':
        console.log("哈哈哈");
        break;
    case 'lsr':
        console.log("LiStarRain");
        break;
    default:
        console.log("Ame");
}
```

case合用示例

```javascript
let error = 'notice';
switch (error) {
    case 'notice':
    case 'warning':
        console.log('警告或提示信息');
        break;
    case 'error':
        console.log('错误信息');
}
```

在`switch`与`case`中都可以使用表达式

```javascript
function message(age) {
    switch (true) {
        case age < 15:
            console.log("熊孩纸");
            break;
        case age < 25:
            console.log("青少年");
            break;
        case age < 40:
            console.log("青年");
            break;
        case age < 60:
            console.log("中年");
            break;
        case age < 100:
            console.log("老年");
            break;
        default:
            console.log("年龄输出错误");
    }
}
message(10); // 熊孩纸
```

下面的例子缺少`break`后，会接着执行后面的代码

```javascript
// 结果 1 2 3
switch (1) {
    case 1:
        console.log(1);
    case 2:
        console.log(2);
    default:
        console.log(3);
}
```

### while

循环执行语句，需要设置跳出循环的条件，否则会进入死循环。

下面是循环输出表格的示例

```javascript
let row = 5;
document.write('<table border = "1" width = "100px" align="center">');
while (row--) {
    document.write(`<tr><td>${row}</td><tr>`);
}
document.write('</table>');
```

![循环输出表格](images/循环输出表格.png)

### do/while

后条件判断语句，无论条件是否为真都会先执行一次循环体。

下面通过循环输出三角形示例，要注意设置循环跳出的时机来避免死循环。

```javascript
function rain(row = 5) {
    let start = 0;
    do {
        let n = 0;
        do {
            document.write('*');
        } while (++n <= start);
        document.write('<br/>');
    } while (++start <= row);
}
rain();
```

![杨辉三角](images/do-while.png)

### for

`for`循环可以用在知道循环次数的情况下使用。它可以在循环前初始化初始计算变量。

下面是使用`for`打印倒三角的示例

```javascript
for (let i = 10; i > 0; i--) {
    for (let k = 0; k < i; k++) {
        document.write('*');
    }
    document.write('<br/>');
}
```

![倒三角](images/for.png)

### 例子：循环打印杨辉三角

下面是使用循环制作杨辉三角的案例

```javascript
for (let i = 1; i <= 5; i++) {
    for (let k = 5 - i; k > 0; k--) {
        document.write('-');
    }
    for (let m = 2 * i - 1; m > 0; m--) {
        document.write('*');
    }
    document.write('<br/>');
}
```

![杨辉三角](images/杨辉三角.png)

`for`的三个参数可以都省略或取几个

```javascript
let i = 1;
for (; i < 10;) {
    console.log(i++);
}
```

### break/continue

`break`用于退出循环，`continue`用于退出本次循环并开始下一次循环。

获取所有偶数，所有奇数使用`continue`跳过

```javascript
for (let i = 1; i <= 10; i++) {
    if (i % 2) continue;
    console.log(i);
}
```

获取三个奇数，超过3个时用`break`跳出循环

```javascript
let count = 0, num = 3;
for (let i = 1; i <= 10; i++) {
    if (i % 2) {
        console.log(i);
        if (++count === num) break;
    }
}
```

### label

标签`label`可以为程序定义位置，可以使用`continue/break`跳到该位置。

下面取`i+n`大于15时退出循环

```javascript
ame: for (let i = 0; i <= 10; i++) {
    lsr: for (let n = 1; n <= 10; n++) {
        if (n % 2) {
            continue lsr;
        }
        console.log(i, n);
        if (i + n > 15) {
            break ame;
        }
    }
}
```

### for / in

用于遍历对象的所有属性，`for/in`主要用于遍历对象，不建议用来遍历数组。

遍历数组操作

```javascript
let users = [{ name: 'lsr',age: 22},
             {name: 'ame',age: 21},
             { name: 'lxy',age: 90}];
document.write(`
	<table border = '1' width='100%' align = 'center'>
		<thead><tr><th>姓名</th><th>年龄</th></thead>
		<tbody>
`);
for (let key in users) {
    document.write(`
	<tr>
		<td>${users[key].name}</td>
		<td>${users[key].age}</td>
	</tr>
	`);
}
document.write('</tbody></table>');
```

![遍历数组](images/for-in.png)

遍历对象操作

```javascript
let user = {
    name: 'lsr',
    age: 22
};
for (const key in user) {
    // 注意 for-in 会遍历原型链
    if (user.hasOwnProperty(key)) {
        console.log(user[key]);
    }
}
```

遍历`window`对象的所有属性

```javascript
for (const name in window) {
    console.log(name);
}
```

### for / of

用来遍历Arrays（数组），Strings（字符串），Maps（映射），Sets（集合）等可迭代数据结构。

与`for/in`不同的是`for/of`每次循环会取其中的值而不是取索引。

遍历数组

```javascript
let arr = [1, 2, 3, 4, 5];
for (const value of arr) {
    console.log(value);
}
```

使用迭代器特性来遍历数组

```javascript
const users = ['ame', 'lsr', 'lxy'];
for (const [key, value] of users.entries()) {
    console.log(key, value);
}
```

使用`for/of`也可以用来遍历DOM元素

```html
<ul>
    <li>1</li>
    <li>2</li>
</ul>

<script>
    const lis = document.querySelectorAll("li");
    for (const li of lis) {
        li.addEventListener("click", function () {
            console.log(this.textContent);
        });
    }
</script>
```

# 基本类型

## 类型检测

### typeof

`typeof`操作符用于返回以下原始类型

- 基本类型：number/string/boolean
- function
- object
- undefined
- symbol

可以使用`typeof`用于判断数据的类型

```javascript
let a = 1;
console.log(typeof a); // number
let b = '1';
console.log(typeof b); // string
// 未赋值或不存在的变量返回 undefined
let ame;
console.log(typeof ame); // undefined
function run() {}
console.log(typeof run); // function
let c = [1,2,3];
console.log(typeof c); // object
let d = {name: 'lsr', age: 22};
console.log(typeof d); // object
```

### instanceof

`instanceof`运算符用于检测操作符右边构造函数的原型对象是否在操作符左边对象的原型链上。

可以简单理解为检测一个对象是否是某个构造函数的实例，`typeof`不能区分数组，但是`instanceof`可以。

```javascript
let ame = [];
let lsr = {};
console.log(ame instanceof Array); // true
console.log(lsr instanceof Array); // false

let c = [1,2,3];
console.log(c instanceof Array); // true

let d = {name: 'lsr'};
console.log(d instanceof Object); // true

function User() {}
console.log(new User() instanceof User); // true
```

### 值类型与对象

下面是使用字面量与对象方法创建字符串，返回的是不同类型

```javascript
let ame = 'ame';
let lsr = new String('lsr');
console.log(typeof ame); // string
console.log(typeof lsr); // object
```

正常情况下只有对象才可以调用方法，但在JS中却可以使用值来调用方法，这是因为每当读取值的时候JS会在后台创建一个对应的基本包装类型的对象，从而能够让我们调用一些方法来操作这些数据。基本包装类型有：`Number`、`String`和`Boolean`

## String

字符串类型是使用非常多的数据类型，也是相对简单的数据类型。

### 声明定义

使用对象形式创建字符串

```javascript
let ame = new String('ame');
// 获取字符串长度
console.log(ame.length); // 3
// 获取字符串
console.log(ame.toString()); // ame
```

字面量形式创建字符串。字符串使用单、双引号包裹，使用单、双引号结果没有区别

```javascript
let content = 'hahaha';
console.log(content); // hahaha
```

### 转义符号

有些特殊字符有双层含义，需要使用`\`转义符号来对特殊字符进行含义转换。下列符号引号为字符串定界符，如果需要输出引号，则必须要对它进行转义。

```javascript
let content = 'ame \'Ame\'';
console.log(content); // ame 'Ame'
```

常用转义符号列表如下：

| 符号 | 说明     |
| ---- | -------- |
| \t   | 制表符   |
| \n   | 换行     |
| \\   | 斜杠符号 |
| \\'  | 单引号   |
| \\"  | 双引号   |

### 连接运算符

使用`+`可以连接多个内容组合成的字符串，经常用于组合输出内容时使用。

```javascript
let year = 2020, name = 'ame';
console.log(name + '在' + year + '年');
```

使用`+=`可以在字符串上追加字符内容

```javascript
let web = 'wasser';
web += '.net.cn';
console.log(web); // wasser.net.cn
```

### 模板字面量

使用反引号（``）包裹的字符串可以写入引入变量与表达式

```javascript
let name = 'ame';
console.log(`姓名：${name}`); // 姓名：ame
```

支持换行操作不会产生错误

```javascript
let url = 'wasser.net.cn';
document.write(`网址：
${url}`);
```

使用表达式

```javascript
function show() {
    return 'hi';
}
console.log(`${show()}`);
```

模板字面量支持嵌套使用

```javascript
let users = [{name: 'ame'},{name:'lsr'},{name: 'lxy'}];
function template() {
    return `<ul>
			${users.map(item => `<li>${item.name}</li>`).join('')}
		</ul>`;
}
document.body.innerHTML = template();
```

![模板字面量](images/字符串模板.png)

### 标签模板

标签模板是提取出普通字符串与变量，交由标签函数处理

```javascript
let lesson = 'css';
let name = 'ame';
tag `一个叫${name}的人在学习${lesson}`;

function tag(strings, ...values) {
    console.log(strings); // ["一个叫","的人在学习",""]
    console.log(values); // ["ame","css"]
}
```

下面的例子将列表中的“炸鸡”使用标签模板加上链接

```javascript
    let lessons = [{
        title: '我想吃炸鸡',
        author: 'ame'
      },
      {
        title: '啤酒和炸鸡',
        author: 'rain'
      },
      {
        title: '炸鸡真好吃',
        author: 'lsr'
      }
    ];

    function links(strings, ...values) {
      return strings.map((str, index) => {
        return (str + (values[index] ? values[index].replace(/炸鸡/, $1 =>
            `<a href='http://bilibili.com'>${$1}</a>`) :
          ''));
      }).join('');
    }

    function template() {
      return `<ul>
        ${lessons.map(item => links `<li>${item.author}：${item.title}</li>`).join('')}
      </ul>`;
    }
    document.body.innerHTML = template();
```

![标签模板](images/标签模板.png)

### 获取长度

使用`length`属性可以获取字符串长度

```javascript
console.log('ame'.length); // 3
```

大小写转换

使用`toUpperCase()`方法将字符转换成大写格式

```javascript
console.log("ame".toUpperCase()); // AME
```

使用`toLowerCase()`方法将字符转换成小写形式

```javascript
console.log("AME".toLowerCase()); // ame
```

### 移除空白

使用`trim()`方法删除字符串左右的空白字符

```javascript
let str = '  am e  ';
console.log(str.length); // 8
console.log(str.trim()); // am e
console.log(str.trim().length); // 4
```

使用`trimLeft()`方法删除字符串左边空白，使用`trimRight()`删除字符串右边空白

```javascript
let name = ' ame ';
console.log(name);
console.log(name.trimLeft());
console.log(name.trimRight());
```

### 获取单字符

根据从0开始的位置获取字符

```javascript
console.log('ame'.charAt(0)); // a
```

使用数组索引的方式获取字符串

```javascript
console.log('ame' [1]); // m
```

获取单字符的ASCII编码

```javascript
console.log('ame'.charCodeAt(0)); // 97
```

### 截取字符串

使用`slice()`、`substr()`、`substring()`方法都可以截取字符串，三个方法都不会改变原始字符串，而是会返回一个新的字符串。

- `slice()`、`substring()`第二个参数为截取的结束位置
- `substr()`第二个参数指定截取字符的数量

在传递给这些方法的参数是负值的情况下，它们的行为就不尽相同了。其中，`slice()`方法会将传入的负值与字符串的长度相加；`substr()`方法将负的第一个参数加上字符串的长度，将负的第二个参数转换为0；最后，`substring()`方法会把所有负值参数转化为0，但这个方法会将较小的数作为开始位置，将较大的数作为结束位置。

```javascript
let content = '我饿了，要吃饭';
console.log(content.slice(0, 2)); // 我饿
console.log(content.slice(-2, -1)); // 吃
console.log(content.substring(0, 3)); // 我饿了
console.log(content.substring(3, -1)); // 我饿了
console.log(content.substr(4, 2)); // 要吃
console.log(content.substr(-2, 2)); // 吃饭
```

### 查找字符串

`indexOf()`方法从字符串首开始查询字符串位置，检测不到时返回`-1`，第二个参数可以传入检测字符串的开始位置

```javascript
console.log('amea'.indexOf('a')); //  0
console.log('amea'.indexOf('a', 1)); //  3
```

`lastIndexOf()`从字符串结尾开始搜索字符串位置，检测不到时返回`-1`，第二个参数可以传入检测字符串的开始位置

```javascript
console.log('apple'.lastIndexOf("p")); // 2
console.log("apple".lastIndexOf("p", 1)); // 1
```

`search()`方法用于检索字符串中指定的子字符串，也可以使用正则表达式来搜索，检测不到时返回`-1`，`search()`方法始终从字符串开头向后查找

```javascript
let content = '我困了，想睡觉';
console.log(content.search("睡")); // 5
console.log(content.search("a")); // -1
console.log(content.search(/我/)); // 0
```

`includes()`方法可以检测字符串中是否包含指定的值，传入第二个参数可以指定检测的开始位置，找到时返回`true`，反之返回`false`

```javascript
// includes()方法
console.log("我倦了".includes("了", 1)); // true
console.log("我倦了".includes("哈")); // false
```

`startsWith()`方法可以检测字符串是否由指定的子字符串开始。第二个参数可以设置检测的开始位置

```javascript
// startWith() 方法
console.log("rain".startsWith("r")); // true
console.log("rain".startsWith("r", 1)); // false
```

`endsWidth()`方法用于检测字符串是否以指定的子字符串结尾，第二个参数可以设置检测的结束位置

```javascript
// endsWith() 方法
console.log("Ame".endsWith("m", 2)); // true 注意区间一般都是左开右闭
console.log("Ame".endsWith('e')); // true
```

下面是查找关键词的示例

```javascript
const words = ["厕所", "手机"];
const text = "我喜欢边上厕所边玩手机";
const status = words.some(word => text.includes(word));
console.log(status); // true
```

### 替换字符串

`replace()`方法用于字符串的替换操作

```javascript
const content = '多喝热水';
let message = content.replace("热水", "岩浆");
console.log(message); //多喝岩浆
```

默认只替换一次，如果想要全局替换可以使用正则表达式

```javascript
let str = '2020/11/28';
console.log(str.replace(/\//ig, '-')); // 2020-11-28
```

使用字符串替换来生成关键词链接

```javascript
// 生成关键词链接
const words = ['优惠券', '买东西'];
const content = '我喜欢抢优惠券但是不买东西';
const text = words.reduce((pre, word) => {
    return pre.replace(word, `<a href='?word=${word}'>${word}</a>`);
}, content);
document.body.innerHTML = text;
```

![字符串替换](images/字符串替换.png)

`replace()`方法的第二个参数也可以传入一个回调函数

```javascript
let message = "你吃了吗，我吃了";
let res = message.replace(/吃/g, () => '睡');
console.log(res); //你睡了吗，我睡了
```

### 重复生成

`repeat()`方法可以重复生成指定的字符串，参数传入需要重复生成的次数

下列是根据参数重复生成相应数量的星号

```javascript
function star(num = 3) {
    return '*'.repeat(num)
}
console.log(star()); //***
```

下列是模糊电话号码

```javascript
let phone = '13000000111';
console.log(phone.slice(0, 3) + '*'.repeat(phone.length - 6) + phone.slice(-3)); // 130*****111
```

### 类型转换

分割字符串，将其转换为数组

```javascript
const content = '啪的一下，很快啊';
console.log(content.split('，')); // ["啪的一下", "很快啊"]
```

隐式类型转换

```javascript
console.log(1 + '2'); // 12
```

使用`String()`构造函数显示转换字符串类型

```javascript
let num = 99;
console.log(typeof String(num)); // string
```

JavaScript中大部分类型都是对象，可以使用原型方法`toString()`转化为字符串

```javascript
let test = 99;
console.log(typeof test.toString()); // string
let arr = [1, 2, 3];
console.log(arr.toString()); // 1,2,3
```

## Boolean

布尔类型包括`true`与`false`两个值，这是我们经常使用到的数据类型

### 声明定义

使用构造函数创建布尔类型

```javascript
console.log(new Boolean(true)); // Boolean {true}
console.log(new Boolean(false)); // Boolean {false}
```

推荐使用字面量的形式来创建布尔类型的值

```javascript
let ame = true;
console.log(typeof ame); // boolean
```

### 隐式转换

基本上所有类型都可以转换为`Boolean`类型

| 数据类型  | true             | false            |
| --------- | ---------------- | ---------------- |
| String    | 非空字符串       | 空字符串         |
| Number    | 非0数值          | 0或NaN           |
| Array     | 数组不参与比较时 | 参与比较的空数组 |
| Object    | 所有对象         | 无               |
| undefined | 无               | undefined        |
| null      | 无               | null             |

当`Boolean`类型的值在比较时，会进行隐式类型转换，`true`转为1，`false`转为0

```javascript
console.log(3 == true); //false
console.log(0 == false); //true
```

下面是一个典型的例子，字符串在与`Boolean`类型的值比较时，两边都转换为数值后再进行比较

```javascript
console.log(Number('ame')); // NaN
console.log(Boolean('ame')); //true
console.log("ame" == true); // false
console.log("1" == true); //true
```

数组的表现与字符串原理一样，在比较时，会先将它转化为数值

```javascript
console.log(Number([])); // 0
console.log(Number([3])); // 3
console.log(Number([1, 2, 3])); // NaN
console.log([] == false); //true
console.log([1] == true); // true
console.log([1, 2, 3] == true); // false
```

引用类型的布尔值为真，如对象和数组

```javascript
if ([]) console.log(true); // true
if ({}) console.log(true); // true
```

### 显式转换

使用`!!`转换为布尔类型

```javascript
let test = '';
console.log(!!test); //false
test = 0;
console.log(!!test); // false
test = null;
console.log(!!test); // false
test = new Date();
console.log(!!test); // true
```

使用`Boolean()`函数可以显式转换为布尔类型

```javascript
let ame = '';
console.log(Boolean(ame)); // fasle
ame = 0;
console.log(Boolean(ame)); // false
ame = null;
console.log(Boolean(ame)); // false
ame = new Date();
console.log(Boolean(ame)); // true
```

### 实例操作

下面使用`Boolean`类型判断用户的输入，并给出不同的反馈

```javascript
while (true) {
    let answer = prompt("请输入我的名字：").trim().toLowerCase();
    if (!answer) continue;
    alert(answer === 'ame' ? '回答正确' : '回答错误');
    break;
}
```

![判断用户输入](images/判断用户输入.gif)

## Number

### 声明定义

使用构造函数声明定义

```javascript
let ame = new Number(3);
console.log(ame); // Number {3}
console.log(ame + 3); // 6
```

`Number`用于表示正数和浮点数，数字是`Number`实例化的对象，可以使用对象所提供的丰富方法（因为他也是基本包装类型）。

```javascript
let num = 99;
console.log(typeof num); // number
```

### 基本函数

`isInterger()`静态方法可以判断一个数是否为整数

```javascript
// 判断是否为整数
console.log(Number.isInteger(100)); // true
```

`isFinite()`静态方法可以判断一个数是否为有限数

```javascript
console.log(Number.isFinite(100 / 0)); // false
```

`isNaN()`静态方法可以判断一个数是否不是一个数值

```javascript
console.log(Number.isNaN(NaN)); // true
```

### NaN

`NaN`表示无效的数值，下列计算的结果为`NaN`

```javascript
console.log(Number('ame'));
console.log(1 / 'ame');
console.log(3 * 'q');
```

注意`NaN`与任何数比较都为`false`，且`NaN`不等于`NaN`，因此它不能使用`==`来比较

```javascript
console.log(NaN == NaN); // false
if (Number.isNaN(2 / 'ame')) {
    console.log("error");
}
```

也可以使用`Object.is()`方法判断两个值是否完全相同

```javascript
console.log(Object.is(2 / 'ame', NaN)); // true
```

### 类型转换

#### Number

使用`Number()`函数基本上可以转换所有类型的数据，`Number()`函数的转换规则如下：

- 如果是`Boolean`值，`true`和`false`会被分别转换成1和0
- 如果是数字值，只是简单的传入和返回
- 如果是`null`值，返回0
- 如果是`undefined`值，返回`NaN`
- 如果是字符串，遵循下列规则：
  - 如果字符串中只包含数字（包括前面带正号或者带负号的情况），则忽略前导0，将其转换为十进制数值
  - 如果字符串中只包含有效的浮点格式，则忽略前导0，将其转换成对应的浮点数值
  - 如果字符串中包含有效的十六进制格式，例如"0xf"，则将其转换为相同大小的十进制整数值
  - 如果字符串是空的（不包含任何字符），则将其转换为0
  - 字符串包含上述格式之外的字符，则将它转换为`NaN`
- 如果是对象，则调用对象的`valueOf()`方法，然后依照前面的规则转换返回的值。如果转换的结果是`NaN`，则调用对象的`toString()`方法，然后再依照前面的规则转换返回的字符串值。

```javascript
console.log(Number('1.5ame')); // NaN
console.log(Number('true')); // 1
console.log(Number('100')); // 100
console.log(Number([])); // 0
console.log(Number(['99'])); // 99
console.log(Number([1, 2, 3])); // NaN
console.log(Number(null)); // 0
console.log(Number(undefined)); // NaN
console.log(Number({})); // NaN
```

#### parseInt

`parseInt()`函数可以提取字符串开始去除空白后的数字并将其转为整数

```javascript
console.log(parseInt('1.5ame')); // 1
console.log(parseInt('  99ame')); // 99
console.log(parseInt('0xa')); //10 16进制
```

parseFloat

转换字符串为浮点数，忽略字符串前面的空白字符

```javascript
console.log(parseFloat(' 99ame')); // 99
console.log(parseFloat("1.11ame")); // 1.11
```

比如从表单获取的数字是字符串类型的，我们需要将其转换成数值类型的值才能对它进行计算，下面使用乘法进行隐式类型转换

```javascript
let num = document.querySelector("input[name='num']").value;
console.log(num + 6); // 996
console.log(num * 1 + 6); // 105
```

### 舍入操作

#### toFixed

使用`toFixed()`方法可以对数值进行舍入操作，参数指定保存的小数位，返回的是数值的字符串形式

```javascript
console.log(1.55.toFixed(1)); // 1.6
```

#### toExponential

该方法返回以指数表示法表示的数值的字符串形式。与`toFixed()`一样，`toExponential()`也接收一个参数，该参数指定了输出结果中的小数位数，此方法同样有舍入效果

```javascript
console.log(0.000156.toExponential(1)); // 1.6e-4
```

#### toPrecision

对于一个数值来说，`toPrecision()`方法可能会返回固定大小（fixed）格式，也可能返回指数（exponential）格式；具体规则看哪种格式更合适。这个方法接收一个参数，即表示数值的所有数字的位数（不包括指数）部分。

```javascript
let num = 99;
console.log(num.toPrecision(1)); // 1e+2
console.log(num.toPrecision(2)); // 99
console.log(num.toPrecision(3)); // 99.0
```

### 浮点精度

大部分编程语言在浮点计算时都会有精度误差问题，下面来看JS中的表现形式

```javascript
let ame = 0.1 + 0.2;
console.log(ame); // 0.30000000000000004
```

这是因为计算机是以二进制来存储和处理数值类型的值的，上面的0.1与0.2转换为二进制后是无穷的

```javascript
console.log((0.1).toString(2)); //0.0001100110011001100110011001100110011001100110011001101
console.log((0.2).toString(2)); // 0.001100110011001100110011001100110011001100110011001101
```

处理方式

一种方式是使用`toFixed()`方法进行小数截取

```javascript
console.log((0.1 + 0.2).toFixed(1)); // 0.3

console.log(1.0 - 0.9); // 0.09999999999999998
console.log((1.0 - 0.9).toFixed(2)); // 0.10
```

将小数转为整数进行计算后，再转为小数也是可以解决精度问题

```javascript
Number.prototype.add = function (num) {
    // 取两个操作数中最大的小数位数
    let n1 = this.toString().split('.')[1].length;
    let n2 = num.toString().split('.')[1].length;

    // 得到10的n次幂
    let m = Math.pow(10, Math.max(n1, n2));

    return (this * m + num * m) / m;
};
console.log((0.1).add(0.2)); // 0.3
```

注意：我们再日常开发中尽量不要直接用小数来进行比较，避免引起一些难以发现的错误

推荐做法

利用一些专门针对数学计算的库来进行运算，如mathjs、decimal.js等。

如利用decimal.js来进行浮点计算

```html
<script src="https://cdn.bootcdn.net/ajax/libs/decimal.js/10.2.1/decimal.min.js"></script>
<script>
    let res = Decimal.add(0.1, 0.2).valueOf();
    console.log(res); // 0.3
    console.log(typeof res); // string
</script>
```

## Math

JS内置的`Math`类型提供了众多方法来进行数学计算，下面介绍常用的方法。

### 取极限值

使用`Math`类型的`min()`与`max()`方法可以取得最小值和最大值

```javascript
console.log(Math.min(1, 2, 3)); // 1
// 他会把字符串类型的值自动转化为数值类型
console.log(Math.max('1', '2')); // 2
```

利用函数类型的`apply()`方法来从数组中取值

```javascript
console.log(Math.max.apply(Math, ['3', 2, 1])); // 3
```

### 舍入处理

使用`Math`类型的`ceil()`方法取最接近的向上整数

```javascript
console.log(Math.ceil(1.01)); // 2
```

使用`Math`类型的`floor`方法得到最接近的向下整数

```javascript
console.log(Math.floor(1.9)); // 1
```

使用`Math`类型的`round()`方法进行四舍五入处理

```javascript
console.log(Math.round(1.5)); // 2
```

### 随机数

使用`Math`类型的`random()`方法可以返回`>=0`且`<1`的随机数（包括0但不包括1）。

返回0~5的随机数，不包括5

```javascript
// 返回0~5的随机数，不包括5
const number = Math.floor(Math.random() * 5);
console.log(number);
```

返回0~5的随机数，包括5

```javascript
// 返回0~5的随机数，包括5
const number = Math.floor(Math.random() * (5 + 1));
console.log(number);
```

下面取2~5的随机数（不包括5），公式为：
$$
min + Math.floor(Math.random() * (max - min))
$$

```javascript
const number = Math.floor(Math.random() * (5 - 2)) + 2;
console.log(number);
```

下面取2~5的随机数（包括5），公式为：
$$
min + Math.floor(Math.random() * (max - min + 1))
$$

```javascript
const number = Math.floor(Math.random() * (5 - 2 + 1)) + 2;
console.log(number);
```

随机点名示例：

```javascript
const students = ['丘丘人', '史莱姆', '猪猪怪'];
let pos = Math.floor(Math.random() * students.length);
console.log(students[pos]);
```

随机取第二到第三间的学生，即数组索引为1或2处的值：

```javascript
// 随机取第二到第三间的学生
const students = ['丘丘人', '史莱姆', '猪猪怪'];
let pos = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
console.log(students[pos]);
```

注意：`random()`方法产生的随机数是以当前的时间为种子而产生的伪随机数，可以手动传入参数设置随机数的种子。

```javascript
console.log(Math.random(new Date()));
```

## Date

在网站中处理日期时间是很常用的功能，通过`Date`类型提供的丰富功能可以非常方便地操作日期和时间

### 声明日期

获取当前日期时间。使用构造函数来初始化一个时间日期对象时会默认获取当前的日期时间

```javascript
// 获取当前的日期时间
let now = new Date();
console.log(now);
console.log(typeof now); // object
console.log(now * 1); // 获取时间戳（据1970年1月1日午夜至现在的毫秒数）
```

直接使用`Date()`函数获取当前的时间

```javascript
console.log(Date());
console.log(typeof Date()); // string
```

直接使用`Date`类型的`now()`方法获取当前时间戳 单位为毫秒

```javascript
console.log(Date.now());
```

计算代码执行时间

```javascript
// 计算代码执行时间
const start = Date.now();
for (let i = 0; i < 10000000; i++) {}
const end = Date.now();
console.log(end - start);
```

当然也可以使用控制台来进行测试

```javascript
console.time('testFor');
for (let i = 0; i < 10000000; i++) {}
console.timeEnd('testFor');
```

根据指定的日期与时间来定义日期对象

```javascript
// 根据指定的日期与时间来定义日期对象
let now = new Date("2020-11-29 10:40:11");
console.log(now); //Sun Nov 29 2020 10:40:11 GMT+0800 (中国标准时间)
// 月份从0开始算，0 对应 1月份
now = new Date(2020, 10, 29, 10, 42, 32);
console.log(now); // Sun Nov 29 2020 10:42:32 GMT+0800 (中国标准时间)
```

可以结合展开运算符来使用，更方便快捷

```javascript
let info = [2020, 10, 29, 10, 46, 29];
let date = new Date(...info);
console.dir(date); // Sun Nov 29 2020 10:46:29 GMT+0800 (中国标准时间)
```

### 类型转换

将日期转为数值类型就是将它转为时间戳，单位是毫秒

```javascript
let date = new Date('2020-11-29 10:52:12');
console.log(date * 1);
console.log(Number(date));
console.log(date.valueOf());
console.log(date.getTime());
```

将时间戳转换为标准日期的方法

```javascript
const params = [2020, 10, 29, 13, 55, 50];
const date = new Date(...params);
const timeStamp = date.getTime();
console.log(timeStamp);
console.log(new Date(timeStamp));
```

### 对象方法

格式化输出日期

```javascript
let time = new Date();
console.log(
    `${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()} 				${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
);
```

封装函数用于复用

```javascript
function dateFormat(date, format = 'YYYY-MM-DD HH:mm:ss') {
    const config = {
        YYYY: date.getFullYear(),
        MM: date.getMonth() + 1,
        DD: date.getDate(),
        HH: date.getHours(),
        mm: date.getMinutes(),
        ss: date.getSeconds()
    };
    for (const key in config) {
        format = format.replace(key, config[key]);
    }
    return format;
}
console.log(dateFormat(new Date(), 'YYYY年MM月DD日')); // 2020年11月29日
```

下面是系统提供的部分日期时间方法：

| 方法                 | 描述                                                       |
| :------------------- | ---------------------------------------------------------- |
| Date()               | 以字符串形式返回当日的日期和时间                           |
| getFullYear()        | 从Date对象中以四位数字的形式返回年份                       |
| getMonth()           | 从Date对象返回月份（0~11）                                 |
| getDate()            | 从Date对象中返回一个月的某一天（1~31）                     |
| getDay()             | 从Date对象中返回一周中的某一天（0~6），周天为0，以此类推   |
| getHours()           | 返回Date对象中的小时（0~23）                               |
| getMinutes()         | 返回Date对象的分钟（0~59）                                 |
| getSeconds()         | 返回Date对象的秒钟                                         |
| getMilleseconds()    | 返回Date对象的毫秒数（0~999）                              |
| getTime()            | 返回1970年1月1日至今的毫秒数                               |
| getTimezoneOffset()  | 返回本地时间与格林威治标准时间（GMT）的分钟差              |
| getUTCDate()         | 根据世界时从Date对象返回一个月中的某一天（1~31）           |
| getUTCDay()          | 根据世界时从Date对象中返回一周中的某一天（0~6）            |
| getUTCMonth()        | 根据世界时从Date对象中返回月份（0~11）                     |
| getUTCFullYear()     | 根据世界时从Date对象中返回四位数的年份                     |
| getUTCHours()        | 根据世界时从Date对象中返回小时（0~23）                     |
| getUTCMinutes()      | 根据世界时从Date对象中返回分钟（0~59）                     |
| getUTCSeconds()      | 根据世界时从Date对象中返回秒钟                             |
| getUTCMilliseconds() | 根据世界时从Date对象中返回Date对象的毫秒（0~999）          |
| parse()              | 该静态方法返回1970年1月1日午夜到指定日期（字符串）的毫秒数 |
| setFullYear()        | 设置Date对象中的年份（四位数字）                           |
| setMonth()           | 设置Date对象中的月份（0~11）                               |
| setDate()            | 设置Date对象中的某一天（1~31）                             |
| setHours()           | 设置Date对象的小时（0~23）                                 |
| setMinutes()         | 设置Date对象中的分钟（0~59）                               |
| setSeconds()         | 设置Date对象中的秒钟（0~59）                               |
| setMilliseconds()    | 设置Date对象中的毫秒（0~999）                              |
| setTime()            | 以毫秒数来设置Date对象                                     |
| setUTCFullYear()     | 根据世界时设置Date对象中的年份（四位数字）                 |
| setUTCMonth()        | 根据世界时设置Date对象中的月份（0~11）                     |
| setUTCDate()         | 根据世界时设置Date对象中月份的一天（1~31）                 |
| setUTCHours()        | 根据世界时设置Date对象中的小时（0~23）                     |
| setUTCMinutes()      | 根据世界时设置Date对象中的分钟（0~59）                     |
| setUTCSeconds()      | 根据世界时设置Date对象中的秒钟（0~999）                    |
| setUTCMilliseconds() | 根据世界时设置Date对象中的毫秒数（0~999）                  |
| toSource()           | 返回该对象的源代码                                         |
| toString()           | 把Date对象转换成字符串                                     |
| toTimeString()       | 把Date对象的时间部分转换为字符串                           |
| toDateString()       | 把Date对象的日期部分转换为字符串                           |
| toUTCString()        | 根据世界时，把Date对象转换为字符串                         |
| toLocaleString()     | 根据本地时间格式，把Date对象转换为字符串                   |
| toLocaleTimeString() | 根据本地时间格式，把Date对象的时间部分转换为字符串         |
| toLocaleDateString() | 根据本地时间格式，把Date对象的日期部分转换为字符串         |
| UTC()                | 该静态方法返回1970年1月1日午夜到指定日期的毫秒数           |
| valueOf()            | 返回Date对象的原始值（时间戳）                             |

```javascript
console.log(new Date().getTimezoneOffset()); // -400
console.log(Date.parse('2020-11-29')); // 1606608000000
console.log(new Date().toTimeString()); // 15:03:41 GMT+0800 (中国标准时间)
console.log(new Date().toLocaleDateString()); // 2020/11/29
console.log(Date.UTC(2020, 10, 29)); // 1606608000000
console.log(new Date().valueOf()); //1606633421322
```

# 数组类型 

## 声明数组

数组时多个变量值的集合，数组是`Array`构造函数的实例，而JS中函数本质上也是一个对象，是`Function`构造函数的实例，因此`Array`构造函数可以像对象一样调用方法。

### 创建数组

使用`Array`构造函数创建数组

```javascript
console.log(new Array(1, 'ame', true)); // [1, "ame", true]
```

推荐使用字面量形式来创建数组

```javascript
// 字面量形式创建数组
const users = ['ame', [1, 2, 3], true];
console.log(users); // ["ame", Array(3), true]
```

多维数组定义

```javascript
const array = [
    [1, 2],
    [3, 4]
];
console.log(array[1][0]); // 3
```

用`const`声明定义的数组，因为数组是引用类型的值，因此只要我们不改变它的地址，我们是可以修改它里面的值的

```javascript
const lessons = ['吃饭', '睡觉', '摸鱼'];
lessons[4] = '没想到吧';
console.log(lessons); // ["吃饭", "睡觉", "摸鱼", undefined, "没想到吧"]
```

使用原型的`length`属性可以获取数组中存储的元素数量

```javascript
const nums = [1, 2, 3, 1, , 31];
console.log(nums.length); // 6
```

数组的元素可以为任何值，下面是使用索引添加数组

```javascript
let users = ['史莱姆', ];
console.log(users); // ["史莱姆"]
users[1] = '丘丘人';
console.log(users); // ["史莱姆", "丘丘人"]
```

下面直接设置索引为3位置处的元素值，会将索引为1和2处的值初始化为`undefined`

```javascript
const foods = ['麦当劳'];
foods[3] = '油煸腿';
console.log(foods); // ["麦当劳", empty × 2, "油煸腿"]
console.log(foods.length); // 4
```

声明多个空元素的数组

```javascript
// 声明多个空元素的数组
let test = new Array(3);
console.log(test); // [empty × 3]
```

### Array.of

使用`Array.of()`与`new Array()`不同之处是`Array.of()`在只传入一个数值参数的时候不会创建空元素数组

```javascript
let ame1 = new Array(3);
let ame2 = Array.of(3);
let ame3 = Array.of(1, 2, '炸洋芋');
console.log(ame1); // [empty × 3]
console.log(ame2); // [3]
console.log(ame3); // [1, 2, "炸洋芋"]
```

### 类型检测

`Array.isArray()`方法可以检测变量是否为数组类型

```javascript
const ame = [1, 2, 3, null, true];
console.log(Array.isArray(ame)); // true
console.log(Array.isArray(9)); // false
```

## 类型转换

我们可以将数组转化为字符串也可以将其他类型的数组转化为数组

### 字符串

大部分数据类型都可以使用`toString()`方法转化为字符串

```javascript
console.log([1, 2, 3].toString()); // 1,2,3
```

也可以使用`String()`函数转换为字符串

```javascript
console.log(String([1, 2, , 3])); // 1,2,,3
```

或使用数组对象的`join()`方法将数组元素链接为字符串，可以传入参数作为连接符

```javascript
console.log(['我', '饿', '了'].join('@')); // 我@饿@了
```

### Array.from

使用`Array.from()`方法可将类数组转换为数组，类数组指包含`length`属性或可迭代的对象。

该方法的第一个参数为需要转换的数据，第二个参数为一个类似于`map()`方法的回调函数

```javascript
let str = '牛头人';
console.log(Array.from(str)); // ["牛", "头", "人"]
console.log(Array.from(str, item => item + '!')); //  ["牛!", "头!", "人!"]
```

当为对象设置`length`属性后也可以将其转换为数组，但是要求作为下标的键为数值或者数值字符串

```javascript
// 将对象转换成数组
let users = {
    "0": 'ame',
    1: 'lsr',
    length: 2
}
console.log(Array.from(users)); // ["ame", "lsr"]
```

我们可以将`NodeList`转换为数组后来使用数组的方法或者函数，第二个参数为一个类似于`map()`方法的回调函数，可对数组元素进行函数处理

```html
<button message="啤酒">click me</button>
<button message="炸鸡">click me</button>

<script>
    let btns = document.querySelectorAll('button[message]');
    let btns = document.querySelectorAll('button[message]');
    console.log(btns); // NodeList(2) [button, button] 包含length属性
    Array.from(btns, item => {
        item.addEventListener("click", (event) => {
            event.target.textContent = event.target.getAttribute('message');
            event.target.style.cssText = 'background-color: red; color: #fff';
        });
    });
</script>
```

![NodeList转数组](images/NodeList转数组.gif)

使用展开语法将`NdeList`转换为数组操作

```html
<style>
    div {
        width: 100px;
        height: 100px;
        background-color: purple;
        transition: all 1s;
    }

    div:last-of-type {
        background-color: red;
    }

    .hide {
        opacity: 0;
    }
</style>

<body>
    <div></div>
    <div></div>

    <script>
        const divs = document.querySelectorAll("div");
        [...divs].map(div => {
            div.addEventListener("click", (e) => {
                e.target.classList.toggle('hide');
            });
            div.addEventListener("transitionend", function () {
                this.style.display = 'none';
            });
        });
    </script>
</body>
```

![展开语法NodeList转数组](images/展开语法NodeList转数组.gif)

## 展开语法

### 数组合并

使用展开语法来合并数组相比使用`cancat()`方法来说要更简便，使用`...`可将数组中的多个值展开

```javascript
let a = ['汉堡', '可乐'];
let b = ['炸鸡', '米线', ...a];
console.log(b); // ["炸鸡", "米线", "汉堡", "可乐"]
console.log(...a); // 汉堡 可乐
```

### 函数参数

使用展开语法可以替代`arguments`对象来接受任意参数（因为为了避免匿名参数引起的混乱，`arguments`对象无法再严格模式下使用），它会把所有参数收集到一个数组中

```javascript
function eat(...args) {
    console.log(args);
}
eat('苹果', '菠萝', '西瓜'); // ["苹果", "菠萝", "西瓜"]
```

也可以用于接收部分参数

```javascript
function play(game, ...args) {
    console.log(game, args); // computer (2) ["ps4", "switch"]
    console.log(...args); // ps4 switch
}
play('computer', 'ps4', 'switch');
```

### 节点列表转换

可以将节点列表转为数组，下面例子不可以使用`map()`方法因为节点列表中没有这个方法

```html
<button message="吃">click me</button>
<button message="不吃">click me</button>

<script>
    const btns = document.querySelectorAll("button");
    btns.map(item => {
        console.log(item); // TypeError: btns.map is not a function
    });
</script>
```

使用展开语法将它转换为数组后就可以使用数组方法了，下列是根据类名对DOM节点进行过滤

```html
<body>
    <ul>
        <li class="fruits">西瓜</li>
        <li class="others">鸡腿</li>
        <li class="others">薯片</li>
        <li class="fruits">橘子</li>
    </ul>
    <button type="button" target="fruits">水果</button>

    <script>
        const ul = document.querySelector('ul');
        const lis = document.querySelectorAll('li');
        const btn = document.querySelector('button');
        const targetClass = btn.getAttribute('target');
        btn.addEventListener('click', function () {
            // 将NodeList转化为数组
            const newData = [...lis].filter(li => {
                return li.classList.contains(targetClass);
            });
            ul.innerHTML = '';
            ul.append(...newData);
            this.disabled = true;
        });
    </script>
```

![节点列表转换](images/节点列表转换.gif)

或者是借用原型方法

```html
<body>
    <ul>
        <li class="fruits">西瓜</li>
        <li class="others">鸡腿</li>
        <li class="others">薯片</li>
        <li class="fruits">橘子</li>
    </ul>
    <button type="button" target="fruits">水果</button>
    <script>
        const ul = document.querySelector('ul');
        const lis = document.querySelectorAll('li');
        const btn = document.querySelector('button');
        const targetClass = btn.getAttribute('target');
        // 借用数组的原型方法
        const filtedData = Array.prototype.filter.call(lis, item => {
            if (item.classList.contains(targetClass)) {
                return item;
            }
        });
        filtedData.forEach(item => {
            console.log(item);
        });
    </script>
</body>
```

<img src="images/借用原型方法.png" alt="借用原型方法" style="zoom:60%;" />

## 解构赋值

结构是一种更简洁的赋值特性，可以理解为分解一个数据的结构

- 建议使用`var/let/const`声明

### 基本使用

下面是基本使用语法，注意`=`两端的结构需要相同

```javascript
// 数组使用
let [name, age] = ['ame', 22];
console.log(name, age); // ame 22

// 对象使用
let {name:myName,age:myAge} = {name: 'ame', age:22};
console.log(myName,myAge); // ame 22

// let {foods:foods,price:price} = {foods: 'tea',price:18};
// 简写为
let {foods,price} = {foods: 'tea',price:18};
console.log(foods,price); // tea 18
```

结构赋值数组

```javascript
function run() {
    return [1, 2];
}
let [a, b] = run();
console.log(a, b); // 1 2
```

剩余解构指用一个变量来接收剩余参数

```javascript
let [a, ...b] = [1, 2, 3, 4, 5];
console.log(a); // 1
console.log(b); // [2,3,4,5]
```

字符串解构

```javascript
"use strict";
const [...a] = 'ame';
console.log(a); // ['a','m','e']
```

### 严格模式

非严格模式下可以使用声明指令，严格模式下必须使用声明指令。所以建议使用`let`等声明

```javascript
"use strict";
[name, age] = ['ame', 2];
console.log(name, age); //age is not defined
```

### 简洁定义

只赋值部分变量

```javascript
//只赋值部分变量
let [, age] = ['ame', 22];
console.log(age); // 22
```

使用展开语法获取多个值

```javascript
let [name, ...arr] = ['ame', 'lxy', 'lsr', 'rain'];
console.log(arr); // ["lxy", "lsr", "rain"]
```

### 默认值

为变量设置默认值

```javascript
let [name, age = 22] = ['ame'];
console.log(name, age); // ame 22

let [foods, price = 3] = ['tea', 19];
console.log(foods, price); // tea 19
```

### 函数参数

数组参数的解构赋值使用

```javascript
function test1([a, b]) {
    console.log(a, b);
}
test1([1, 2]); // 1 2
```

对象参数的解构赋值使用

```javascript
function test2({myName:name, myAge:age}) {
    console.log(name,age);
}
test2({myName:'ame',myAge: 22}) // ame 22
```

## 管理元素

### 基本使用

使用从0开始的索引来改变数组

```javascript
let arr = [1, 2, 3];
arr[1] = 'hi';
console.log(arr); // [1, "hi", 3]
arr[4] = 'haha';
console.log(arr); // [1, "hi", 3, empty, "haha"]
console.log(arr[3]); // undefined
```

向数组后追加元素

```javascript
// 向数组后追加元素
let arr = [1, 2, 3];
arr[arr.length] = 4;
console.log(arr); // [1,2,3,4]
```

### 展开语法

使用展开语法批量添加元素

```javascript
// 使用展开语法批量添加元素
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
arr1 = [...arr1, ...arr2];
console.log(arr1); // [1,2,3,4,5,6]
```

### push

`push()`方法可以将元素追加到数组的尾部，这个方法会直接改变元数组，返回值为数组元素的数量

```javascript
let arr = ['ame', 'rain'];
console.log(arr.push('lsr')); // 3
console.log(arr); //  ["ame", "rain", "lsr"]
```

可以一次性追加多个元素，传递的多个参数用`,`隔开

```javascript
let users = ['ame', 'lsr'];
let newUsers = ['rain', 'lxy'];
console.log(users.push(...newUsers)); // 4
console.log(users); // ["ame", "lsr", "rain", "lxy"]
```

根据区间创建新数组

```javascript
// 根据区间创建新数组
function rangeArray(begin, end) {
    const array = [];
    for (let i = begin; i < end; i++) {
        array.push(i);
    }
    return array;
}
console.log(rangeArray(2, 5)); // [2,3,4]
```

### pop

`pop()`方法可以从数组末尾弹出元素，这个方法会直接改变元数组，返回值为弹出的元素，这个方法一次只能弹出一个元素。

```javascript
let arr = ['ame', 'lsr', 'rain'];
console.log(arr.pop()); // rain
console.log(arr); //  ["ame", "lsr"]
```

### shift

`shift()`方法可以从数组的最前面取出一个元素，这个方法会直接改变元数组，返回值为取出的元素，同样这个方法一次只能取出一个元素。

```javascript
let arr = ['ame', 'rain'];
console.log(arr.shift()); // ame
console.log(arr); // ["rain"]
```

### unshift

`unshift()`方法可以在数组前面追加元素，这个方法会直接改变元数组，返回值为数组的长度；与`push()`方法一样，该方法也可以一次性往数组前添加多个元素，传递给该方法的多个参数用`,`隔开

```javascript
let arr = ['ame', 'rain'];
console.log(arr.unshift('lsr', 'lxy')); // 4
console.log(arr); // ["lsr", "lxy", "ame", "rain"]
```

### fill

使用`fill`方法可以以指定值来填充数组元素，这个方法会直接改变元数组，返回值为填充后的数组

```javascript
const arr = new Array(3);
console.log(arr.fill('ame')); // ["ame", "ame", "ame"]
console.log(arr); // ["ame", "ame", "ame"]
```

指定填充位置

```javascript
console.log([1, 2, 3, 4].fill('ame', 1, 3)); // [1, "ame", "ame", 4]
```

### slice

使用`slice()`方法可以从数组中截取部分元素组合成新数组，并返回这个新的数组（并不会改变原来的数组），不传第二个参数时默认截取到数组的最后一个元素。

```javascript
let arr = [1, 2, 3];
console.log(arr.slice(1, 3)); // [2,3]
console.log(arr); // [1,2,3]
console.log(arr.slice(1)); // [2,3]
```

不设置参数可以获取数组中的所有元素

```javascript
console.log(arr.slice()); // [1,2,3]
```

### splice

使用数组对象的`splice()`方法可以添加、删除、替换数组中的元素，这个方法会对元数组进行改变，返回的值为删除的元素所组成的新数组。

`splice()`方法的第一个参数指定从那个位置开始删除，第二个参数指定要删除元素的数量。

```javascript
let arr = [1, 2, 3, 4, 5];
console.log(arr.splice(1, 2)); // [2,3]
console.log(arr); // [1,4,5]
```

通过修改`length`属性删除最后一个元素

```javascript
// 通过修改 length 属性删除最后一个元素
const users = ['ame', 'lsr'];
users.length--;
console.log(users); // ["ame"]
```

可以通过指定第三个参数来设置在删除位置添加的元素。可以传入第三个参数以及第三个参数之后的参数来一次性添加多个元素

```javascript
const foods = ['咖喱鸡', '豆花米线', '拉面'];
console.log(foods.splice(0, 2, '炸薯条', '关东煮')); // ["咖喱鸡", "豆花米线"]
console.log(foods); //["炸薯条", "关东煮", "拉面"]
```

向数组末尾添加元素

```javascript
let arr = [1, 2, 3];
console.log(arr.splice(arr.length, 0, 4)); // []
console.log(arr); // [1,2,3,4]
```

在数组前面添加元素

```javascript
let arr = [2, 3, 4, 5];
console.log(arr.splice(0, 0, 0, 1)); // []
console.log(arr); // [0,1,2,3,4,5]
```

数组元素位置调整函数

```javascript
// 数组位置调整函数
function move(arr, before, to) {
    if (before < 0 || to >= arr.length) {
        throw new Error("指定位置错误");
    }
    const newArray = [...arr];
    const elm = newArray.splice(before, 1);
    newArray.splice(to, 1, ...elm);
    return newArray;
}
console.log(move([1, 2, 3], 1, 2)); // [1,3,2]
```

### 清空数组

将数组值修改为`[]`可以清空数组，如果有多个引用时数组在内存中会存在被其他变量引用。

```javascript
let users = ['ame', 'rain'];
let student = users;
users = [];
console.log(users); // []
console.log(student); // ["ame", "rain"]
```

将数组的`length`属性设置为0也可以清空数组

```javascript
let nums = [1, 2, 3];
nums.length = 0;
console.log(nums); // []
```

使用`splice()`方法删除所有数组元素

```javascript
let arr = [1, 2, 3, 4, 5];
arr.splice(0, arr.length);
console.log(arr); // []
```

使用`pop/shift`方法删除所有元素来清空数组

```javascript
let ame = [1, 2, 3, 4, 5];
while (ame.pop()) {}
console.log(ame); // ame
```

推荐使用前两种方法清空数组

## 合并拆分

### join

使用`join()`方法可以将数组元素以指定的连接符拼接成一个字符串

```javascript
let arr = ['ame', 'rain', 'lsr'];
console.log(arr.join('-')); // ame-rain-lsr
```

### split

`split()`方法用于将字符串分割成数组，类似于`join()`方法的反函数

```javascript
let price = '99,98,97';
console.log(price.split(',')); // ["99", "98", "97"]
```

### concat

`concat()`方法用于连接两个或多个数组，它相当于执行浅拷贝，元素是值类型的是复制操作，如果是引用类型的化还是指向同一对象。这个方法不会改变原数组，返回一个操作好的新数组。

```javascript
let arr = ['ame', 'rain'];
let arr1 = [1, 2];
let arr2 = [3, 4];
console.log(arr.concat(arr1, arr2)); // ["ame", "rain", 1, 2, 3, 4]
```

也可以使用展开语法进行连接

```javascript
let arr = ['ame', 'rain'];
let arr1 = [1, 2];
let arr2 = [3, 4];
// 使用展开语法
console.log([...arr, ...arr1, ...arr2]); // ["ame", "rain", 1, 2, 3, 4]
```

### copyWithin

使用`copyWithin()`方法可以从数组中复制一部分数据到同数组的另外位置，这个方法不会改变原数组，返回一个操作好的新数组

语法说明

```javascript
array.copyWithin(target, start, end);
```

参数说明

| 参数   | 描述                                                         |
| ------ | ------------------------------------------------------------ |
| target | 必需。复制到指定目标的索引位置。                             |
| start  | 可选。元素复制的起始位置。                                   |
| end    | 可选。停止复制的索引位置（默认为`array.length`）。如果为负值，则倒数 |

```javascript
let arr = [1, 2, 3, 4];
console.log(arr.copyWithin(2, 0, 2)); // [1,2,1,2]
```

## 查找元素

### indexOf

使用`indexOf()`方法可以从前向后查找指定元素首次出现的位置，如果找不到指定元素时返回`-1`。

```javascript
let arr = [1, 2, 3, 4, 5];
console.log(arr.indexOf(2)); // 1
```

下面代码中。使用`indexOf()`方法查找指定字符串时将无法找到，因为`indexOf()`方法查找元素时使用的是类似于`===`一样的严格类型约束。

```javascript
let arr = [1, 2, 3, 4, 5];
console.log(arr.indexOf('1')); // -1
```

第二个参数用于指定查找的开始位置

```javascript
let nums = [1, 4, 2, 1, 4, 5, 2];
console.log(nums.indexOf(2, nums.indexOf(2) + 1)); // 6
```

### lastIndexOf

使用`lastIndexOf()`方法可以从后往前查找指定元素首次出现的位置，如果找不到则返回`-1`。

```javascript
let arr = [3, 1, 2, 4, 2, 3, 2];
console.log(arr.indexOf(2)); // 2
console.log(arr.lastIndexOf(2)); // 6
```

第二个参数用于指定查找开始的位置

```javascript
let arr = [3, 1, 2, 4, 2, 3, 2];    
// 从索引为5的元素开始向前查找
console.log(arr.lastIndexOf(2, 5)); // 4
// 从最后一个元素开始向前查找
console.log(arr.lastIndexOf(2, -1)); // 6
```

### includes

使用`includes()`方法可以判断数组中是否包含指定的元素，如果包含则返回`true`，否则返回`false`。

```javascript
let arr = [2, 1, 3, 4, 2, 3];
console.log(arr.includes(3)); // true
console.log(arr.includes('3')); // false
```

`includes()`方法不能直接查找引用类型的元素，因为它们你的内存地址是不一样的。

```javascript
const users = [
    {
        name: 'ame',
        age: 22
    },
    {
        name: 'rain',
        age: 21
    },
    {
        name: 'lsr',
        age: 100
    }
];
console.log(users.includes({name:'ame',age:22})); //false
```

`includes()`方法原理

```javascript
function includes(arr, item) {
    for (const value of arr) {
        if (item === value) return true;
    }
    return false;
}
console.log(includes([1, 2, 3], 2)); // true
```

### find

`find()`方法可以将从数组中首次找到符合条件的元素给返回出来，如果找不到时则返回`undefined`。

返回第一次查找到的值，不会继续向后查找；参数传入一个判断元素返回条件回调函数，该回调函数的默认参数为当前值、索引以及操作数组；我们可以利用`find()`方法查找复合相应条件的引用类型元素

```javascript
const users = [
    {
        name: 'ame',
        age: 22
    },
    {
        name: 'rain',
        age: 21
    },
    {
        name: 'lsr',
        age: 100
    }
];
let find = users.find(function (item, index, array) {
    console.log(item); // {name: "ame", age: 22}
    console.log(index); // 0
    console.log(array); // users数组
    return item.name === 'ame';
});
console.log(find); // {name: "ame", age: 22}
```

### findIndex

`findIndex()`方法与`find()`方法的区别是该方法返回的是元素的索引值而不是元素本身，当没找到对应元素时返回`-1`。回调函数的参数也是当前值、索引以及操作数组。

```javascript
let arr = [1, 2, 12, 3];
// 从前向后查找第一个出现的偶数，返回它的索引值
let index = arr.findIndex(value => value % 2 === 0);
console.log(`索引：${index}----元素值：${arr[index]}`); // 索引：1----元素值：2
```

### find方法原理

下面使用自定义的`find()`函数

```javascript
let arr = [1, 2, 3, 4, 5];
function find(array, callback) {
    for (const value of array) {
        if (callback(value)) return value;
    }
    return undefined;
}
let res = find(arr, function (value) {
    return value % 2 === 1;
});
console.log(res); // 1
```

下面添加原型方法来扩展功能

```javascript
Array.prototype.findValue = function (callback) {
    for (const value of this) {
        if (callback(value)) return value;
    }
    return undefined;
};
let arr = [1, 2, 3, 2, 1];
let res = arr.findValue(function (item) {
    return item % 2 === 0;
});
console.log(res); // 2
```

## 数组排序

### reverse

使用`reverse()`方法可以反转数组中元素的顺序，这个方法会直接改变元数组

```javascript
let arr = [1, 2, 3];
arr.reverse();
console.log(arr); // [3,2,1]
```

### sort

使用`sort()`方法可以对数组进行排序，该方法默认会比较字符编码来对数组元素进行排序；我们可以传入一个回调函数来自定义数组排序时的元素间的比较规则。这个方法会直接改变元数组。

`Array.sort((a,b) => a-b)`

- 回调函数返回负数时`a`排在`b`前面，从小到大
- 回调函数返回正数时表示`b`应该排在`a`前面，互换元素位置
- 相等时返回0，不做变动

总而言之就是回调函数返回负数或0时元素位置不变，返回正数时会互换元素位置

默认按照字符编码排序

```javascript
let arr = [3, 2, 1, 11];
arr.sort();
console.log(arr); //[1, 11, 2, 3]
```

使用`sort()`方法进行降序排序

```javascript
let arr = [3, 2, 1, 11];
arr.sort(function (pre, cur) {
    return cur - pre;
});
console.log(arr); // [11, 3, 2, 1]
```

下面是按点击量从高到底进行降序排序

```javascript
const data = [
    {
        title: '松果弹抖闪电五连鞭',
        click: 200
    },
    {
        title: '🥧的一下很快啊',
        click: 199
    },
    {
        title: '不讲武德',
        click: 3012
    }
];
data.sort(function (pre, cur) {
    return cur.click - pre.click;
});
console.log(data);
```

### 排序原理

```javascript
function sort(array, callback) {
    // 选出一个最小或者最大值然后再依次换位
    for (const n in array) {
        for (const m in array) {
            if (callback(array[n], array[m]) < 0) {
                let temp = array[n];
                array[n] = array[m];
                array[m] = temp;
            }
        }
    }
    return arr;
}
let arr = [1, 3, 12, 3];
// 由于传入的arr是引用类型，所以会直接影响到函数外部的arr
sort(arr, function (pre, cur) {
    return cur - pre;
});
console.log(arr); // [12,3,3,1]
```

## 循环遍历

### for

根据数组长度结合`for`循环来遍历数组

```javascript
const users = [
    {
        name: 'ame',
        age: 22
    },
    {
        name: 'rain',
        age: 21
    }
];
for (let i = 0; i < users.length; i++) {
    users[i] = `姓名：${users[i].name}-年龄：${users[i].age}`;
}
console.log(users); // ["姓名：ame-年龄：22", "姓名：rain-年龄：21"]
```

### forEach

`forEach()`方法可以遍历数组中的每一个元素，该方法没有返回值（或者说返回值为undefined）。参数为一个回调函数，回调函数是对每一个元素的处理规则；同样，回调函数的参数有当前值，当前值的索引以及操作数组。

下面例子将所有名字转换成大写。

```javascript
const users = [
    {
        name: 'ame',
        age: 22
    },
    {
        name: 'rain',
        age: 21
    }
];
users.forEach((item, index, arr) => {
    item.name = item.name.toUpperCase();
});
console.log(users);
```

### for / in

遍历时的`key`值为数组的索引

```javascript
const users = [
    {
        name: 'ame',
        age: 22
    },
    {
        name: 'rain',
        age: 21
    }
];
for (const key in users) {
    console.log(key);
    console.log(users[key]);
}
```

### for / of

与`for/in`不同的是`for/of`每次循环时取的是其中的值而不是索引。

```javascript
const foods = ['apple', 'hamburger'];
for (const value of foods) {
    console.log(value); // apple hamburger
}
```

使用数组的迭代对象遍历获取索引和值（生成器和迭代器后面再讲）

```javascript
// 使用数组的迭代器
const foods = ['apple', 'hamburger'];
const iterator = foods.entries();
let value1 = iterator.next(); // {value: Array(2), done: false}
console.log(value1.value); // [0,"apple"]
let value2 = iterator.next();
console.log(value2.value); // [1,hamburger]
```

再结合我们的解构特性与`for/of`来遍历获取索引与值

```javascript
const foods = ['炸鸡', '薯条'];
for (const [index, value] of foods.entries()) {
    console.log(index, value);
}
```

取数组中的最大值

```javascript
// 取数组中的最大值
function arrayMax(array) {
    let max = array[0];
    for (const elm of array) {
        max = max > elm ? max : elm;
    }
    return max
}
console.log(arrayMax([2, 31, 4, 1, 2, 1])); // 31
```

### for / of 原理

实际上`for/of`只不过是语法糖，其底层原理是通过检测生成器返回的值中的`done`属性来判断生成器是否完成了值的生成，若没有完成，返回`false`；反之，返回`true`。

关于生成器与迭代器在函数章节再做详解。

下面为`for/of`循环的实现原理

```javascript
// 定义生成器函数
function* createNum() {
    yield 1;
    yield 2;
}
// 产生迭代器
const iterator = createNum();
// 遍历 这里就是语法糖 for/of 的原理
let result;
while (!(result = iterator.next()).done) {
    console.log(result.value); // 1 2
}
```

## 迭代器方法

数组中可以使用多种迭代器方法，迭代器与生成器后面再做详解。

### keys

使用`keys()`方法可以通过迭代对象获取数组的索引值

```javascript
const users = ['ame', 'rain', 'lsr'];
const keys = users.keys();
console.log(keys.next().value); // 0
console.log(keys.next().value); // 1
```

获取数组的所有键

```javascript
const users = ['ame', 'rain', 'lsr'];
for (const key of users.keys()) {
    console.log(key); // 0 1 2
}
```

使用`while`遍历

```javascript
const users = ['ame', 'rain', 'lsr'];
const keys = users.keys();    
let res;
while (!(res = keys.next()).done) {
    console.log(res.value); // 0 1 2
}
```

### values

使用`values()`方法可以通过迭代器对象获取数组元素的值

```javascript
const foods = ['薯条', '鸡腿', '蛋挞'];
const iterator = foods.values();
console.log(iterator.next().value); // 薯条
console.log(iterator.next().value); // 鸡腿
console.log(iterator.next().value); // 蛋挞
```

获取数组中的所有元素值

```javascript
"use strict";
const arr = ['ame', 'rain'];
for (const value of arr.values()) {
    console.log(value); // ame rain
}
```

### entries

使用`entries()`方法可以通过迭代器对象返回数组的所有键值对。

下面结合解构语法来循环遍历

```javascript
const arr = ['ame', 'rain'];
const iterator = arr.entries();
let res;
while (!(res = iterator.next()).done) {
    let [key, value] = res.value;
    console.log(key, value); // 0 "ame" / 1 "rain"
}
// for/of 语法糖
for (const [key, value] of arr.entries()) {
    console.log(key, value); // 0 "ame" / 1 "rain"
}
```

## 扩展方法

### every

`every()`方法可以对数组中的每一项元素运行指定的函数，如果该函数对数组每一项的结果都为`true`，则`every()`方法返回`true`，要是有一项的运行结果为`false`，则该方法返回`false`。同样，传入的回调函数的参数有当前值，当前值的索引以及操作数组。

查看所有同学的数学成绩是否都及格

```javascript
// 查看所有同学的数学成绩是否都及格
const students = [
    {name:'rain',math:100},
    {name: 'ame',math: 59},
    {name: 'lsr', math: 65}
];
const result = students.every(item => item >= 60);
console.log(result); // false
```

标题的关键词检查

```javascript
// 标题的关键词检查
let words = ['ame', '吃'];
let title = 'ame在吃烤鸡腿';
let state = words.every(word => {
    return title.indexOf(word) > -1;
});
if (!state) {
    console.log("标题必须包含所有关键词");
}
console.log(state); // true
```

### some

`some()`方法可以对数组中的每一项运行给定函数，如果该函数对数组中任意一项的结果为`true`，则该方法返回`true`，每一项的结果为`false`则返回`false`。传入的回调函数同样有三个参数，当前元素，当前元素的索引以及所操作的原数组。

下面是使用`some()`方法检测敏感词的示例，如果匹配到一个词就提示违规

```javascript
let words = ['钱', '打'];
let message = '我，秦始皇，打钱';
let state = words.some(word => message.indexOf(word) > -1);
if (state) {
    console.log("违规，包含敏感词汇");
}
```

### filter

该方法可以对数组中的每一项运行给定函数，返回该函数会返回`true`的项组成的新数组，不会改变原数组。传入的回调函数同样有三个参数，当前元素，当前元素的索引以及所操作的原数组。

下面是获取所有价格大于1000元的商品

```javascript
const goods = [
    {good: 'iPhoneX', price: 8999, num: 1},
    {good: 'milk', price: 5, num: 24},
    {good: 'guitar', price: 9999, num: 1}
];
let highlyGoods = goods.filter(good => {
    return good.price * good.num > 1000;
});
highlyGoods.forEach(item => {
    console.log(item.good); // iPhonX guitar
});
```

咱们来自定义一个过滤函数

```javascript
function except(array, excepts) {
    const newArray = [];
    for (const element of array) {
        if (!excepts.includes(element)) newArray.push(element);
    }
    return newArray;
}
const array = [1, 2, 3, 4];
console.log(except(array, [3, 4])); // [1,2]
```

### map

`map()`方法可以对数组的每一项运行给定的函数，返回每次函数调用的结果组成的新数组，该方法不会改变原数组。传入的回调函数同样有三个参数，当前元素，当前元素的索引以及所操作的原数组。

获取数组中所有食物名称组成的新数组

```javascript
const foods = [
    {name: '面包', price: 6},
    {name: '薯片', price: 7},
    {name: '可乐', price: 3}
];
console.log(foods.map(item => item.name)); // ["面包", "薯片", "可乐"]
```

为所有网址前加上`http://`

```javascript
// 为所有网址加上 http://
let data = [
    {url: 'www.bilibili.com',description: '美食网站'},
    {url: 'wasser.net.cn', description: '个人网站'}
];
data = data.map(item => {
    item.url = 'http://' + item.url;
    return item;
});
console.log(data);
```

### reduce

使用`reduce()`与`reduceRight()`方法可以迭代数组的所有元素,`reduce()`从前开始往后迭代，`reduceRight()`从后往前开始迭代，返回最后迭代完成的结果。

该方法的第一个参数为回调函数，第二个参数为初始值。传入第二个参数时将从数组的第一个元素开始迭代，不传入第二个参数时将从数组的第二项开始迭代。`reduce()`方法接收初始值，对数组的每个元素执行回调函数，回调函数接收上一次回调结果、当前数组元素、当前数组元素索引以及操作数组作为参数。

回调函数的参数说明如下：

| 参数  | 说明                       |
| ----- | -------------------------- |
| prev  | 上次调用回调函数返回的结果 |
| cur   | 当前的元素值               |
| index | 当前元素的索引             |
| array | 原数组                     |

统计元素出现的次数

```javascript
function countArrayElem(array, elem) {
    return array.reduce((count, cur) => {
        // === 优先级大于赋值运算符
        return count += cur === elem ? 1 : 0;
    }, 0);
}
console.log(countArrayElem([1, 2, 2, 1, 3, 2], 2)); // 3
```

取数组中的最大值

```javascript
// 取数组中的最大值
function arrayMax(array) {
    return array.reduce((max, cur) => {
        return max > cur ? max : cur;
    }, array[0]);
}
console.log(arrayMax([2, 1, 3])); //  3
```

取得价格最高的商品

```javascript
// 取价格最高的商品
const goods = [
    {name: 'milk', price: 6},
    {name: 'noodles', price:20},
    {name: 'guitar', price: 1000}
];
function maxPrice(goods) {
    return goods.reduce((good,cur) => {
        return good.price > cur.price ? good : cur;
    },goods[0]);
}
console.log(maxPrice(goods)); // {name: "guitar", price: 1000}
```

计算购物车中的商品总价

```javascript
const cart = [
    {name: '维他柠檬茶', price: 3, num:24},
    {name: '趣多多', price: 8, num:6},
    {name: '面包', price: 12, num: 3}
];
let total = cart.reduce((total,cur) => {
    return total += cur.price * cur.num;
}, 0);
console.log(total); // 156
```

获取价格超过50的商品名称，这里也可以用`filter()`方法来实现

```javascript
// 获取价格超过50的商品名称
const cart = [
    {name: '维他柠檬茶', price: 3, num:24},
    {name: '趣多多', price: 8, num:6},
    {name: '面包', price: 12, num: 3}
];
const goods = cart.reduce((goods, cur) => {
    if (cur.price * cur.num > 50) {
        goods.push(cur);
    }
    return goods
}, []).map(item => item.name);
console.log(goods); // ["维他柠檬茶"]
```

使用`reduce()`方法实现数组去重

```javascript
// 数组去重
let arr = [1, 2, 3, 3, 1, 2];
let filterArr = arr.reduce((newArr, cur, index, array) => {
    if (!newArr.includes(cur)) newArr.push(cur);
    return newArr;
}, []);
console.log(filterArr); // [1,2,3]
```

## 动画案例

```html
<style>
    * {
        padding: 0;
        margin: 0;
    }

    body {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #2c3e50;
    }

    div {
        color: #f0932b;
        font-size: 5em;
        font-weight: bold;
        cursor: pointer;
    }

    div>span {
        display: inline-block;
        position: relative;
    }

    .changeColor {
        animation-name: changeColor;
        animation-duration: 1s;
        animation-timing-function: linear;
        animation-iteration-count: 2;
        animation-direction: alternate;
    }

    /* 关键帧动画 */
    @keyframes changeColor {
        50% {
            color: #eb4d4b;
            transform: scale(1.5);
        }

        to {
            color: #f0932b;
            transform: scale(0.5);
        }
    }
</style>
</head>

<body>
    <div>RainJS</div>

    <script>
        const div = document.querySelector("div");
        [...div.textContent].reduce((pre, cur, index) => {
            // 开始时清空 div 内的内容
            pre == index && (div.innerHTML = '');
            const span = document.createElement('span');
            span.textContent = cur;
            div.append(span);
            span.addEventListener('mouseover', function () {
                this.classList.add('changeColor');
            });
            // 动画结束时把动画类删掉
            span.addEventListener('animationend', function () {
                this.classList.remove('changeColor');
            });
        }, 0);
    </script>
```

![数组与动画案例](images/数组动画案例.gif)

# Symbol

`Symbol`类型是用于防止属性名冲突而产生的。

`Symbol`类型的值是唯一的，独一无二的且不会重复的。

## 基础知识

### 声明定义

```javascript
let ame = Symbol();
let rain = Symbol();
console.log(ame); // Symbol()
console.log(ame == rain); // false
```

不可以给`Symbol`类型添加属性

```javascript
let ame = Symbol();   
ame.name = 'lsr';
console.log(ame.name); // undefined
console.log(typeof ame); // symbol
```

### 描述参数

可以在创建`Symbol`类型的对象时传入字符串参数用于描述`Symbol`，以便于在控制台区分不同的`Symbol`

```javascript
let rain = Symbol("my name");
console.log(rain); // Symbol(my name)
// 将 Symbol 转换成字符串
console.log(rain.toString()); // Symbol(my name)
```

即使传入相同的字符串参数`Symbol`也是独立唯一的，因为传入的参数只是用来描述它而已

```javascript
let rain = Symbol("my name");
let ame = Symbol("my name");
console.log(rain == ame); // false
```

使用`Symbol`类型值的`description`属性可以获取传入的描述参数

```javascript
let rain = Symbol("my name");
console.log(rain.description); // my name
```

### Symbol.for

根据描述获取`Symbol`，如果不存在就新建一个`Symbol`

注意：

- 使用`Symbol.for()`方法会在系统中将`Symbol`进行登记
- 而使用`Symbol()`函数则不会在系统中进行登记

```javascript
let ame = Symbol("my name");
let rain = Symbol("my name");
console.log(ame == rain); // false
let name = Symbol.for("lsr");
let myName = Symbol.for("lsr");
console.log(name == myName); // true
```

### Symbol.keyFor

`Symbol.keyFor()`方法根据使用`Symbol.for()`方法登记的`Symbol`返回描述内容，如果找不到的话就返回`undefined`

```javascript
let name = Symbol.for('rain');
console.log(Symbol.keyFor(name)); // rain
let ame = Symbol('rain');
console.log(Symbol.keyFor(ame)); // undefined
```

### 对象属性

`Symbol`是独一无二的，因此可以利用此特性来保证对象属性的唯一。

- `Symbol`值作为对象属性的键时使用`[]`（变量）形式操作
- 通过键名访问对象属性时不能使用`.`语法来访问，因为它会将`.`后面的当成普通字符串来处理

下面的写法时错误的，会将`symbol`当成字符串`symbol`处理：

```javascript
let symbol = Symbol('ame');
let obj = {
    symbol: "my name"
};
console.log(obj); // {symbol: "my name"}
console.log(obj.symbol); // my name
console.log(obj[symbol]); // undefned
```

正确的写法是以`[]`变量形式声明和访问：

```javascript
let symbol = Symbol('ame');
let obj = {
    [symbol]: 'my name'
};
console.log(obj); // {Symbol(ame): "my name"}
console.log(obj[symbol]); // my name
```

## 实例操作

### 缓存操作

使用`Symbol`可以解决在保存数据时由于名称相同而造成的耦合覆盖问题。

```javascript
// 解决在保存数据时由于名称相同而造成的耦合覆盖问题
class Cache {
    static data = {};
	static set(name, value) {
    	this.data[name] = value;
	}
	static get(name) {
    	return this.data[name];
	}
}
let user = {
    name: 'ame',
    key: Symbol('名字')
};
let cart = {
    name: '购物车',
    key: Symbol('购物车')
};
Cache.set(user.key, user.name);
Cache.set(cart.key, cart.name);
console.log(Cache.get(user.key)); // ame
```

### 遍历属性

`Symbol`不能使用`for/in`、`for/of`遍历操作

```javascript
let symbol = Symbol('myName');
let obj = {
    name: 'lsr',
    [symbol]: 'haha'
};
for (const key in obj) {
    console.log(key); // name
}
for (const key of Object.keys(obj)) {
    console.log(key); // name
}
for (const value of Object.values(obj)) {
    console.log(value); // lsr
}
```

可以使用`Object.getOwnPropertySymbols()`方法获取所有对象中的`Symbol`类型的键名

```javascript
let ame = {
    [Symbol('姓名')]: 'ame',
    age: Symbol('22')
};
for (const key of Object.getOwnPropertySymbols(ame)) {
    console.log(key); // Symbol(姓名)
}
console.log(ame);
```

也可以使用 `Reflect.ownKeys()`方法获取对象所有属性的键名包括`Symbol`类型的键名

```javascript
let ame = {
    [Symbol('姓名')]: 'ame',
    age: Symbol('22')
};
for (const key of Reflect.ownKeys(ame)) {
    console.log(key); // age Symbol(姓名)
}
```

如果对象属性不想被遍历，可以使用`Symbol`将它保护起来

```javascript
const site = Symbol('网站名称');
class User {
    constructor(name) {
        this[site] = 'ame';
        this.name = name;
    }
    getName() {
        return `${this[site]}----${this.name}`;
    }
}
const user1 = new User('丘丘人');
console.log(user1.getName());
for (const key in user1) {
    console.log(key); // name
}
```

# 集合

## Set

用于存储任何类型的唯一值，无论是基本类型还是引用类型.。

- 只能保存值，没有键的概念
- 严格类型检测如字符串数字不等于数值类型数字
- 集合中的每个元素是唯一的
- 遍历顺序为添加时的顺序，以便于我们往集合中保存回调函数

### 基本使用

对象的键名最终都会转换为字符串

```javascript
// 对象的键名最终都会转换为字符串
let obj = {
    1: 'ame',
    '1': 'rain'
};
console.log(obj); // {1: "rain"}
```

使用引用类型的值作为对象属性的键时，会自动将它转换为字符串后使用

```javascript
let obj = {
    1: 'ame',
    '1': 'rain'
};
let ame = {
    [obj]: '牛头人'
};
console.table(ame);
console.log(ame[obj.toString()]); // 牛头人
console.log(obj.toString()); // [object Object]
console.log(ame["[object Object]"]); // 牛头人
```

使用`Set()`构造函数来初始化集合，传入一个数组作为初始化参数

```javascript
// 使用数组来初始化集合数据
let ame = new Set([1, 2, 3, 4, 1]);
console.log(ame); // Set(4) {1, 2, 3, 4}
```

`Set`中的元素是严格类型约束的，下面的数值`1`与字符串`1`属于两个不同的值

```javascript
let set = new Set();
set.add('1');
set.add(1);
console.log(set); // Set(2) {"1", 1}
```

### 添加元素

使用`add()`方法可以向集合中添加元素，集合中不允许存在重复的元素

```javascript
// 集合中不允许存在重复的元素
let ame = new Set();
ame.add('rain');
ame.add('lsr');
ame.add('rain');
console.log(ame); // Set(2) {"rain", "lsr"}
```

### 获取元素数量

使用集合的`size`属性获取集合中的元素数量

```javascript
// 获取元素数量
let set = new Set(['ame', 'rain']);
console.log(set.size); // 2
```

### 元素检测

`has()`方法可以检测数组中是否存在指定元素

```javascript
// 使用 has() 方法可以检测数组中存在指定元素
let set = new Set(['rain']);
console.log(set.has('rain')); // true
console.log(set.has('ame')); // false
```

### 删除元素

使用`delete()`方法可以从数组中删除单个元素；若成功删除，返回`true`，否则返回`false`。

```javascript
let set = new Set(['ame', 'rain']);
console.log(set.delete('ame')); // true
console.log(set); // Set(1) {"rain"}
```

使用`clear()`方法可以清空集合中所有元素

```javascript
let set = new Set(['ame', 'rain']);
set.clear();
console.log(set); // Set(0) {}
```

### 数组转换

可以使用展开语法（`...`）或`Array.from()`静态方法将`Set`类型转换为数组类型，这样就可以用数组的方法来处理数据了

```javascript
// 数组转换
const set = new Set(['rain', 'ame']);
console.log([...set]); // ["rain","ame"]
console.log(Array.from(set)); // ["rain","ame"]
```

移除集合中大于5的数值

```javascript
// 移除大于5的数值
let set = new Set("123456789");
console.log(set); // {"1", "2", "3", "4", "5", …}
set = new Set([...set].filter(item => item <= 5));
console.log(set); //  {"1", "2", "3", "4", "5"}
```

### 去除重复

去除字符串重复

```javascript
// 去除字符串重复
console.log([...new Set("amea")].join('')); // ame
```

数组去重

```javascript
// 数组去重
const arr = [1, 2, 3, 2, 1];
console.log(...new Set(arr)); // 1,2,3
```

### 遍历数据

使用`keys()/values()/entries()`都可以返回一个有关于集合的迭代对象，由于`Set`类型只有值所以`keys()`和`values()`方法返回的结果一致。

```javascript
const set = new Set(['ame', 'rain']);
console.log(set.keys()); // SetIterator {"ame", "rain"}
console.log(set.keys()); // SetIterator {"ame", "rain"}
console.log(set.entries()); // SetIterator {"ame" => "ame", "rain" => "rain"}
```

此外，还可以使用`forEach()`方法遍历`Set`中的数据，默认使用`entries()`方法创建迭代器。

为了保持和遍历数组的参数统一，函数中的`value`与`key`是一样的

```javascript
const set = new Set('ame');
set.forEach((item, key) => console.log(item, key)); // a a m m e e
```

也可以使用`for/of`语法糖来遍历集合中的数据，默认会使用`values()`方法创建迭代器

```javascript
const set = new Set(['rain', 'ame']);
for (const value of set) {
    console.log(value); // rain ame
}
```

使用`while`循环检测迭代器返回值中的`done`属性来遍历集合

```javascript
const set = new Set(['rain', 'ame']);
const iterator = set.values();
let result;
while (!(result = iterator.next()).done) {
    console.log(result.value); // rain ame
}
```

### 搜索实例

下面通过历史搜索的示例加深对`Set`的理解

```html
<style>
    * {
        padding: 0;
        margin: 0;
    }

    body {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #34495e;
        flex-direction: column;
    }

    input {
        width: 200px;
        border: 1px solid #e74c3c;
        outline: none;
        box-sizing: border-box;
        padding: 10px;
    }

    ul {
        list-style-type: none;
        width: 200px;
        padding-top: 20px;
    }

    ul li {
        font-size: 18px;
        color: white;
        padding: 3px;
    }

    ul li:nth-of-type(odd) {
        background-color: #e67e22;
    }
</style>

<body>
    <input type="text" />
    <ul></ul>

    <script>
        let obj = {
            words: new Set(),

            set keyword(word) {
                this.words.add(word);
            },

            show() {
                const ul = document.querySelector('ul');
                ul.innerHTML = '';
                this.words.forEach(word => {
                    ul.innerHTML += `<li>${word}</li>`;
                });
            }
        };
        document.querySelector('input').addEventListener('blur', function () {
            obj.keyword = this.value;
            obj.show();
        });
    </script>
</body>
```

![搜索实例](images/搜索实例.gif)

### 交集

获取两个集合中共同存在的元素

```javascript
let set1 = new Set(['apple', 'orange']);
let set2 = new Set(['cheery', 'apple']);
let newSet = new Set([...set1].filter(item => {
    return set2.has(item);
}));
console.log(newSet); // Set(1) {"apple"}
```

### 差集

在集合a中出现但不在集合b中出现的元素的集合称作集合a与集合b的差集

```javascript
let set1 = new Set(['rain', 'ame']);
let set2 = new Set(['ame', 'lsr']);
let newSet = new Set([...set1].filter(item => {
    return !set2.has(item);
}));
console.log(newSet); // Set(1) {"rain"}
```

### 并集

将两个集合合并成一个新的集合，这个新的集合就是集合a与集合b的并集，由于集合的特性并集中当然也不会出现重复的元素

```javascript
const set1 = new Set(['rain', 'ame']);
const set2 = new Set(['ame', 'apple']);
const newSet = new Set([...set1, ...set2]);
console.log(newSet); // Set(3) {"rain", "ame", "apple"}
```

## WeakSet

`WeakSet`结构同样不会存储重复的值，但它的成员必须只能是引用类型的值。

- 垃圾回收不考虑`WeakSet`，即被`WeakSet`引用时引用计数不加一，所以对象不被引用时不管值是否在`WeakSet`中它都终将被删除。
- 因为`WeakSet`是弱引用，由于其他地方操作成员时元素可能会不存在，所以不可以进行`forEach()`遍历等操作
- 因为弱引用的特性，`WeakSet`结构没有`forEach()`、`values()`、`entries()`等方法和`size`属性
- 因为弱引用的特性因此我们可以在当外部引用删除时，希望自动删除集合内的数据时使用`WeakSet`

### 声明定义

以下操作由于集合内的元素不是引用类型的因此会报错

```javascript
let set1 = new WeakSet(['ame', 'rain']); // Invalid value used in weak set
let set2 = new WeakSet('ame'); // Invalid value used in weak set
```

`WeakSet`当中的值必须为引用类型

```javascript
let set1 = new WeakSet([
    ["ame"],
    ["rain"]
]);
console.log(set1); // WeakSet {Array(1), Array(1)}
```

### 基本操作

下面是`WeakSet`的常用操作

```javascript
const set = new WeakSet();
const arr = ['rain', 'ame'];
// 添加操作
set.add(arr);
// 判断集合中是否有指定元素
console.log(set.has(arr)); // true

// 删除操作
set.delete(arr);
console.log(set.has(arr)); // false
```

### 垃圾回收

JavaScript具有垃圾收集机制，也就是说，执行环境会负责管理代码执行过程中使用的内存。垃圾手机机制的原理起始很简单：找出那些不在继续使用的变量，然后释放其占用的内存。为此，垃圾收集器会按照固定的时间间隔（或代码执行过程中预定的手记时间），周期性地执行这一操作。

#### 标记清除

JavaScript中最常用的垃圾收集方式是标记清除。当变量进入环境时，就将这个变量标记为“进入环境”。从逻辑上讲，永远不能释放进入环境中的变量所占用的内存，因为只要执行流进入到相应的环境，就可能会用到它们。而当变量离开环境时，则将其标记为“离开环境”。

垃圾收集器在运行的时候会给在内存中的所有变量都加上标记。然后，它会去掉环境中的变量以及被环境中的变量引用的变量的标记。而在此之后再加上标记的变量将被视为准备删除的变量，原因是环境中的变量已经无法访问到这些变量了。最后，垃圾收集器完成内存清除工作，销毁哪些带标记的值并返回它们所占用的内存空间。

#### 引用计数

另一种不太常见的垃圾收集策略叫作引用计数。引用计数的含义是跟踪记录每个值被引用的次数。当声明了一个变量并将一个引用类型值赋给该变量时，则这个值的引用次数就是1。如果同一个值又赋给了另一个变量，则该值的引用次数加1。相反，如果包含对这个值引用的变量又取得了另一个值，则这个值的引用次数减1。当这个值的引用次数变为0时，则说明已经没有办法再访问这个值了，因而就可以将其占用的内存空间回收回来。这样，当垃圾收集器下次再运行时，它就会释放那些引用次数为0的值所占用的内存空间。

#### WeakSet与垃圾回收

`WeakSet`保存的对象不会增加引用计数器，如果一个对象不被任何变量引用时它将会被自动删除。

- 下列中的数组被`arr`引用了，引用计数器加1
- 数据又添加到了`WeakSet`中，但由于它的弱引用的特性，因此该值的引用计数不会加1，因此它的引用计数还是1
- 当`arr`设置为`null`时，引用计数-1，此时该对象的引用计数为0
- 垃圾回收时将该对象删除，这时`WeakSet`中也就没有记录了

```javascript
const set = new WeakSet();
let arr = ['ame', 'rain'];
set.add(arr);
console.log(set.has(arr)); // true
arr = null;
// 此时还没进行垃圾回收，因此arr还没被清除
console.log(set); // WeakSet {Array(2)}
setTimeout(() => {
    console.log(set); // WeakSet {}
}, 1000);
```

### 案例操作

```html
<style>
    * {
        padding: 0;
        margin: 0;
    }

    body {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    ul {
        list-style: none;
        width: 200px;
        display: flex;
        flex-direction: column;
    }

    li {
        height: 30px;
        border: 2px solid #e67e22;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 10px;
        color: #333;
        transition: 1s;
    }

    a {
        text-decoration: none;
        width: 20px;
        height: 20px;
        background-color: #16a085;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 5px;
        cursor: pointer;
    }

    .removed {
        border: 2px solid #eee;
        opacity: 0.8;
        color: #eee;
    }

    .removed a {
        background-color: #eee;
    }
</style>
</head>

<body>
    <ul>
        <li>吃饭 <a href="javascript:;">x</a></li>
        <li>睡觉 <a href="javascript:;">x</a></li>
        <li>打游戏 <a href="javascript:;">x</a></li>
    </ul>

    <script>
        class Todos {
            constructor() {}

            run() {
                this.items = document.querySelectorAll('ul>li');
                this.lists = new WeakSet();
                this.record();
                this.addEvent();
            }

            // 向集合中添加数据
            record() {
                // 使用querySelectorALL()得到的是静态NodeList，有forEach()方法
                this.items.forEach(item => {
                    this.lists.add(item);
                });
            }

            // 添加事件
            addEvent() {
                this.items.forEach(item => {
                    item.querySelector('a').addEventListener("click", event => {
                        // 检测 WeakSet 中是否存在LI元素
                        const parentElement = event.target.parentElement;
                        if (!this.lists.has(parentElement)) {
                            alert("再点把你手剁了");
                        } else {
                            // 删除后从记录的lists中删除
                            parentElement.classList.add('removed');
                            this.lists.delete(parentElement);
                        }
                    });
                });
            }
        }

        new Todos().run();
    </script>
</body>
```

![WeakSet操作实例](images/WeakSet实例操作.gif)

# 映射

## Map

`Map`是一组键值对的结构，用于解决以往不能用引用类型的值作为键的问题。

- 具有极快的查找速度
- 函数、对象、基本类型都可以作为键或值

### 声明定义

可以接收一个数组作为参数，该数组的成员是一个表示键值对的数组。

```javascript
let map = new Map([
    ['rain', 'ame'],
    ['lsr', 'lxy']
]);
console.log(map); // Map(2) {"rain" => "ame", "lsr" => "lxy"}
```

### 添加元素

使用`set()`方法可以向映射中添加元素，支持链式操作，参数为元素的键和值。

```javascript
let map = new Map();
let obj = {
    name: 'ame'
};
map.set(obj, 'rain').set('name', 'lsr');
console.log(map); // Map(2) {{…} => "rain", "name" => "lsr"}
```

使用构造函数`new Map()`创建的原理如下

```javascript
const map = new Map();
const arr = [
    ['rain', 'ame'],
    ['lsr', 'lxy']
];
// 解构赋值
arr.forEach(([key, value]) => {
    map.set(key, value);
});
console.log(map); // Map(2) {"rain" => "ame", "lsr" => "lxy"}
```

对于键是对象的`Map`。键保存的是内存地址，值相同但内存地址不同的视为两个键

```javascript
// 对于键是对象的Map。键保存的是内存地址，值相同但内存地址不同的视为两个键
let arr = ['rain'];
const map = new Map();
map.set(arr, 'ame');
console.log(map.get(arr)); // 'ame'
console.log(map.get(['rain'])); // undefined
```

### 获取元素数量

使用`size`属性可以获取映射中的元素数量

```javascript
const map = new Map([
    ['rain', 'ame']
]);
console.log(map.size); // 1
```

### 元素检测

使用`has()`方法可以检测指定元素是否在映射中

```javascript
const map = new Map([
    ['rain', 'ame']
]);
console.log(map.has('rain')); // true
```

### 读取元素

使用`get()`方法可以检测指定的元素是否存在于映射中，参数为元素的键名

```javascript
let map = new Map();
map.set('rain', 'ame');
console.log(map.get('rain')); // ame
```

### 删除元素

使用`delete()`方法可以根据键名从映射中删除单个指定元素

```javascript
let map = new Map();
map.set('rain', 'ame');
console.log(map.get('rain')); // ame
map.delete('rain');
console.log(map.size); // 0
```

使用`clear()`方法可以清除映射中的所有元素

```javascript
// 使用clear()方法清除元素
const map = new Map();
let obj1 = {
    name: 'rain',
    age: 22
};
let obj2 = {
    name: 'rain',
    age: 21
};
map.set(obj1, {
    title: '好吃懒做的坏东西'
});
map.set(obj2, {
    title: '一个普通的上班族'
});
console.log(map.size); // 2
console.log(map.get(obj1).title); // 好吃懒做的坏东西
map.clear();
console.log(map.size); // 0
```

### 遍历元素

使用`keys()/values()/entries()`都可以返回与映射相关的迭代器对象。

```javascript
const map = new Map([
    ['rain', 'ame'],
    ['lsr', 'lxy']
]);
console.log(map.keys()); // MapIterator {"rain", "lsr"}
console.log(map.values()); // MapIterator {"ame", "lxy"}
console.log(map.entries()); //MapIterator {"rain" => "ame", "lsr" => "lxy"}
```

可以利用`keys()/values()`方法遍历元素的键与值

```javascript
const map = new Map([
    ['rain', 'ame'],
    ['lsr', 'lxy']
]);

for (const key of map.keys()) {
    console.log(key); // rain lsr
}

for (const value of map.values()) {
    console.log(value); // ame lxy
}
```

使用`for/of`语法糖遍历，相当于使用了`entries()`方法，并借助`entries()`方法返回的值来获取元素的键和值

```javascript
const map = new Map([
    ['rain', 'ame'],
    ['lsr', 'lxy']
]);
for (const [key, value] of map) {
    console.log(key, value); // rain ame lsr lxy
}
```

使用`forEach()`来进行遍历

```javascript
const map = new Map([
    ['rain', 'ame'],
    ['lsr', 'lxy']
]);   
map.forEach((value, key) => {
    console.log(key, value); // rain ame lsr lxy
});
```

### 数组转换

可以使用`...`展开语法或`Array.from()`静态方法将`Map`类型转换为数组，这样就可以使用数组的方法来处理数据了

```javascript
let map = new Map([
    ['rain', 'ame'],
    ['lsr', 'lxy']
]);
console.log(...map); // (2) ["rain", "ame"] (2) ["lsr", "lxy"]
console.log(...map.entries()); // (2) ["rain", "ame"] (2) ["lsr", "lxy"]
console.log(...map.values()); // ame lxy
console.log(...map.keys()); // rain lsr
console.log([...map]); // [Array(2), Array(2)]
console.log(Array.from(map)); // [Array(2), Array(2)]
```

检索包含`小汉堡`的值组成新`Map`

```javascript
const map = new Map([
    ['rain', '小憨包'],
    ['ame', '小汉堡']
]);

let newMap = new Map([...map].filter((item) => {
    return item[1].includes('小汉堡');
}));
console.log(newMap); //  {"ame" => "小汉堡"}
```

### 节点映射

`Map`类型的键可以为任何类型的值，下面使用DOM节点作为键来记录数据

```html
<div desc="一种水果">苹果</div>
<div desc="一种饮料">可乐</div>

<script>
    const divMap = new Map();
    const divs = document.querySelectorAll('div');

    divs.forEach(div => {
        divMap.set(div, {
            content: div.getAttribute('desc')
        });
    });
    divMap.forEach((config, elem) => {
        elem.addEventListener('click', (event) => {
            console.log(divMap.get(event.target).content);
            console.log(config.content);
        });
    });
</script>

```

### 实例操作

当不接受协议时无法提交表单，并根据自定义信息提示用户。

```html
<form action="#" onsubmit="return post()">
    <label for="agreement">接受协议</label>
    <input type="checkbox" message="请接受协议" name="agreement" id="agreement">
    <label for="student">我是学生</label>
    <input type="checkbox" message="网站只对学生开放" name="student" id="student">
    <input type="submit">
</form>

<script>
    function post() {
        const map = new Map();
        const inputs = document.querySelectorAll('input[message]');
        // 存储数据
        inputs.forEach(input => {
            map.set(input, {
                message: input.getAttribute('message'),
                status: input.checked
            });
        });
        // 遍历Map数据
        return [...map].every(([item, config]) => {
            config.status || alert(config.message);
            return config.status;
        });
    }
</script>
```

![Map实例操作](images/Map实例操作.gif)

## WeakMap

`WeakMap`对象是一组键值对的集

- 键名必须是对象
- `WeakMap`对键名是弱引用的，键值是正常引用
- 垃圾回收器不考虑`WeakMap`的键名，不会改变引用计数器，键在其他地方不被引用时被删除
- 因为`WeakMap`是弱引用，由于其他地方操作成员时成员可能会不存在，所以不可以使用`forEach()`等遍历操作
- 由于它的弱引用特性，`WeakMap`不能使用`forEach()/values()/keys()/entries()`等方法以及`size`属性
- 当键外部的引用被删除时，希望可以自动删除数据时可以使用`WeakMap`

### 声明定义

以下操作由于键不是对象类型而产生错误

```javascript
new WeakMap([
    ['rain', 'ame']
]); //  Invalid value used as weak map key
```

将DOM节点保存到`WeakMap`

```html
<div>rain</div>
<div>ame</div>

<script>
    const map = new Map();
    const divs = document.querySelectorAll('div');
    divs.forEach(div => {
        map.set(div, div.innerHTML);
    });
    console.log(map); //  {div => "rain", div => "ame"}
</script>
```

### 基本操作

下面是`WeakMap`常用基本操作

```javascript
const map = new WeakMap();
const arr = ['rain'];
// 添加操作
map.set(arr, 'ame');

// 获取元素
console.log(map.get(arr)); // amr

// 删除操作
console.log(map.delete(arr)); // true 删除操作

// 检索判断
console.log(map.has(arr)); // false
```

### 垃圾回收

`WeakMap`的键名对象不会增加引用计数器，如果一个对象不被引用了则会被自动删除。

- 下例当`arr`被删除时它的内存会被释放，因为`WeakMap`是弱引用不会产生引用计数
- 垃圾回收时将没有引用的对象清除，因为对象被删除了，所以`WeakMap`中键对应的数据也被删除了

```javascript
let arr = ['rain'];
const map = new WeakMap([
    [arr, 'ame']
]);
arr = null;
console.log(map); // WeakMap {Array(1) => "ame"}
setTimeout(() => {
    console.log(map); // WeakMap {}
}, 10000);
```

### 选课案例

```html
<style>
    * {
        padding: 0;
        margin: 0;
    }

    body {
        padding: 20px;
        width: 100vw;
        display: flex;
        justify-content: center;
        box-sizing: border-box;
    }

    div {
        border: 2px solid #ddd;
        padding: 10px;
        flex: 1;
    }

    div:last-of-type {
        margin-left: -2px;
    }

    ul {
        list-style-type: none;
        display: flex;
        flex-direction: column;
        width: 200px;
    }

    li {
        height: 30px;
        border: 2px solid #2ecc71;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 10px;
        color: #333;
        transition: 1s;
    }

    a {
        text-decoration: none;
        border-radius: 3px;
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #2ecc71;
        color: #fff;
        cursor: pointer;
        margin-right: 5px;
    }

    .remove {
        border: 2px solid #eee;
        opacity: 0.8;
        color: #eee;
    }

    .remove a {
        background-color: #eee;
    }

    p {
        margin-top: 20px;
    }

    p span {
        display: inline-block;
        background-color: #2ecc71;
        padding: 5px;
        color: #fff;
        margin-right: 10px;
        border-radius: 5px;
        margin-bottom: 10px;
    }
</style>

<body>
    <div>
        <ul>
            <li><span>高数</span> <a href="javascript:;">+</a></li>
            <li><span>大物</span> <a href="javascript:;">+</a></li>
            <li><span>离散数学</span> <a href="javascript:;">+</a></li>
        </ul>
    </div>
    <div>
        <strong id="count">共选了2门课</strong>
        <p id="lists"></p>
    </div>

    <script>
        class Lesson {
            constructor() {
                this.lis = document.querySelectorAll('ul>li');
                this.countElem = document.getElementById('count');
                this.listElem = document.getElementById('lists');
                this.map = new WeakMap();
            }

            run() {
                this.lis.forEach(li => {
                    li.querySelector('a').addEventListener('click', event => {
                        const elem = event.target;
                        const state = elem.getAttribute('select');
                        if (state) {
                            elem.removeAttribute('select');
                            this.map.delete(elem.parentElement);
                            elem.innerHTML = '+';
                            elem.parentElement.classList.remove('remove');
                            elem.style.backgroundColor = '#2ecc71';
                        } else {
                            elem.setAttribute('select', true);
                            this.map.set(elem.parentElement, true);
                            elem.innerHTML = '-';
                            elem.parentElement.classList.add('remove');
                            elem.style.backgroundColor = '#e74c3c';
                        }
                        this.render();
                    });
                });
            }

            count() {
                return [...this.lis].reduce((count, item) => {
                    return count += this.map.has(item) ? 1 : 0;
                }, 0);
            }

            lists() {
                return [...this.lis].filter(li => {
                    return this.map.has(li);
                }).map(li => {
                    return `<span>${li.querySelector('span').innerHTML}</span>`;
                });
            }

            render() {
                this.countElem.innerHTML = `共选了${this.count()}门课程`;
                this.listElem.innerHTML = this.lists().join('');
            }
        }

        new Lesson().run();
    </script>
</body>
```

![WeakMap实例操作](images/WeakMap实例操作.gif)

# 函数

## 基础知识

函数是将复用的代码块封装起来的模块，在JavaScript中函数还有其他语言所不具有的特性，接下来我们将一起来探讨一下函数的使用技巧。

### 声明定义

在JS中函数也是第一类对象，因为它也是`Function`类创建的实例，因此我们可以把函数当作一个普通对象使用，给它添加属性和方法。

通过`Function`构造函数创建函数对象，`Function`构造函数可以接收任意数量的参数，但最后一个参数始终都被认为是函数体，而前面的参数则被看作新函数的形参。下面的例子方便理解函数也是对象。

```javascript
// 函数也是第一类对象
let sum = new Function('num1', 'num2', 'return num1 + num2');
console.log(sum(1, 2)); // 3
```

标准语法是使用函数声明来定义函数，函数名作为函数对象的唯一标识符

```javascript
// 函数声明
function sum(num1, num2) {
    return num1 + num2;
}
console.log(sum(1, 2)); // 3
```

除此之外，函数有以下几种调用方式：

- 作为函数直接被调用，如果一个函数没有作为方法、构造函数或者通过`apply()`和`call()`方法调用的话，我们就称之为作为函数被直接调用。通过可以计算得到函数的表达式加上`()`运算符调用一个函数，且被执行的函数表达式不是作为一个对象的属性时，就属于这种调用类型。
- 作为方法被调用。当一个函数被赋值给一个对象的属性，并且通过对象属性引用的方式调用函数时，函数就会作为对象的方法被调用。
- 作为构造函数调用。通过在函数调用之前使用关键字`new`可以将函数作为构造函数调用。（构造函数到对象的时候再详细讨论）。
- 使用`apply()`和`call()`方法调用，可以给函数传入指定的函数上下文。

作为对象的方法调用

```javascript
// 作为对象方法调用
let obj = {
    name: 'ame',
    getName() {
        return this.name;
    }
}
console.log(obj.getName()); // ame
```

全局函数声明时会默认添加到全局`window`对象中作为对象的方法，这并不太好，这有可能会覆盖原生`window`对象中的同名属性，我们以后可以使用模块化来处理

```javascript
console.log(window.screenX); // 2946
```

当我们定义了`screenX()`函数后就会覆盖原始的`screenX`属性

```javascript
function screenX() {
    return '哈哈';
}
console.log(window.screenX()); // 哈哈
```

可以使用函数表达式来声明函数，函数表达式就是将函数声明作为整个表达式的一部分，使用函数表达式时不会有提升效果（前面讲过），且使用`let/const`赋值的变量不会将其添加到全局对象`window`中

```javascript
// 函数表达式
let screenX = function () {
    return '哈哈';
};
console.log(screenX()); // 哈哈
console.log(window.screenX); // 2946
```

### 匿名函数

因为函数也是一种特殊类型的对象，所以可以通过赋值来获取指向函数对象的指针，当然指针也可以传递给其他变量，本质上就是将函数声明作为了赋值表达式的一部分，因此语句后也应该以`;`结尾。

下面使用函数表达式匿名函数赋值给变量。

```javascript
let sum = function (num1, num2) {
    return num1 + num2;
};
console.log(sum instanceof Object); // true
let test = sum;
console.log(test(1, 2)); // 3
```

标准的函数声明具有函数提升效果（原理在这儿：[注册标识符的过程](#注册标识符的过程)）

```javascript
console.log(show()); // 哈哈
function show() {
    return '哈哈';
}
```

而使用函数表达式声明的函数没有函数提升效果

```javascript
console.log(show()); // Cannot access 'show' before initialization
let show = function () {
    return "haha";
};
```

### 存储函数

存储函数是将函数作为对象灵活使用的一个应用例子。我们可以将函数存储到一个容器中，通过给函数添加一个唯一的标识符属性，我们就可以判断函数是否已经存储过了，这样就能避免重复存储相同的函数。比如我们在管理一个事件发生后需要调用的回调函数的集合，我们在存储这些回调函数时，需要判断哪个函数对于这个集合来说是一个新的函数，哪个函数是已经存在于集合中的；一般来说，我们并不希望存在重复函数，否则一个事件会导致同一个回调函数触发多次。

```javascript
const store = {
    nextId: 1,
    cache: {},
    add: function (fn) {
        // 判断函数唯一性
        if (!fn.id) {
            // 给函数添加标识符
            fn.id = this.nextId++;
            this.cache[fn.id] = fn;
            return true;
        }
        return false;
    }
};

function show() {
    console.log('haha');
}
console.log(store.add(show)); // true
console.log(store.add(show)); // false
```

### 自记忆函数

顾名思义，自记忆函数能够记住上次计算的结果，当函数计算出结果时就将该结果保存起来，如果之后调用这个函数又传入相同的参数时，自记忆函数将直接返回上次存储的结果，不在重新进行计算。这样当函数计算比较复杂时在一定程度上可以提高函数的性能。

下例是判断一个数是否是质数的自记忆函数

```javascript
function isPrime(num) {
    // 创建缓存
    if (!isPrime.answers) {
        isPrime.answers = {};
    }
    if (isPrime.answers[num]) {
        return isPrime.answers[num];
    }
    // 1 不是质数
    let prime = num != 0 && num != 1;
    const temp = Math.ceil(num / 2); // 缩小区间
    // 判断是否是质数（公因式法）
    for (let i = 2; i <= temp; i++) {
        if (num % i === 0) {
            prime = false;
            break;
        }
    }
    return isPrime.answers[num] = prime;
}
console.log(isPrime(3));
console.log(isPrime(4));
console.dir(isPrime);
```

### 立即执行函数

当想进行函数调用时，我们需要使用一个能够计算得到函数的表达式，其后跟着一对函数调用括号，括号内包含函数的参数。再最基本的函数调用中，我们把求值得到函数的标识符作为左值（如`test()`）。不过用于被`()`调用的表达式不必只是一个简单的标识符，它可以是任何能够求值得到函数的表达式。比如我们首先创建一个函数，然后立即调用这个新创建的函数，这种函数就叫作立即调用函数表达式（IIFE），或者简写为立即函数。

立即函数可以用来定义私有作用域以防止对全局作用域的污染

```javascript
(function () {
    function show() {
        console.log('haha');
    }
})();
show(); // show is not defined
```

由于函数在执行完毕后会销毁自己的作用域，因此可以发现立即执行函数和块级作用域有一些相似

```javascript
{
    let name = 'ame';
}
console.log(ame); // ame is not defined
```

### 函数提升

使用函数声明的方式声明的函数有函数提升效果，再解析过程中，由于它是在注册标识符过程的第二步就已经将函数绑定到词法环境中与函数名相同的标识符上了，如果接下来再声明同名变量的话，则会保留函数声明时绑定的值。因此，函数声明的提升优先级高于使用`var`关键字声明的变量（因为他要到执行赋值语句时才会重新覆盖在词法作用域中的绑定值）。

```javascript
console.log(ame()); // haha
var ame = 'rain';
function ame() {
    return 'haha';
}
console.log(ame); // rain
```

### 形参实参

形参是在函数声明时设置的参数，实参指在调用函数时传递的参数。

- 形参数量大于实参时，没有传参的形参值为`undefined`
- 实参数量大于形参时，多余的实参将忽略并不会报错

```javascript
// n1,n2 为形式参数
function sum(n1, n2) {
    return n1 + n2;
}
// 参数 1,2 为实际参数
console.log(sum(1, 2)); // 3
```

形参数量大于实参时，没有传参的形参值为`undefined`

```javascript
// 形参数量大于实参时，没有传参的形参值为 undefined
function sum(n1, n2) {
    return n1 + n2;
}
console.log(sum(1)); // NaN
```

实参数量大于形参时，多余的实参将忽略并不会报错

```javascript
// 实参数量大于形参时，多余的实参将忽略并不会报错
function sum(n1, n2) {
    return n1 + n2;
}
console.log(sum(1, 2, 3)); // 3
```

### 默认参数

当我们不给形参传值时形参会采用默认值，这样的参数就叫默认参数。

下面通过计算年平均销售额来体验以往默认参数的处理方式

```javascript
// 通过计算年平均销售额来体验以往默认参数的处理方式
function average(total, year) {
    year = year || 1;
    return Math.round(total / year);
}
console.log(average(2000, 3)); // 667
```

使用新版本的默认参数方式如下

```javascript
function avg(total, year = 1) {
    return Math.round(total / year);
}
console.log(avg(3000, 3)); // 1000
```

下面通过排序来体验新版默认参数的处理方式，下例中当不传递`type`参数时使用默认值`asc`

```javascript
// 数组排序
function sortArray(arr, type = 'asc') {
    return arr.sort((a, b) => type === 'asc' ? a - b : b - a);
}
console.log(sortArray([2, 3, 1, 4, 5])); // [1,2,3,4,5]
console.log(sortArray([2, 3, 1, 4, 5], type = 'desc')); // [5,4,3,2,1]
```

### 函数参数

JS中的函数同时也是`Function`类型的实例对象，因此可以将函数作为参数传递，这也是大多数语言支持的语法规则

```html
<button>click me</button>

<script>
    document.querySelector('button').addEventListener('click', function () {
        alert('哈哈哈哈哈哈');
    });
</script>
```

![函数参数](images/函数参数.gif)

函数可以作为参数传递

```javascript
// 函数可以作为参数传递
function filterFun(item) {
    return item <= 3;
}
console.log([1, 3, 5, 7, 9].filter(filterFun)); // [1,3]
```

### arguments

`arguments`参数是隐式传递给函数的所有参数集合。无论是否有明确定义对应的形参，通过它我们都可以访问到函数的所有参数。注意`arguments`虽然有`length`属性，但他并不是数组，而只是一个类数组对象。

`arguments`对象的`length`属性可以获得传入实参的确切个数。

```javascript
function test() {
    console.log(arguments.length);
}
test(1, 2, 3); // 3
```

`arguments`参数可以作为函数参数的别名，例如，如果为`arguments[0]`赋一个新值，那么，同时也会改变第一个形参的值

```javascript
function test(n1, n2) {
    console.log(n1, n2); // 1 2
    console.log(arguments[2]); // 3
    arguments[0] = 100;
    console.log(n1, n2); // 100 2
}
test(1, 2, 3);
```

反之亦然。如果我们更改了某个参数的值，会同时影响参数和`arguments`对象

```javascript
function test(n1) {
    console.log(n1); // 1
    console.log(arguments[0]); // 1
    n1 = 100;
    console.log(arguments[0]); // 100
}
test(1);
```

`arguments`对象的`callee`属性指向拥有本`arguments`对象的函数

```javascript
function test(n1) {
    console.log('HAHA');
    console.log(arguments.callee.arguments[0]); // 1
}
test(1);
```

函数对象的`caller`属性指向调用此函数的函数

```javascript
function test() {
    console.log('test');
    run();
}
function run() {
    console.log('run');
    console.log(arguments.callee.caller.arguments[0]); // 1
}
test(1, 2, 3);
```

在非严格模式下使用`arguments`对象可以减少耦合性，但是我们并不推荐使用`arguments`对象，因为将`arguments`对象作为函数参数别名使用时会影响代码的可读性，因此在严格模式下将无法使用`arguments`对象。

```javascript
function test(n1) {
    'use strict'
    console.log(n1, arguments[0]); // 1 1
    arguments[0] = 100;
    // 第一个形参的值没有改变
    console.log(n1, arguments[0]); // 1 100
}
test(1);
```

我们更建议使用收集参数，因为收集参数会把参数收集成一个数组，使用起开会更方便

```javascript
function test(...args) {
    console.log(args); // [1,2,3,4,5]
}
test(1, 2, 3, 4, 5);
```

### 箭头函数

箭头函数是函数表达式的简化版，在使用递归调用、构造函数、事件处理器时不建议使用箭头函数。箭头函数没有`this`（函数上下文）。

没有参数时参数列表使用空括号即可

```javascript
// 无参数
let sum = () => {
    return 1 + 2;
};
console.log(sum()); // 3
```

函数体为单一表达式时不需要`return`关键字返回处理结果，它会自动返回表达式的计算结果

```javascript
let sum = () => 1 + 2;
console.log(sum()); // 3
```

多参数传递时参数列表中的参数使用`,`分隔开

```javascript
let sum = (n1, n2) => n1 + n2;
console.log(sum(1, 2)); // 3
```

只有一个参数时可以省略括号

```javascript
// 只有一个参数
let items = [1, 2, 3, 4, 5].filter(item => item < 3);
console.log(items); // [1,2]
```

有关箭头函数的作用域问题咱们后面再讲

### 递归调用

递归指函数内部调用自身的方式

- 主要用于数量不确定的循环操作
- 要有退出时机否则会陷入死循环

下面通过阶乘来体验递归调用（这里是归的时候处理）

```javascript
function factorial(num = 3) {
    return num == 1 ? 1 : num * factorial(num - 1);
}
console.log(factorial()); // 6
```

累加计算方法

```javascript
// 累加计算方法
function sum(...nums) {
    return nums.length == 0 ? 0 : nums.pop() + sum(...nums);
}
console.log(sum(1, 2)); // 3
```

递归打印倒三角

```javascript
function star(row = 5) {
    if (row == 0) return '';
    document.write('*'.repeat(row) + '<br/>');
    star(--row);
}
star();

*****
****
***
**
*
```

使用递归修改课程点击数（这里是递的时候处理）

```javascript
let lessons = [
    {
        title: '高等数学',
        click: 100
    },
    {
        title: '大学物理',
        click: 120
    },
    {
        title: '离散数学',
        click: 39
    }
];

function change(lessons, num, i = 0) {
    if (i === lessons.length) return lessons;
    lessons[i].click += num;
    return change(lessonbs, num, ++i);
}
```

### 回调函数

在某个时刻被其他函数调用的函数称为回调函数，比如处理键盘、鼠标事件的函数

```javascript
document.querySelector('button').addEventListener('click', function () {
    alert('hi');
});
```

使用回调函数递增计算

```javascript
// 使用回调函数递增计算
let ame = [1, 2, 3].map(item => item + 10);
console.log(ame); // [11,12,13]
```

### 展开语法

展开语法（点语法）体现的就是`收/放`特性。作为值时就是`放`，会把容器内的值全部拿出来；作为接收变量就是`收`，会把变量收集到一个新的数组中

```javascript
let ame = [1, 2, 3];
let [a, b, c] = [...ame];
console.log(a, b, c); // 1 2 3
[...ame] = [4, 5, 6];
console.log(ame); // [4,5,6]
```

使用展开语法可以替代`arguments`对象来接收任意数量的参数

```javascript
function test(...args) {
    console.log(args); // [1,2,3]
}
test(1, 2, 3);
```

也可以用于接收部分参数

```javascript
function test(site, ...args) {
    console.log(site, args);
}
test('rain', 1, 2, 3); // rain [1,2,3]
```

使用`...`可以将传入的多个参数收集到一个数组中，下面是使用点语法进行求和计算

```javascript
function sum(...params) {
    console.log(params);
    return params.reduce((total, cur) => {
        return total += cur;
    }, 0);
}
console.log(sum(1, 2, 3)); // 6
```

使用收集参数时手机参数必须放在函数参数列表的最后面，下面计算购物车商品折扣

```javascript
function sum(discount = 0, ...prices) {
    let total = prices.reduce((total, cur) => {
        return total += cur;
    }, 0);
    return total * (1 - discount);
}
console.log(sum(0.1, 100, 200, 199)); // 440.1
```

### 标签函数

标签函数可以用来解析标签字符串，第一个参数是字符串值得数组，其余得参数是标签变量。

```javascript
function ame(str, ...values) {
    console.log(str); // ["姓名：", "年龄：", "", raw: Array(3)]
    console.log(values); // ["rain", 22]
}
let name = 'rain',age = 22;
ame `姓名：${name}年龄：${age}`;
```

## 函数上下文（this）

当调用函数时，会向函数传递两个隐式参数，一个是`arguments`对象，而另一个是函数上下文（`this`），`this`指向与函数调用相关联的对象。注意`this`参数的指向不仅是由定义函数的方式和位置决定的，同时它还严重受到函数调用的影响。

### 作为函数调用

通过可以计算得到函数的表达式加上`()`运算符调用一个函数，且被执行的函数表达式不是作为一个对象的属性时，就属于这种调用类型。

非严格模式下，作为函数被调用时，`this`指向全局`window`对象

```javascript
console.log(this === window); // true
```

严格模式下，作为函数被调用时，`this`为`undefined`，这正是我们想要的，因为函数作为函数被调用时并没有指定函数被调用的对象。

```javascript
function test() {
    'use strict';
    console.log(this);
}
test(); // undefined
```

会被立即调用的函数表达式（立即执行函数），作为函数被调用，由于在非严格模式下，因此这里返回`window`对象

```javascript
let ame = {
    IIFEContext: (function () {
        return this;
    })()
};
console.log(ame.IIFEContext); // window
```



### 作为方法调用

当一个函数被赋值给一个对象的属性，并且通过对象属性引用的方式调用函数时，函数会作为对象的方法被调用。

函数作为某个对象的方法被调用时，该对象会成为函数的上下文，并且在函数内部可以通过隐式参数`this`访问到。

我们通过下面的例子来体验函数作为函数调用和作为方法调用的异同点：

当直接通过函数名调用，也就是将函数作为函数调用时，因为是在非严格模式下执行，因此这里返回`window`对象

```javascript
function whatsMyContext() {
    return this;
}
console.log(whatsMyContext()); // window
```

将该函数赋值给另一个变量，由于函数是第一类对象，因此相当于创建了`whatsMyContext`函数的一个引用，然后通过函数名直接调用，结果返回全局对象`window`

```javascript
let getMyThis = whatsMyContext;
console.log(getMyThis()); // window 
```

将`whatsMyContext`函数赋值给对象的`getMyThis`属性，并且通过方法引用调用该函数时，它的函数上下文会返回与函数调用相关联的`ame`对象。不要认为`whatsMyContext`函数成为了`ame`对象的一个方法，`whatsMyContext`是一个独立的函数，它可以有多种调用方式，它只不过是将函数的引用（地址）赋值给了对象属性。

```javascript
let ame = {
    name: 'ame',
    getMyThis: whatsMyContext
};
console.log(ame.getMyThis()); // ame对象
```

除此之外，我们经常会遇到方法调用与函数调用相结合的情况（如使用回调函数），这时候我们可以通过绑定作用域的方式来解决`this`指向不一的问题

```javascript
let foods = {
    brand: '星星超市',
    goods: ['薯条', '炸鸡腿', '可乐'],
    show() {
        // 绑定外层作用域
        const self = this;
        return this.goods.map(function (food) {
            // 该回调函数属于函数调用方式，因此this为window
            return `${self.brand}-${food}`;
        });
    }
};
console.log(foods.show()); // ["星星超市-薯条", "星星超市-炸鸡腿", "星星超市-可乐"]
```



### 作为构造函数调用

若要通过构造函数的方式调用，需要在函数调用之前使用关键字`new`。

注意不要把这些函数的构造器与构造函数混为一谈，通过函数构造器我们可以将动态创建的字符串创建为函数，而构造函数是我们通常用来创建和初始化对象实例的函数。

一般来讲，当调用构造函数时会发生一系列特殊的操作：

1. 创建一个新的空对象
2. 将该对象最为`this`参数传递给构造函数，从而成为构造函数的函数上下文。
3. 执行函数中的代码。
4. 将新构造出的对象作为函数的返回值（默认情况）

```javascript
function User(name, age) {
    this.name = name;
    this.age = age;
}
console.log(new User('rain', 22)); // User {name: "rain", age: 22}
```

我们知道构造函数默认会返回新生成的对象，但我们也可以人为地给构造函数设置一个返回值，构造函数返回值遵循以下规则：

- 如果构造函数返回一个对象，则该对象将作为整个表达式的值返回，而传入的构造函数的`this`将被丢弃。
- 如果构造函数返回的是非引用类型的值，则忽略自己设置的返回值，返回新生城的对象（`this`）。

返回值为引用类型

```javascript
function User(name, age) {
    this.name = name;
    this.age = age;
    return {
        name,
        age,
        getName() {
            return this.name;
        }
    };
}
const user1 = new User('ame', 21);
console.log(user1.getName()); // ame
```

返回值为非引用类型

```javascript
function User(name, age) {
    this.name = name;
    this.age = age;
    return `我的名字是${this.name}，今年${this.age}岁`;
}
console.log(new User('ame', 22)); // User {name: "ame", age: 22}
```

### 箭头函数

箭头函数没有单独的`this`值，箭头函数与声明时所在的上下文的`this`相同。由于箭头函数没有`this`，因此它会沿着作用域链一直往上寻找，直到找到`this`值。

下列匿名函数是作为函数被调用的，因此`this`指向`window`对象

```javascript
var name = 'lsr';
let obj = {
    name: 'ame',
    getName() {
        return function () {
            return this.name;
        }
    }
};
console.log(obj.getName()()); // lsr
```

使用箭头函数后`this`为定义该函数时的上下文，也可以理解为定义时父作用域中的`this`。这里通过对象调用`getName()`方法时箭头函数的父级作用域中的`this`指向与函数调用相关联的对象`obj`。

```javascript
var name = 'lsr';
let obj = {
    name: 'ame',
    getName() {
        return () => {
            return this.name;
        }
    }
};
console.log(obj.getName()()); // ame
```

在进行事件处理时，我们可以合理使用箭头函数

- 绑定事件处理函数时可以理解为为DOM节点对象的相应属性（如`onclick`）设置值，所以使用`function`声明的函数作为事件处理函数时，事件处理函数中的`this`默认指向注册该事件处理函数的DOM节点对象。
- 而使用箭头函数作为事件处理函数时，由于箭头函数没有`this`，因此它会沿着作用域链向父级寻找，直到找到`this`值（可以理解函数声明时所在的上下文的`this`）。

下面是使用普通方法声明的函数作为事件处理函数的例子，普通函数的`this`指向注册事件处理函数的DOM元素对象

```html
<button desc="哈哈">click me</button>

<script>
    let dom = {
        name: 'rain',
        bind() {
            const btn = document.querySelector('button');
            btn.addEventListener('click', function () {
                alert(this.getAttribute('desc'));
            });
        }
    }
    dom.bind(); // 哈哈
</script>
```

下面是使用箭头函数作为事件处理函数的例子，箭头函数的`this`为创建箭头函数时所在上下文的`this`

```javascript
let dom = {
    name: 'rain',
    bind() {
        const btn = document.querySelector('button');
        btn.addEventListener('click', event => {
            alert(this.name + event.target.getAttribute('desc'));
        });
    }
}
dom.bind(); //rain哈哈
```

利用对象的`handleEvent`属性绑定事件处理函数时，`this`指向当前对象而不是DOM元素对象

```javascript

let dom = {
    name: 'rain',
    handleEvent: function (event) {
        console.log(this);
    },
    bind() {
        const btn = document.querySelector('button');
        // 会默认将对象中的 handleEvent 属性作为事件处理函数
        btn.addEventListener('click', this);
    }
};
dom.bind(); // {name: "rain", handleEvent: ƒ, bind: ƒ}
```

## apply / call / bind

使用以上三种方法我们都能够显示地设置函数的函数上下文（`this`）

### apply / call

JavaScript为我们提供了一种调用函数的方式，从而可以显示地指定任何对象作为函数的上下文。我们可以使用每个函数上都存在的这两种方法（函数是由内置的`Function`构造函数所创建的实例对象）来完成：`apply()`和`call()`。

这两个方法的作用一样都是将函数的函数上下文（`this`）设置为指定对象，并执行函数中的代码，只是两个方法在传递参数上有所不同。

- `apply()`方法第一个参数为作为函数上下文的对象，第二个参数为作为函数调用所需参数的一个数组
- `call()`方法第一个参数同样也是作为函数上下文的指定对象，而第二个参数则是作为函数调用所需参数的一个参数列表

当把函数上下文设置为`null`或`undefined`时，非严格模式下`this`默认指向全局对象`window`。

基本语法

```javascript
function show(title) {
    console.log(`${title + this.name}`);
}
let ame = {
    name: 'ame'
};
let rain = {
    name: 'rain'
};
show.apply(ame, ['嘻嘻']); // 嘻嘻ame
show.call(rain, '哈哈'); // 哈哈ame
```

使用方法`call()`设置函数上下文

```html
<button message="炸鸡腿">button</button>
<button message="冰可乐">button</button>

<script>
    function show() {
        console.log(this.getAttribute('message'));
    }
    const btns = document.querySelectorAll('button');
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', () => show.call(btns[i]));
    }
</script>
```

找数组中的数值最大值

```javascript
let arr = [1, 2, 3, 4, 5];
console.log(Math.max(arr)); // NaN
console.log(Math.max(...arr)); // 5
console.log(Math.max.apply(Math, arr)); // 5
```

### 隐藏/显示面板

```html
<style>
    * {
        padding: 0;
        margin: 0;
    }

    body {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    dl {
        width: 400px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    dt {
        height: 50px;
        width: 100%;
        background-color: #ff7979;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        font-size: 1.5em;
        color: #fff;
        border-bottom: 2px solid #333;
    }

    dd {
        height: 200px;
        width: 100%;
        background-color: #e056fd;
        height: 200px;
        text-align: center;
        font-size: 5em;
        color: #fff;
        line-height: 200px;
    }
</style>  

<dl>
    <dt>Rain</dt>
    <dd>1</dd>
    <dt>ame</dt>
    <dd hidden="hidden">2</dd>
</dl>

<script>
    function panel(i) {
        const dds = document.querySelectorAll('dd');
        dds.forEach(item => {
            // 先全部隐藏
            item.setAttribute('hidden', 'hidden');
        });
        // 再显示对应项
        dds[i].removeAttribute('hidden');
    }
    document.querySelectorAll('dt').forEach((dt, i) => {
        dt.addEventListener('click', () => panel.call(null, i));
    });
</script>
```

![显示隐藏面板](images/显示隐藏面板.gif)

### bind

`bind()`方法可以将函数的上下文设置为某个指定对象，并返回绑定后这个新生成的函数，这个方法绑定完函数上下文后不会立即就执行。

- 与`call()/apply()`方法不同`bind()`方法不会立即执行
- `bind()`不会更改原始函数，而是绑定完成后返回新生成的函数

`bind()`方法是复制函数行为

```javascript
let a = function () {};
let b = a;
console.log(a === b); // true
// bind会返回新生成的函数
let c = a.bind();
console.log(a === c); //false
```

绑定参数注意事项

```javascript
// 绑定参数注意事项
function test(a, b) {
    return this.f + a + b;
}
// 生成新函数，并将2赋值给形参a
let newFunc = test.bind({
    f: 1
}, 2);
// 1+2+3 3赋值给了b
console.log(newFunc(3)); // 6
```

在事件中使用`bind()`方法

```html
<button>click me</button>

<script>    
    document.querySelector('button').addEventListener('click', function (e) {
        console.log(e.target.innerHTML + this.msg);
    }.bind({
        msg: '哈哈'
    }));
</script>
```

### 我变色了

动态改变元素背景颜色

```html
<style>
    * {
        padding: 0;
        margin: 0;
    }

    body {
        width: 100vw;
        height: 100vh;
    }

    div {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 3em;
        color: #ecf0f1;
        transition: .4s;
        background-color: #9b59b6;
    }
</style>

<div>RainJS</div>

<script>
    function Color(el) {
        this.el = el;
        this.colors = ['#16a085', '#27ae60', '#2980b9'];
    }
    Color.prototype.run = function () {
        setInterval(function () {
            let pos = Math.floor(Math.random() * this.colors.length);
            this.el.style.backgroundColor = this.colors[pos];
        }.bind(this), 500);
    };
    new Color(document.querySelector('div')).run();
</script>
```

![变色](images/变色.gif)

## 生成器函数

生成器是一种特殊类型的函数。当从头到尾执行标准函数时，它最多只生成一个值。然而生成器函数会在几次运行请求中暂停（挂起），因此每次运行都可能会生成一个值，它常用来生成一系列值中的一个值。

### 声明定义

使用函数声明声明函数时，通过在`function`关键字后面增加一个`*`号可以定义生成器函数，在生成器函数中可以使用`yield`关键字来生成独立的值。

生成器函数能生成一组值的序列，但每个值的生成是基于每次请求的，并不同于标准函数那样生成。我们必须显示地向生成器请求一个新的值，随后生成器要么响应一个新生成的值，要么就告诉我们它之后都不会再生成新的值。最有特点的是，每当生成器生成了一个值，他都不会像普通函数一样停止执行，而是它会在上一次返回值的地方挂起等待，随后，当对另一个值的请求到来后，生成器就会从上次离开的地方恢复执行。

使用生成器函数生成一系列食物

```javascript
function* FoodGenerator() {
    yield '可乐';
    yield '炸鸡';
    yield '薯条';
}
// 使用 for-of 来循环遍历
for (const value of FoodGenerator()) {
    console.log(value); // 可乐 炸鸡 薯条
}
```

我们把执行生成器得到的结果放在`for/of`循环的右边，如果按正常标准函数理解，由于函数体中没有`return`语句，因此函数的最终结果应该为`undefined`，但是事实却不是这样，这是为什么呢？

这是因为生成器函数和标准函数非常不同。调用生成器函数并不会执行生成器函数，相反，它会创建一个叫作迭代器的（iterator)对象。

### 通过迭代器对象控制生成器

调用生成器函数不会执行生成器的函数体，而是会创建一个迭代器对象，通过我们创建的迭代器对象，可以实现与生成器通信。

通过迭代器对象的`next()`方法可以向生成器请求一个新的值；生成器会返回一个对象，其中包含着一个返回值以及一个指示器告诉我们生成器是否完成了值的生成。

例如，可以通过迭代器对象请求满足条件的值

```javascript
// 定义一个生成器，它能生成一个包含两个武器数据的序列
function* FoodGenerator() {
    yield '可乐';
    yield '炸鸡';
}
// 调用生成器得到一个迭代器，从而我们能够控制生成器的执行
const foodIterator = FoodGenerator();

// 结果为一个对象，其中饱含着一个返回值以及一个指示器告诉我们生成器是否完成了值的生成
const result1 = foodIterator.next();
console.log(result1); // {value: "可乐", done: false}

// 再次调用 next() 方法从生成器中获取一个新的值
const result2 = foodIterator.next();
console.log(result2.value); // 炸鸡

// 当没有可生成的新的值时，生成器的返回值为undefined，done为true，表示完成了值的生成
const result3 = foodIterator.next();
console.log(result3); // {value: undefined, done: true}
```

当调用了迭代器对象的`next()`方法后，生成器就开始执行代码，当代码执行到`yield`关键字时，就会生成一个中间结果（生成值序列中的一项），然后返回一个新对象，其中封装了结果值和一个指示完成的指示器。

每当生成一个当前值后，生成器就会非阻塞地挂起执行，随后耐心等待下一次请求的到达。

在本例中，第一次调用生成器的`next()`方法让生成器代码执行到第一个`yield`表达式的位置，然后返回了一个对象。该对象的属性`value`的值为`可乐`，属性`done`的值为`false`，表明之后还可能会生成新的值；随后，再次调用迭代器的`next()`方法将生成器从挂起状态唤起，中断执行的生成器从上次离开的位置继续执行代码，直到再次遇到另一个中间值：`yield '炸鸡'`，随即生成了一个包含着值`炸鸡`的对象，然后进入挂起状态；最后，当第三次调用`next()`方法，生成器再次恢复执行，但这一次，没有更多可供它执行的代码了，所以生成器返回一个结果对象，属性`value`被设置为`undefined`，属性`done`被置为`true`，表明生成器的工作已经完成了。

### 对迭代器进行迭代

我们通过调用生成器所暴露出的`next()`方法，可以获得一个携带者返回值的对象和一个指示器，通过检测指示器的值，我们可以判断生成器是否完成了值的生成。

我们可以利用这一原理，使用普通的`while`循环来迭代生成器生成的序列值

```javascript
function* FoodGenerator() {
    yield '可乐';
    yield '炸鸡';
}
const foodIterator = FoodGenerator();
let item;
while (!(item = foodIterator.next()).done) {
    console.log(item.value); // 可乐 炸鸡
}
```

以上也就是`for/of`循环的原理，`for/of`循环不过是对迭代器进行迭代的语法糖。

```javascript
for (const value of FoodGenerator()) {
    console.log(value); // 可乐 炸鸡
}
```

不同于手动一直调用迭代器的`next()`方法，`for/of`循环同时还要查看生成器是否完成了值得生成，它在后台自动做了完全相同的工作。

### 把执行权交给下一个生成器

正如在标准函数中调用另一个标准函数，我们需要把生成器的执行委托给另一个生成器。

如下例，生成器不仅生成了“食物”，也生成了“饮料”

```javascript
function* FoodGenerator() {
    yield '炸鸡';
    yield* DrinkGenerator();
    yield '薯条';
}

function* DrinkGenerator() {
    yield '可乐';
    yield '橙汁';
}

for (const value of FoodGenerator()) {
    console.log(value); // 炸鸡 可乐 橙汁 薯条
}

const foodIterator = FoodGenerator();
let item;
while (!(item = foodIterator.next()).done) {
    console.log(item.value); // 炸鸡 可乐 橙汁 薯条
}
```

在迭代器上使用`yield`操作符，程序会跳转到另外一个生成器上执行。本例中，程序从`FoodGenerator`跳转到一个新的`DrinkGenerator`生成器上，每次调用`FoodGenerator`返回迭代器的`next()`方法，都会使执行重新寻址到`DrinkGenerator`上。该生成器会一直持有执行权直到无工作可做。所以我们本例中生成`炸鸡`之后紧接的是`可乐`和`橙汁`。仅当`DrinkGenerator`的工作完成后，调用原来的迭代器才会继续返回值`薯条`。注意，对于最初调用的迭代器代码来说，这一切都是透明的。`for/of`循环不会关心`FoodGenertor`委托到另一个迭代器上，它只关心在`done`为`true`之前一直调用迭代器的`next()`方法。

### 使用生成器遍历DOM树

我们遍历DOM树的一个比较简单的方法就是通过递归函数

```html
<div class="subTree">
    <form>
        <input type="text" />
    </form>
    <p>Paragraphy</p>
    <span>Span</span>
</div>

<script>
    function traverseDOM(element, callback) {
        // 用回调函数处理当前节点
        callback(element);
        element = element.firstElementChild;
        while (element) {
            // 遍历每个子树，深度优先
            traverseDOM(element, callback);
            element = element.nextElementSibling;
        }
    }
    const subTree = document.querySelector('.subTree');
    traverseDOM(subTree, function (element) {
        console.log(element.nodeName); // DIV FORM INPUT P SPAN
    });
</script>
```

我们现在可以利用我们所学的生成器来遍历DOM树

```html
<div class="subTree">
    <form>
        <input type="text" />
    </form>
    <p>Paragraphy</p>
    <span>Span</span>
</div>

<script>
    // 使用生成器遍历DOM树
    function* DomTraversal(element) {
        yield element;
        element = element.firstElementChild;
        while (element) {
            yield* DomTraversal(element);
            element = element.nextElementSibling;
        }
    }
    const subTree = document.getElementsByClassName('subTree')[0];
    for (let element of DomTraversal(subTree)) {
        console.log(element.nodeName); // DIV FORM INPUT P SPAN
    }
</script>
```

### 与生成器交互

我们前面讲了如何通过使用`yield`表达式从生成器中返回多个值。除此之外，我们还能向生成器发送值，从而实现双向通信。

#### 作为生成器函数参数发送值

第一种向生成器发送值得方法我们之前已经用过许多次了，就是调用函数并传入实参

```javascript
function* FoodGenerator(price) {
    yield(`苹果${price}元一个`);
}
// 普通的参数传递
const foodIterator = FoodGenerator(5);
const result1 = foodIterator.next();
console.log(result1.value); // 苹果5元一个
```

#### 使用next方法向生成器发送值

除了在第一次调用生成器的时候向生成器提供数据，我们还能通过迭代器对象的`next()`方法向生成器传入参数。在这个过程中，我们把生成器函数从挂起状态恢复到了执行状态。生成器把这个传入的值作为整个`yield`表达式（生成器当前挂起的表达式）的返回值。

我们康康下面这个例子

```javascript
function* FoodGenerator(price) {
    // 传递回的值将成为 yield 表达式的返回值，因此 imposter 的值是100
    const imposter = yield(`苹果${price}元一个`);
    yield(`西瓜${imposter}元一个`);
}
// 普通的参数传递
const foodIterator = FoodGenerator(5);
const result1 = foodIterator.next();
console.log(result1.value); // 苹果5元一个
// 将数据作为 next() 方法的参数传递给生成器
const result2 = foodIterator.next(100); // 西瓜100元一个
console.log(result2.value);
```

首次调用`foodIterator.next()`向生成器请求了一个新值，在第一个`yield`表达式的位置返回的位置返回了`苹果5元一个`，并进入挂起状态。第二次调用`foodIterator.next(100)`又向生成器请求了一个新的值，生成器从上次挂起的地方重新进入执行状态，但它同时还向生成器发送了实参`100`，这个值会作为整个`yield`表达式的返回值，因此`imposter`的值为`100`。

注意：迭代器对象的`next()`方法为等待中的`yield`表达式提供了值，所以，如果没有等待中的`yield`表达式，也就没有什么值能够应用的。基于这个原因，我们无法通过第一次调用`next()`方法来向生成器提供该值。但记住，如果你需要为生成器提供一个初始值，你可以调用生成器自身，如`FoodGenerator(6)`。

#### 抛出异常

还有一种稍微不那么正统的方式将值应用到生成器上：通过抛出一个异常。每个迭代器除了有一个`next()`方法，还有一个`throw()`方法，让我们来看下面这个例子

```javascript
// 利用抛出异常传值
function* FoodGenerator() {
    try {
        yield '炸鸡';
        throw new Error('此处的错误将不会发生');
    } catch (error) {
        console.log(error); // 调用了迭代器对象的throw方法
    }
}
const foodIterator = FoodGenerator();
// 从生成器中获取一个值
const result1 = foodIterator.next();
console.log(result1.value); // 炸鸡
// 向生成器抛出一个异常
foodIterator.throw('调用了迭代器对象的throw方法');
```

### 生成器的内部构成

我们已经知道调用一个生成器不会实际执行它。相反，它创建了一个新的迭代器，通过迭代器我们才能从生成器中请求值。在生成器生成（或让渡）了一个值后，生成器会挂起执行并等待下一个请求的到来。从某种方面来说，生成器的工作更像是一个小程序，一个在状态中运动的状态机。

- 挂起开始——创建了一个生成器对应的迭代器后，生成器最先以这种状态开始。其中的任何代码都未执行。
- 执行——生成器中的代码的执行状态。执行要么是刚开始，要么是从上次挂起的地方继续的。当生成器对应的迭代器调用了`next()`方法，并且当前存在可执行的代码时，生成器会转移到这个状态。
- 挂起让渡——当生成器在执行过程中遇到了一个`yield`表达式，它会创建一个包含着返回值的新对象，随后再挂起执行。生成器在这个状态暂停并等待继续执行。
- 完成——在生成器执行期间，如果代码执行到`return`语句或者全部代码执行完毕，生成器就进入该状态。

下图是在执行过程中，生成器在相对应的迭代器调用`next()`方法之间移动状态的图解

![生成器状态](images/生成器状态.png)

让我们跟随下面这个简单的例子，并结合生成器的状态机制，来进一步巩固所学知识

首先，定义一个生成器函数

```javascript
function* FoodGenerator() {
    yield '炸鸡';
    yield '薯条';
}
```

创建迭代器对象，此时生成器处于挂起开始状态

```javascript
const foodIterator = FoodGenerator();
```

激活生成器，从挂起开始状态转为执行状态。执行到`yield '炸鸡'`语句中止，进而转为挂起让渡状态，返回新对象`{value: '炸鸡', done: 'false'}`

```javascript
const result1 = foodIterator.next();
console.log(result1); // {value: "炸鸡", done: false}
```

重新激活生成器，从挂起让渡状态转为执行状态，执行直到`yield '薯条'`语句中止进而转为挂起让渡状态，返回新对象`{value: "薯条", done: false}`

```javascript
const result2 = foodIterator.next();
console.log(result2); // {value: "薯条", done: false}
```

重新激活生成器，从挂起让渡状态转为执行状态，由于没有代码可以执行了，进而转为完成状态，返回新对象`{value: undefined, done: true}`

```javascript
const result3 = foodIterator.next();
console.log(result3); // {value: undefined, done: true}
```

### 通过执行上下文跟踪生成器函数

执行环境上下文是一个用于跟踪代码执行的JavaScript内部机制（后面再探讨）。尽管有些特别，但生成器依然是一种函数，所以接下来让我们仔细康康它们和执行环境上下文之间的关系吧。首先先从一个简单的代码片段开始：

```javascript
function* FoodGenerator(price) {
    yield `炸鸡${price}元`;
    return `薯条${price}元`;
}
const foodIterator = FoodGenerator(16);
const result1 = foodIterator.next();
console.log(result1.value); // 炸鸡16元
const result = foodIterator.next();
console.log(result); // {value: "薯条16元", done: true}
```

接下来，让我们一起探索一下应用的状态，看一看在应用执行过程中不同位置上的执行上下文栈。下图展示了应用执行中两个位置的状态快照。第一个快照显示了应用在调用`FoodGenerator`函数之前的应用执行状态。由于正在执行的是全局代码，故执行上下文栈仅仅包含全局执行上下文，该上下文引用了当前标识符所在的全局环境。此时`FoodGenerator`仅仅引用了一个函数，而其他标识符为`undefined`（[参见注册标识符过程](#注册标识符的过程)）

<img src="images/调用FoodGenerator函数之前应用程序的状态.png" alt="调用FoodGenerator函数之前应用程序的状态" style="zoom:67%;" />

当我们调用了`FoodGenerator`函数：

```javascript
const foodIterator = FoodGenerator(16);
```

<img src="images/调用FoodGenerator函数之后应用程序的状态.png" alt="调用FoodGenerator函数之后应用程序的状态" style="zoom: 67%;" />

此时控制流进入了生成器，正如进入了其他任何函数一样，当前将会创建一个新的函数环境上下文`FoodGenerator`（也就是相对应的词法环境），并将该上下文入栈。而生成器比较特殊，它不会执行任何函数代码。取而代之则生成一个新的迭代器再从中返回，并将它的引用赋值给了`foodIterator`，然后生成器进入挂起开始状态。由于迭代器是用来控制生成器的执行的，故而迭代器中保存着一个在它创建位置处的执行上下文。

如下图所示，当调用生成器函数执行完毕后，发生了一个有趣的现象。一般情况下，当程序从一个标准函数返回后，对应的执行环境上下文会从栈出弹出，并被完整地销毁，但在生成器中不是这样。

<img src="images/从调用FoodGenerator中返回后程序的状态.png" alt="从调用FoodGenerator中返回后程序的状态.png" style="zoom:67%;" />

相对应的`FoodGenerator`会从栈中弹出，但由于`foodIterator`还保存着对它的引用，所以它不会被销毁。你可以把它看作一种类似于闭包的事物。在闭包中，为了在闭包创建的时候保证变量都可用，所以函数会对创建它的环境持有一个引用。以这种方式，我们能保证只要函数还存在，环境及变量就存在着。生成器，从另一个角度看，还必须恢复执行。由于所有函数的执行都被执行上下文所控制，故而迭代器保持了一个对当前执行环境的引用，保证只要迭代器还需要它的时候它都存在。

当调用迭代器的`next()`方法时发生了另一件有趣的事：

```javascript
const result1 = foodIterator.next();
console.log(result1.value); // 炸鸡16元
```

如果这只是一个普通的函数调用，这个语句会创建一个新的`next()`方法的执行上下文并放入栈中。但是生成器不一样，它会重新激活对应的执行上下文，使得生成器进入执行状态。在这个例子中，是`FoodGenerator`上下文，并把该上下文放到栈顶，从它上次离开的地方继续执行。

<img src="images/调用next方法重新激活上下文.png" alt="调用next方法重新激活上下文" style="zoom:67%;" />

由此我们可以总结出标准函数仅仅会被重复调用，每次调用都会创建一个新的执行环境上下文。相比之下，生成器的执行环境上下文则会暂时挂起并在将来恢复。

在我们的例子中，由于是第一次调用`next()`方法，而生成器之前并没有执行过，所以生成器开始执行并进入执行状态。当生成器函数运行到这个位置的时候，又会发生这样一件事：

```javascript
yield `炸鸡${price}元`;
```

生成器函数运行得到的表达式结果为`炸鸡16元`，然后执行中又遇到了`yield`关键字。这种情况表明了`炸鸡16元`是该生成器的第一个中间值，所以需要返回该值并挂起生成器的执行。从应用状态的角度看，发生了一件类似前面的事情：`FoodGenerator`上下文离开了调用栈，但由于`foodIterator`还持有着对它的引用，故而它并未被销毁，现在生成器挂起了，又在非阻塞的情况下移动到了挂起让渡状态。程序在全局代码中恢复执行，并将生成出的值存入`result1`。

<img src="images/生成中间值.png" alt="生成中间值" style="zoom:67%;" />

当遇到另一个迭代器调用时，代码继续运行：

```javascript
const result = foodIterator.next();
console.log(result); // {value: "薯条16元", done: true}
```

在这个位置，我们又把整个流程走了一遍：首先通过`foodIterator`激活`FoodGenerator`的上下文引用，将其入栈，在上次离开的地方继续执行。本例中，生成器计算表达式`薯条${price}元`。但这一次没有再遇到`yield`表达式，而是遇到了一个`return`语句。这个语句会返回值`薯条16元`并结束生成器的执行，随之生成器进入结束状态。

总之抓住一个关键点就是：当我们从生成器中取得控制权后，生成器的执行环境上下文是一直保存的，而不是像标准函数一样退出后销毁。