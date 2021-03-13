const VERSION = '1.0';
const show = function () {
  return `test module show function`;
};
class User {
  constructor(name) {
    this.name = name;
  }
  show() {
    return this.name;
  }
}
// 导入别名
// export { VERSION, show, User };
// 导出别名
export { VERSION, show as func, User };