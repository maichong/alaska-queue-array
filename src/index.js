/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-28
 * @author Liang <liang@maichong.it>
 */

'use strict';

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
  async push(item) {
    this._queue.push(item);
    return true;
  }

  /**
   * [async] 读取队列中的元素
   * @param {number} timeout 超时时间,单位秒
   * @returns {boolean}
   */
  async pop(timeout) {
    while (!this._queue.length && timeout > 0) {
      await sleep(1);
      timeout--;
    }
    return this._queue.shift();
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
