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
  async push(item) {
    queues[this.key].push(item);
    return true;
  }

  /**
   * [async] 读取队列中的元素
   * @param {number} timeout 超时时间,单位秒,默认Infinity
   * @returns {boolean}
   */
  async pop(timeout) {
    if (timeout === undefined) {
      timeout = Infinity;
    }
    while (!queues[this.key].length && timeout > 0) {
      await sleep(1);
      timeout--;
    }
    return queues[this.key].shift();
  }

  /**
   * 销毁队列
   */
  destory() {
    //This package may cause memory leak.
  }
}

module.exports = ArrayQueueDriver.default = ArrayQueueDriver;
