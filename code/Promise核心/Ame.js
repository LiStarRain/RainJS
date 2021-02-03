class Ame {
  // 添加状态值
  static PENDING = 'pending';
  static FULDILLED = 'fulfilled';
  static REJECTED = 'rejected';
  static resolve(value) {
    return new Ame((resolve, reject) => {
      if (value instanceof Ame) {
        value.then(resolve, reject);
      } else {
        resolve(value);
      }
    })
  }
  static reject(value) {
    return new Ame((resolve, reject) => {
      if (value instanceof Ame) {
        value.then(resolve, reject);
      } else {
        reject(value);
      }
    })
  }
  static all(promises) {
    let resolves = [];
    return new Ame((resolve, reject) => {
      promises.forEach((promise, index) => {
        promise.then(
          value => {
            resolves.push(value);
            if (resolves.length === promises.length) {
              resolve(resolves);
            }
          },
          reason => {
            reject(reason);
          }
        );
      });
    });
  }
  static allSettled(promises) {
    let resolves = [];
    return new Ame((resolve, reject) => {
      promises.forEach(promise => {
        resolves.push(promise.then(
          v => v,
          e => promise
        ));
      });
      resolve(resolves);
    });
  }
  static race(promises) {
    return new Ame((resolve, reject) => {
      promises.map(promise => {
        promise.then(v => {
          resolve(v);
        });
      });
    });
  }
  constructor(excutor) {
    // 初始化状态
    this.status = Ame.PENDING;
    this.value = null;
    // 保存pending状态时的处理函数，当状态改变时循环调用
    this.callbacks = [];
    try {
      // 由于resolve和reject要更改对象状态，因此将函数上下文绑定为新生成的对象
      excutor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }
  // 成功时执行，把value传出去嘻嘻
  resolve(value) {
    // 状态为pending说明还没有被改变过
    if (this.status === Ame.PENDING) {
      // 更改状态
      this.status = Ame.FULDILLED;
      // 把值传出去
      this.value = value;
      setTimeout(() => {
        this.callbacks.map(callback => {
          callback.onFulfilled(value);
        });
      });
    }
  }
  // 失败时执行，同时也要把值传出去
  reject(value) {
    if (this.status === Ame.PENDING) {
      this.status = Ame.REJECTED;
      this.value = value;
      setTimeout(() => {
        this.callbacks.map(callback => {
          callback.onRejected(value);
        });
      });
    }
  }

  // then方法
  then(onFulfilled, onRejected) {
    if (typeof onFulfilled != 'function' && onFulfilled !== undefined) {
      // 当传入的参数不为函数时
      onFulfilled = value => value;
    }
    if (typeof onRejected != 'function' && onRejected !== undefined) {
      onRejected = value => value;
    }
    let temp;
    let promise = new Ame((resolve, reject) => {
      if (this.status === Ame.FULDILLED) {
        if (onFulfilled === undefined) {
          temp = this;
        } else {
          setTimeout(() => {
            let result = onFulfilled(this.value);
            this.parse(promise, result, resolve, reject);
          });
        }
      }
      if (this.status === Ame.REJECTED) {
        if (onRejected === undefined) {
          temp = this;
        } else {
          setTimeout(() => {
            let result = onRejected(this.value);
            this.parse(promise, result, resolve, reject);
          });
        }
      }
      if (this.status === Ame.PENDING) {
        this.callbacks.push({
          onFulfilled: value => {
            let result = onFulfilled(value);
            this.parse(promise, result, resolve, reject);
          },
          onRejected: value => {
            let result = onRejected(value);
            this.parse(promise, result, resolve, reject);
          }
        });
      }
    });
    return temp || promise;
  }
  // 将状态处理的代码抽离出来
  parse(promise, result, resolve, reject) {
    if (promise == result) {
      throw new TypeError('禁止循环调用');
    }
    try {
      if (result instanceof Ame) {
        // 调一下then让其状态和结果值传到当前Promise对象中，实现继承
        result.then(resolve, reject);
      } else {
        resolve(result);
      }
    } catch (error) {
      reject(error)
    }
  }
  // catch
  catch(onRejected) {
    let promise = new Ame((resolve, reject) => {
      if (this.status === Ame.REJECTED) {
        setTimeout(() => {
          let result = onRejected(this.value);
          this.parse(promise, result, resolve, reject);
        });
      }
    });
    return promise;
  }
}