/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-28
 * @author Liang <liang@maichong.it>
 */

'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function sleep(seconds) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, seconds * 1000);
  });
}

/**
 * @type {object}
 */
const queues = {};

class ArrayQueueDriver {

  constructor(key, options) {
    this.key = key;
    if (!queues[key]) {
      queues[key] = [];
    }
  }

  /**
   * [async] 将元素插入队列
   * @param {*} item
   * @returns {boolean}
   */
  push(item) {
    var _this = this;

    return _asyncToGenerator(function* () {
      queues[_this.key].push(item);
      return true;
    })();
  }

  /**
   * [async] 读取队列中的元素
   * @param {number} timeout 超时时间,单位秒,默认Infinity
   * @returns {boolean}
   */
  pop(timeout) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      if (timeout === undefined) {
        timeout = Infinity;
      }
      while (!queues[_this2.key].length && timeout > 0) {
        yield sleep(1);
        timeout--;
      }
      return queues[_this2.key].shift();
    })();
  }

  /**
   * 销毁队列
   */
  destory() {
    //This package may cause memory leak.
  }
}

module.exports = ArrayQueueDriver.default = ArrayQueueDriver;