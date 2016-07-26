/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-28
 * @author Liang <liang@maichong.it>
 */

function sleep(seconds) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, seconds * 1000);
  });
}

/**
 * @type {Object}
 */
const queues = {};

class ArrayQueueDriver {

  constructor(options) {
    this.key = options.key;
    this.options = options;
    this.isQueueDriver = true;
    this._free = false;
    if (!queues[this.key]) {
      queues[this.key] = [];
    }
  }

  /**
   * [async] 将元素插入队列
   * @param {*} item
   */
  async push(item) {
    this._free = false;
    queues[this.key].push(item);
  }

  /**
   * [async] 读取队列中的元素
   * @param {number} timeout 超时时间,单位毫秒,默认不阻塞,为0则永久阻塞
   * @returns {*}
   */
  async pop(timeout) {
    this._free = false;
    if (timeout === 0) {
      timeout = Infinity;
    }
    if (timeout === undefined) {
      timeout = 0;
    }
    while (!queues[this.key].length && timeout > 0) {
      await sleep(1);
      timeout -= 1000;
      if (this._free) {
        return;
      }
    }
    return queues[this.key].shift();
  }

  /**
   * 释放当前所有任务,进入空闲状态
   */
  free() {
    this._free = true;
  }

  /**
   * 销毁队列
   */
  destroy() {
    //This package may cause memory leak.
  }
}

module.exports = ArrayQueueDriver.default = ArrayQueueDriver;
