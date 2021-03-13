// 单一导出
// export default class {
//   constructor(name) {
//     this.name = name;
//   }
//   show() {
//     return this.name;
//   }
// }
// class User {
//   constructor(name) {
//     this.name = name;
//   }
//   show() {
//     return this.name;
//   }
// }
// export { User as default };

// 混合导出
const VERSION = '1.0';
export default class {
  constructor(name) {
    this.name = name;
  }
  show() {
    return this.name;
  }
}
export { VERSION };