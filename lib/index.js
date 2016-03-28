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
 *
 * @type {{}}
 */
const queues = {};

class ArrayQueueDriver {

  constructor(key, options) {
    this._queue = [];
    this.key = key;
  }

  /**
   * [async] 将元素插入队列
   * @param {*} item
   * @returns {boolean}
   */
  push(item) {
    var _this = this;

    return _asyncToGenerator(function* () {
      _this._queue.push(item);
      return true;
    })();
  }

  /**
   * [async] 读取队列中的元素
   * @param {number} timeout 超时时间,单位秒
   * @returns {boolean}
   */
  pop(timeout) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      while (!_this2._queue.length && timeout > 0) {
        yield sleep(1);
        timeout--;
      }
      return _this2._queue.shift();
    })();
  }

  /**
   * 销毁队列
   */
  destory() {
    this._queue = [];
    delete queues[this.key];
  }

  /**
   * 通过Key
   * @param {string} key
   * @param {object} options
   * @returns {ArrayQueueDriver}
   */
  static instance(key, options) {
    if (!queues[key]) {
      queues[key] = new ArrayQueueDriver(key, options);
    }
    return queues[key];
  }
}

module.exports = ArrayQueueDriver.default = ArrayQueueDriver;