// 分别导出
// export const VERSION = '1.0';
// export const show = function () {
//   return `module show function`;
// };
// export class User {
//   show() {
//     return `User show method`;
//   }
// };

// 批量导出
const VERSION = '1.0';
const show = function () {
  return 'module show function';
};
class User {
  show() {
    return `User show method`;
  }
}
export {
  VERSION,
  show,
  User
};