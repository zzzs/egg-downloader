'use strict';

// app/extend/context.js
const fs = require('fs');
const basename = require('path').basename;
const is = require('is-type-of');
const assert = require('assert');

module.exports = {
  /**
   * downloader file
   * @param  {string} file   文件路径
   * @param  {string} name   下载文件名（包含后缀）
   * @param  {object} header 头信息
   * @return {undefined} undefined
   */
  downloader(file, name, header) {
    assert(file, 'file must be required');
    assert(is.string(file), `file must be string, but got ${file}`);
    try {
      fs.accessSync(file, fs.constants.F_OK);
    } catch (err) {
      throw new Error(`${file} does not exist`);
    }

    const reader = fs.createReadStream(file);
    let filename = basename(file);

    // name
    if (name) {
      assert(is.string(name), `name must be string, but got ${name}`);
      filename = name;
    }

    this.attachment(filename);

    // header
    if (header) {
      assert(is.object(header), `header must be object, but got ${header}`);

      let item;
      for (let key in header) {
        assert(is.string(header[key]), `header item must be string, but got ${header[key]}`);
        item = header[key];

        // 首字母大写
        key = key.split('-').map(ucfirst).join('-');
        this.set(key, item);
      }
    }

    this.body = reader;
  },
};

/**
 * 首字母大写
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
function ucfirst(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}
